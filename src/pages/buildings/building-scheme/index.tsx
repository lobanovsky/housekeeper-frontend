import { useEffect, useState } from "react";
import { Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";

import { useLoading } from "hooks/use-loading";
import { AreaVO, Building, EnumBuildingType, RoomVO } from "backend/services/backend";
import Loading from "components/loading";
import "./styles.scss";
import { FlatInfo } from "../flat-info";


import { ParkingIcon } from "icons/parking";
import { BuildingPlan } from "./plan";


export const BuildingScheme = ({ building, areas }: { areas: AreaVO[], building: Building }) => {
    const [loading, showLoading, hideLoading] = useLoading();
    const [selectedFlat, setSelectedFlat] = useState<RoomVO | null>(null);

    useEffect(() => {
        setSelectedFlat(null);
    }, [building.id]);

    // @ts-ignore
    return (
        <div className={`building-plan ${building.type}`}>
            <div className='header'>
                {building.type === EnumBuildingType.APARTMENT_BUILDING && <HomeOutlined/>}
                {building.type === EnumBuildingType.UNDERGROUND_PARKING && <ParkingIcon/>}
                <Typography.Title level={4}>
                    {building.name}</Typography.Title>
            </div>
            {loading ? <Loading/> : <div className='plan-container'>
                <BuildingPlan building={building} onSelectRoom={setSelectedFlat}
                              selectedRoomIds={selectedFlat?.id ? [selectedFlat.id] : []}/>
                {selectedFlat?.id && <div className='flat-info'>
                    <FlatInfo areas={areas} flat={selectedFlat} />
                </div>
                }
            </div>}

        </div>
    )
}
