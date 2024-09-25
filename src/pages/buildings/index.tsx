import { Outlet, useNavigate, useParams } from "react-router";
import { Col, Input, Menu, Row, Skeleton } from "antd";
import {
  AccessInfoVO,
  AccessService,
  Building,
  BuildingService,
  EnumBuildingType,
  EnumRoomVOType
} from "backend/services/backend";
import useRemoteData from "../../hooks/use-remote-data";
import "./styles.scss";
import { BuildingIcons, IS_DEBUG } from "../../utils/constants";
import React, { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { showError } from "../../utils/notifications";
import { SearchOutlined } from "@ant-design/icons";
import { MaskedInput } from "antd-mask-input";


const PhoneSimpleRegex = /^\+7(\s)?\(\d{3}\)(\s)?\d{3}-\d{2}-\d{2}$/;
const PhoneDigitsRegex = /^[\d]{7,13}$/;
const CarNumberRegex = /^[а-яА-Я]\d{3}[а-яА-Я]{1,2}(\d{2,3})?$/;

export const Buildings = () => {
  const navigate = useNavigate();
  const { buildingId: selectedBuildingId = "" } = useParams();
  const [buildings, isLoading] = useRemoteData<Building[]>(BuildingService.findAll1);
  const [searchPhone, setSearchPhone] = useState("");
  const [searchCarNun, setSearchCarNum] = useState("");

  const searchData = useCallback((phone: string = "", carNum: string = "") => {
    const isPhone = PhoneSimpleRegex.test(phone);
    const isCarNumber = CarNumberRegex.test(carNum);

    if (!isPhone && !isCarNumber) {
      return;
    }

    (isCarNumber ? AccessService.findByCarNumber({
      carNumber: carNum,
      active: true
    }) : AccessService.findByPhone({ phoneNumber: phone.replace(/\D/g, ""), active: true }))
      .then((response: AccessInfoVO) => {
        // @ts-ignore
        const { owner: { ownerRooms = [] } = {} } = response || {};
        if (ownerRooms.length > 0) {
          let buildingRoom = ownerRooms.find(({ type = "" }) => type === EnumRoomVOType.FLAT);
          if (!buildingRoom) {
            buildingRoom = ownerRooms[0];
          }

          if (buildingRoom) {
            const url = `/buildings/${buildingRoom.building}/rooms/${buildingRoom.id}`;
            navigate(url);
          }
        }
      })
      .catch(e => {
        showError("Ничего не найдено", e);
      });
  }, []);

  const delayedSearch = useCallback(
    debounce((phone: string, carNum: string) => searchData(phone, carNum), 600),
    []
  );

  const onEnterKeyPressed = useCallback((ev: React.KeyboardEvent<HTMLInputElement>) => {
    ev.stopPropagation();
    const pressedKeyCode = String(ev.key || ev.keyCode);

    const isEnterKeyPressed =
      pressedKeyCode === "13" || pressedKeyCode.toLowerCase() === "enter";

    if (isEnterKeyPressed) {
      searchData(searchPhone, searchCarNun);
    }
  }, [searchPhone, searchCarNun]);

  useEffect(() => {
    delayedSearch(searchPhone, searchCarNun);
  }, [searchPhone, searchCarNun]);

  return (
    <div className="buildings view">
      {isLoading ? <Skeleton active={true} /> : <Row gutter={32}>
        <Col span={7}>
          <div className="search">
            <MaskedInput
              className="phone-number"
              allowClear
              prefix={<SearchOutlined />}
              placeholder="Номер телефона"
              mask={"+7 (000) 000-00-00"}
              onKeyUp={onEnterKeyPressed}
              value={searchPhone}
              onChange={({ target: { value } }) => {
                setSearchPhone(value);

              }}
            />
            <Input
              allowClear
              className="car-number"
              placeholder="Номер машины" value={searchCarNun}
              onChange={({ target: { value } }) => {
                setSearchCarNum(value);
              }}
              onKeyUp={onEnterKeyPressed}
            />
          </div>

          <Menu
            defaultSelectedKeys={parseInt(selectedBuildingId, 10) ? [selectedBuildingId] : []}
            onClick={({ key = "" }) => {
              if (key) {
                navigate(`/buildings/${key}`);
              }
            }}
            items={
              (buildings || []).map((building) => ({
                key: building.id || 0,
                label: `${building.name}${IS_DEBUG ? ` (id=${building.id})` : ""}`,
                icon: BuildingIcons[building.type as EnumBuildingType] || ""
              }))}
          />
        </Col>
        <Col span={17}>
          <Outlet />
        </Col>
      </Row>
      }
    </div>
  );
};
