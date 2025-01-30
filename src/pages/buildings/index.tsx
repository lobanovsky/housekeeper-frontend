import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';
import { Col, Menu, Row, Skeleton } from 'antd';
import { Building, BuildingService, EnumBuildingType } from 'backend/services/backend';
import useRemoteData from 'hooks/use-remote-data';
import { BuildingIcons, IS_DEBUG } from 'utils/constants';
import { BuildingsSearchForm } from './components/search-form';
import './styles.scss';

export function Buildings() {
  const navigate = useNavigate();
  const { buildingId: selectedBuildingId = '' } = useParams();
  const [buildings, isLoading] = useRemoteData<Building[]>(BuildingService.findAll1);
  const [selectedBuildingIds, setSelectedBuildingIds] = useState(parseInt(selectedBuildingId, 10) ? [selectedBuildingId] : []);

  const selectBuilding = useCallback(({ key = '' }: { key: string }) => {
    if (key) {
      setSelectedBuildingIds([key]);
      navigate(`/buildings/${key}`);
    } else {
      setSelectedBuildingIds([]);
    }
  }, []);

  useEffect(() => {
    if (buildings?.length && !selectedBuildingId) {
      const firstBuilding: Building = buildings[0];
      selectBuilding({ key: String(firstBuilding.id) });
    }
  }, [buildings?.length]);

  return (
    <div className="buildings view">
      {isLoading ? <Skeleton active /> : (
        <Row gutter={32} style={{ margin: 0 }}>
          <Col span={7}>
            <BuildingsSearchForm />
            <Menu
              selectedKeys={selectedBuildingIds}
              onClick={selectBuilding}
              items={
                (buildings || []).map((building) => ({
                  key: building.id || 0,
                  label: `${building.name}${IS_DEBUG ? ` (id=${building.id})` : ''}`,
                  icon: BuildingIcons[building.type as EnumBuildingType] || ''
                }))
              }
            />
          </Col>
          <Col span={17}>
            <Outlet />
          </Col>
        </Row>
      )}
    </div>
  );
}
