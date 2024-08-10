import {useCallback, useEffect, useState} from 'react';
import {Button, Col, Divider, List, Row} from 'antd';
import {Building, BuildingService, EnumBuildingType} from 'backend/services/backend';

import {showError} from 'utils/notifications';
import './styles.scss';
import {useLoading} from "../../hooks/use-loading";
import {HomeOutlined} from "@ant-design/icons";
import {ParkingIcon} from "../../icons/parking";
import {BuildingScheme} from "./building-scheme";


export const Buildings = () => {
    const [loading, showLoading, hideLoading] = useLoading();
    const [buildings, setBuildings] = useState<Building[]>([]);
    const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);

    const loadBuildings = useCallback(() => {
        showLoading();
        BuildingService.findAll1()
            .then((responseData: Building[]) => {
                setBuildings(responseData);
                hideLoading();
            })
            .catch(e => {
                showError('Не удалось загрузить список домов', e);
                hideLoading();
            })

    }, []);

    useEffect(() => {
        loadBuildings();
    }, []);

    return (
        <div className='buildings'>
            <Row gutter={32}>
                <Col span={6}>
                    <List
                        bordered={false}
                        dataSource={buildings}
                        renderItem={(building) => <>
                            <div className='building'>
                                <Button type='link' className='building-link' onClick={() => {
                                    setSelectedBuilding(building);
                                }}>
                                    {building.type === EnumBuildingType.APARTMENT_BUILDING && <HomeOutlined/>}
                                    {building.type === EnumBuildingType.UNDERGROUND_PARKING && <ParkingIcon/>}
                                    {building.name}
                                </Button>

                            </div>
                            <Divider style={{margin: '4px 0'}}/>
                        </>
                        }/>
                </Col>
                <Col span={18}>
                    {!!selectedBuilding?.id && <BuildingScheme building={selectedBuilding}/>}
                </Col>
            </Row>
        </div>
    )
}
