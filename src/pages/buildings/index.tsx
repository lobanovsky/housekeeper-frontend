import { Outlet, useNavigate, useParams } from "react-router";
import { Col, Menu, Row, Skeleton, Typography } from "antd";
import { Building, BuildingService, EnumBuildingType } from "backend/services/backend";
import useRemoteData from "../../hooks/use-remote-data";
import "./styles.scss";
import { BuildingIcons, IS_DEBUG } from "../../utils/constants";


export const Buildings = () => {
  const navigate = useNavigate();
  const { buildingId: selectedBuildingId = "" } = useParams();

  const [buildings, isLoading] = useRemoteData<Building[]>(BuildingService.findAll1);

  return (
    <div className="buildings">
      <Typography.Title level={4}>Дома</Typography.Title>
      {isLoading ? <Skeleton active={true} /> : <Row gutter={32}>
        <Col span={6}>
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
        <Col span={18}>
          <Outlet />
        </Col>
      </Row>
      }
    </div>
  );
};
