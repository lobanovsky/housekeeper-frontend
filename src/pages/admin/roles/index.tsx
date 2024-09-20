import { useCallback, useMemo, useRef, useState } from "react";
import { Button, Card, Checkbox, Divider } from "antd";
import { CheckOutlined } from "@ant-design/icons";

import { AccessRequest, AccessService, AreaService, AreaVO, Building, BuildingService } from "backend/services/backend";
import Loading from "components/loading";
import { useLoading } from "hooks/use-loading";
import useRemoteData from "hooks/use-remote-data";
import { showError, showMessage } from "utils/notifications";
import { CheckboxItem } from "utils/types";
import { getRandomId } from "utils/utils";
import { PhoneRegex, PhonesChangeHandlerArg, PhonesSelector } from "./components/phones-selector";
import { RoomSelector } from "./components/room-selector";
import { SelectedRoomsMap } from "./types";
import "./style.scss";

export const RolesView = () => {
  const phonesRef = useRef(null);

  const [loading, showLoading, hideLoading] = useLoading();
  const [buildings = [], isLoadingBuildings] = useRemoteData<Building[]>(BuildingService.findAll1, {
    errorMsg: "Не удалось загрузить список зданий"
  });
  const [areas, isLoadingAreas] = useRemoteData<AreaVO[], CheckboxItem[]>(AreaService.findAll2, {
    dataConverter: (response) => response.map(({ id = 0, name = "" }) => ({ value: id, label: name })),
    errorMsg: "Не удалось загрузить список типов доступов"
  });

  const [selectedRooms, setSelectedRooms] = useState<SelectedRoomsMap>({});
  const [selectedAreas, setSelectedAreas] = useState<number[]>([]);
  const [phones, setPhones] = useState<PhonesChangeHandlerArg>({ phones: [], changeId: "", isValid: false });

  const roomsChangeId = useMemo(() => getRandomId(), [
    Object.entries(selectedRooms).map(([buildingId, roomIds]) => (
      `${buildingId}-${roomIds.join(",")}`))
  ]);

  const isValidForm = useMemo(() => {
    const isValidRooms = Object.values(selectedRooms).some(roomsArr => !!roomsArr.length);
    return isValidRooms && selectedAreas.length && phones.phones.length && phones.isValid;
  }, [roomsChangeId, selectedAreas.length, phones.phones.length, phones.isValid]);


  const saveData = useCallback(() => {
    showLoading();
    const roomsToSave: any = Object.entries(selectedRooms).map(([buildingId, roomIds]) => ({
      buildingId: parseInt(buildingId, 10),
      roomIds
    }));

    const phonesToSave = phones.phones.filter((phone) => PhoneRegex.test(phone)).map(phone => phone.replace(/\s+/g, ""));


    const result: AccessRequest = {
      // @ts-ignore
      phoneNumbers: phonesToSave,
      areas: selectedAreas,
      rooms: roomsToSave
    };

    AccessService.createAccess({ body: result })
      .then((successMessages: string[]) => {
        showMessage(<div>
          {successMessages.map((msg, index) => <div key={msg}
                                                    className={msg.toLowerCase().includes("ошибка") ? "error" : ""}>
            {msg}
            {index < successMessages.length - 1 && <Divider />}

          </div>)}
        </div>, {
          message: "",
          duration: 2000
        });
        hideLoading();
        setSelectedRooms({});
        setSelectedAreas([]);
        // @ts-ignore
        phonesRef.current?.reset();
      })
      .catch(e => {
        showError("Не удалось выдать доступ", e);
        hideLoading();
      });

  }, [selectedAreas.length, phones.changeId, roomsChangeId, phonesRef.current]);

  const onChangePhones = useCallback(({ phones: changedPhones, isValid, changeId }: PhonesChangeHandlerArg) => {
    setPhones({
      phones: changedPhones,
      changeId,
      isValid
    });
  }, []);

  const onChangeRoom = useCallback((roomId: number, buildingId: number) => {
    const buildingIdStr = String(buildingId);

    setSelectedRooms(prevMap => {
      const newMap = { ...prevMap };
      if (!newMap[buildingIdStr]) {
        newMap[buildingIdStr] = [];
      }


      const newRooms = [...newMap[buildingIdStr]];
      const roomIndex = newRooms.indexOf(roomId);
      if (roomIndex > -1) {
        newRooms.splice(roomIndex, 1);
      } else {
        newRooms.push(roomId);
      }
      newMap[buildingIdStr] = newRooms;
      return newMap;
    });
  }, []);

  // @ts-ignore
  return <div className="admin-roles">
    {loading && <Loading />}
    <div className="roles-content">
      {/*<Button onClick={saveData}>Сохранить</Button>*/}
      <div className="areas">
        <Checkbox.Group
          /*@ts-ignore*/
          options={areas || []}
          value={selectedAreas}
          onChange={(checkedAreas) => {
            setSelectedAreas(checkedAreas as number[]);
          }}
        />
        <Button
          disabled={!isValidForm}
          onClick={saveData}
          style={{ marginLeft: "2em" }}>
          <CheckOutlined />Выдать доступ
        </Button>
      </div>
      <div className="phones-and-buildings">
        <Card size="small" className="phones" title="Список телефонов">
          <PhonesSelector ref={phonesRef} onChangePhones={onChangePhones} />
        </Card>
        <Card size="small" className="buildings" title="Объекты доступа">
          {/*@ts-ignore*/}
          <RoomSelector buildings={buildings || []} selectedRooms={selectedRooms} onSelectRoom={onChangeRoom} />
        </Card>
      </div>
    </div>
  </div>;
};
