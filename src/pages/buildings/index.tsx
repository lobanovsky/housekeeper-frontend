import { useCallback, useEffect, useState } from "react";
import { Button, Col, Divider, List, Row, Skeleton } from "antd";
import { AreaService, AreaVO, Building, BuildingService, EnumBuildingType } from "backend/services/backend";

import { showError } from "utils/notifications";
import "./styles.scss";
import { useLoading } from "../../hooks/use-loading";
import { HomeOutlined } from "@ant-design/icons";
import { ParkingIcon } from "../../icons/parking";
import { BuildingScheme } from "./building-scheme";
import useRemoteData from "../../hooks/use-remote-data";


export const Buildings = () => {
  const [areas, isLoadingAreas] = useRemoteData<AreaVO[]>(AreaService.findAll2, {
    errorMsg: "Не удалось загрузить список типов доступов"
  });
  const [loading, showLoading, hideLoading] = useLoading();
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  //   const [searchStr, setSearchStr] = useState<string>('');
  //   const [foundedInfo, setFoundedInfo] = useState<AccessInfoVO | undefined>(undefined);
  //
  //   //todo сделать хук по поиску
  // // по формату строки определять, что это - номер телефона или номер машины или квартира
  //
  //   const searchFlat = useCallback((searchStr: string) => {
  //
  //   }, []);
  //
  // const delayedSearch = useCallback(
  //   debounce((params) => loadData(params), 600),
  //   []
  // );


  const loadBuildings = useCallback(() => {
    showLoading();
    BuildingService.findAll1()
      .then((responseData: Building[]) => {
        setBuildings(responseData);
        hideLoading();
      })
      .catch(e => {
        showError("Не удалось загрузить список домов", e);
        hideLoading();
      });

  }, []);

  useEffect(() => {
    loadBuildings();
  }, []);

  return (
    <div className="buildings">
      {loading ? <Skeleton /> : <Row gutter={32}>
        <Col span={6}>
          <List
            bordered={false}
            dataSource={buildings}
            renderItem={(building) => <>
              <div className="building">
                <Button type="link" className="building-link" onClick={() => {
                  setSelectedBuilding(building);
                }}>
                  {building.type === EnumBuildingType.APARTMENT_BUILDING && <HomeOutlined />}
                  {building.type === EnumBuildingType.UNDERGROUND_PARKING && <ParkingIcon />}
                  {building.name}
                </Button>

              </div>
              <Divider style={{ margin: "4px 0" }} />
            </>
            } />
        </Col>
        <Col span={18}>
          {!!selectedBuilding?.id && <BuildingScheme areas={areas || []} building={selectedBuilding} />}
        </Col>
      </Row>
      }
    </div>
  );
};
