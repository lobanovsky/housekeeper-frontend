import {useCallback, useEffect, useState} from "react";

import {useLoading} from "../../../hooks/use-loading";
import {Building, RoomService, RoomVO} from "../../../backend/services/backend";
import {showError} from "../../../utils/notifications";
import Loading from "../../../components/loading";
import './styles.scss';
import {FlatInfo} from "../flat-info";

const FLOORS_COUNT = 24;

export const BuildingScheme = ({building}: { building: Building }) => {
    const [loading, showLoading, hideLoading] = useLoading();
    const [floors, setFloors] = useState<RoomVO[][]>([]);
    const [selectedFlat, setSelectedFlat] = useState<RoomVO | null>(null);

    const getBuildingPlan = useCallback(() => {
        showLoading();
        RoomService.makeRoomsReport({pageNum: 0, pageSize: 500, body: {building: building.id}})
            .then(({content = []}: { content: RoomVO[] }) => {
                //todo удалить когда будут этажи
                const roomOnFloor = Math.floor(content.length / FLOORS_COUNT);

                const mapByFloors = [];
                for (let i = 0; i <= FLOORS_COUNT - 1; i++) {
                    const rooms = content.slice(i * roomOnFloor, (i + 1) * roomOnFloor);
                    mapByFloors.push(rooms);
                }

                mapByFloors.forEach((floorRooms = [], index) => {
                    const firstFlat = floorRooms[0];
                    const lastFlat = floorRooms[floorRooms.length - 1];
                    console.log(`On floor ${index + 1} room numbers: [${firstFlat.number}] - [${lastFlat.number}]`)
                })

                hideLoading();
                setFloors(mapByFloors.reverse())
            })
            .catch(e => {
                showError('Не удалось загрузить инфо о здании', e);
                hideLoading();
            })
    }, []);

    useEffect(() => {
        getBuildingPlan();
    }, [building.id]);

    return (
        <div className='building-plan'>
            {loading && <Loading/>}
            <div className='plan'>
                {floors.map((roomsOnFloor, floorNumber) =>
                    <div className='floor'>
                        <div className='floor-number'>{FLOORS_COUNT - floorNumber}</div>
                        {roomsOnFloor.map((flat) =>
                            <div role='button'
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
    )
}
