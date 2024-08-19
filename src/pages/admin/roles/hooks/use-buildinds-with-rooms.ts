import { useCallback, useEffect, useState } from "react";
import { useLoading } from "../../../../hooks/use-loading";
import {
  Building,
  BuildingService,
  EnumBuildingType,
  FloorResponse,
  RoomService,
  RoomVO
} from "backend/services/backend";
import { showError } from "../../../../utils/notifications";

export interface BuildingWithRooms extends Building {
  rooms: RoomVO[];
}

export type RoomInfo = {
  roomId: number,
  roomNumber: string,
  buildingId: number,
  buildingType: EnumBuildingType,
  buildingName: string,
}

export type RoomInfoMap = Record<string, RoomInfo>;

function useBuildingsWithRooms(): [BuildingWithRooms[], RoomInfoMap, boolean, () => void] {
  const [loading, showLoading, hideLoading] = useLoading();
  const [data, setData] = useState<BuildingWithRooms[]>([]);
  const [roomsMap, setRoomsMap] = useState<RoomInfoMap>({});


  const loadData = useCallback(() => {
    showLoading();

    BuildingService.findAll1()
      .then((buildings: Building[]) => {
        const buildingsWithRooms: BuildingWithRooms[] = buildings.map(building => ({
          ...building,
          rooms: []
        }));

        const promises: Promise<FloorResponse[]>[] = [];
        buildings.forEach(({ id = 0 }) => promises.push(RoomService.getBuildingStructure({ buildingId: id })));

        Promise.allSettled(promises)
          .then((results) => {
            const roomInfoMap: RoomInfoMap = {};
            // @ts-ignore
            results.forEach((promiseResult, index) => {
              console.log(promiseResult);
              // @ts-ignore
              const { status, value: floors } = promiseResult;
              if (status === "fulfilled") {
                const allRooms = floors.reduce<RoomVO[]>((accum, { rooms = [] }) => accum.concat(rooms), []);
                buildingsWithRooms[index].rooms = allRooms;

                allRooms.forEach(({ number = "", id = 0, building: buildingId = 0 }) => {
                  const building: Building | null = buildings.find(({ id = 0 }) => id === buildingId) || null;
                  if (building) {
                    const roomOptionId = `${building.id}-${id}`;
                    roomInfoMap[roomOptionId] = {
                      roomId: id,
                      roomNumber: number,
                      buildingId: building.id || 0,
                      buildingName: building.name || "",
                      buildingType: building.type || EnumBuildingType.APARTMENT_BUILDING
                    };
                  }
                });
              }
            });

            setData(buildingsWithRooms);
            console.log("%c Rooms info map", "color: red");
            console.log(roomInfoMap);
            setRoomsMap(roomInfoMap);
            hideLoading();
          })
          .catch(e => {
            showError("Не удалось сохранить данные документов", e);
            hideLoading();
          });
      })
      .catch(e => {
        showError("Не удалось загрузить список домов", e);
        hideLoading();
      });
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  return [data, roomsMap, loading, loadData];
}

export default useBuildingsWithRooms;
