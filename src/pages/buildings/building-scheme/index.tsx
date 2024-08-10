import {useCallback, useEffect, useState} from "react";

import {useLoading} from "../../../hooks/use-loading";
import {Building, EnumBuildingType, FloorResponse, RoomService, RoomVO} from "../../../backend/services/backend";
import {showError} from "../../../utils/notifications";
import Loading from "../../../components/loading";
import './styles.scss';
import {FlatInfo} from "../flat-info";
import {Typography} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import {ParkingIcon} from "../../../icons/parking";

const MaxRoomsOnFloor = 10;

export const BuildingScheme = ({building}: { building: Building }) => {
    const [loading, showLoading, hideLoading] = useLoading();
    const [floors, setFloors] = useState<FloorResponse[]>([]);
    const [selectedFlat, setSelectedFlat] = useState<RoomVO | null>(null);

    const getBuildingPlan = useCallback(() => {
        showLoading();
        RoomService.getBuildingStructure({buildingId: building.id || 0})
            .then((floors: FloorResponse[]) => {
                hideLoading();
                //для паркинга делим по 10 мест на этаже. тк там слишком длинно
                if (building.type === EnumBuildingType.UNDERGROUND_PARKING) {
                    const floorsWithMaxRooms: FloorResponse[] = [];
                    floors.forEach(({floor = 0, rooms = []}) => {
                        for (let i = 0; i <= rooms.length; i += MaxRoomsOnFloor) {
                            const tenRooms = rooms.slice(i, i + MaxRoomsOnFloor);
                            floorsWithMaxRooms.push({floor, rooms: tenRooms})
                        }
                    });

                    console.log(floorsWithMaxRooms.reverse());
                    setFloors(floorsWithMaxRooms.reverse());
                } else {
                    setFloors(floors.reverse())
                }

            })
            .catch(e => {
                showError('Не удалось загрузить инфо о здании', e);
                hideLoading();
            })
    }, [building.id, building.type]);

    useEffect(() => {
        getBuildingPlan();
    }, [building.id]);

    return (
        <div className='building-plan'>
            {loading && <Loading/>}
            <div className='header'>
                {building.type === EnumBuildingType.APARTMENT_BUILDING && <HomeOutlined/>}
                {building.type === EnumBuildingType.UNDERGROUND_PARKING && <ParkingIcon/>}
                <Typography.Title level={4}>
                    {building.name}</Typography.Title>
            </div>
            <div className='plan-container'>
                <div className='plan'>
                    {floors.map(({floor = 0, rooms = []}, floorNumber) =>
                        <div className='floor'>
                            <div className='floor-number'>{floor}</div>
                            {rooms.map((flat) =>
                                <div role='button'
                                     key={flat.number}
                                     className={`flat ${String(flat.type)} ${flat.id === selectedFlat?.id ? 'selected' : ''}`}
                                     onClick={() => {
                                         setSelectedFlat(flat);
                                     }}>
                                    {flat.number}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {selectedFlat?.id && <div className='flat-info'>
                    <FlatInfo flat={selectedFlat}/>
                </div>
                }
            </div>

        </div>
    )
}
