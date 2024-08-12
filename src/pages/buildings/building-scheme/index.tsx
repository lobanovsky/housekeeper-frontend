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
import {FloorColors, FloorNumberProps} from "./colors";

const MaxRoomsOnFloor = 10;

interface FloorsWithNumbers extends Omit<FloorResponse, 'rooms'>, FloorNumberProps {
    // двоичный массив комнат - например для паркинга
    rooms: RoomVO[][]
}

export const BuildingScheme = ({building}: { building: Building }) => {
    const [loading, showLoading, hideLoading] = useLoading();
    const [floors, setFloors] = useState<FloorsWithNumbers[]>([]);
    const [selectedFlat, setSelectedFlat] = useState<RoomVO | null>(null);

    const getBuildingPlan = useCallback(() => {
        showLoading();
        const isParking = building.type === EnumBuildingType.UNDERGROUND_PARKING;
        RoomService.getBuildingStructure({buildingId: building.id || 0})
            .then((floors: FloorResponse[]) => {
                hideLoading();
                // для паркинга делим по 10 мест на этаже. тк там слишком длинно
                const floorsWithMaxRooms: FloorsWithNumbers[] = [];
                floors.forEach(({floor = 0, rooms = []}, index) => {
                    const roomsArr: RoomVO[][] = [];
                    const colorSettings: FloorNumberProps = isParking ? {...FloorColors[index]} : {
                        background: '',
                        label: ''
                    };

                    for (let i = 0; i <= rooms.length; i += MaxRoomsOnFloor) {
                        const tenRooms = rooms.slice(i, i + MaxRoomsOnFloor);
                        roomsArr.push(tenRooms);
                    }

                    floorsWithMaxRooms[index] = {
                        floor,
                        rooms: roomsArr.reverse(),
                        ...colorSettings
                    }
                });

                setFloors(floorsWithMaxRooms.reverse());
            })
            .catch(e => {
                showError('Не удалось загрузить инфо о здании', e);
                hideLoading();
            })
    }, [building.id, building.type]);

    useEffect(() => {
        setSelectedFlat(null);
        getBuildingPlan();
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
                <div className='plan'>
                    {floors.map(({floor = 0, rooms = [], background, label}, floorIndex = 0) =>
                        <div className={`floor`} key={floor}>
                            <div className={`floor-number`}>
                                <span className='floor-label' style={label ? {color: label} : {}}>
                                    {floor}
                                </span>
                            </div>
                            <div className='rooms'
                                /*@ts-ignore*/
                                 style={background ? {background} : {}}>
                                {rooms.map((maxRooms, index) =>
                                    <div className='rooms-of-floor' key={maxRooms.map(({number}) => number).join('.')}>
                                        {maxRooms.map(flat => (
                                            <div className='flat-container' key={flat.number}>
                                                <div role='button'
                                                     key={flat.number}
                                                     className={`flat ${String(flat.type)} ${flat.id === selectedFlat?.id ? 'selected' : ''}`}
                                                     onClick={() => {
                                                         setSelectedFlat(flat);
                                                     }}>
                                                    {flat.number}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                {selectedFlat?.id && <div className='flat-info'>
                    <FlatInfo flat={selectedFlat}/>
                </div>
                }
            </div>}

        </div>
    )
}
