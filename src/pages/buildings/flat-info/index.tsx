import {AccessInfoVO, AccessService, RoomVO} from "backend/services/backend";
import {Card} from "antd";
import {useCallback, useEffect, useState} from "react";
import {useLoading} from "hooks/use-loading";
import Loading from "components/loading";
import {showError} from "utils/notifications";
import './styles.scss';

interface FlatInfoWithOwner {
    ownerName: string;
    accesses: AccessInfoVO[]
}

export const FlatInfo = ({flat}: { flat: RoomVO }) => {
    const [loading, showLoading, hideLoading] = useLoading();

    const [flatInfo, setFlatInfo] = useState<FlatInfoWithOwner | null>(null);

    const loadAccesses = useCallback(() => {
        showLoading();
        AccessService.findByRoom({roomId: flat.id || 0, active: true})
            .then((resp: AccessInfoVO[]) => {
                const ownerRoom = resp.length ? (resp[0].rooms || []).find(({id}) => id === flat.id) : null;
                const ownerFio = ownerRoom?.ownerName || '';
                setFlatInfo({
                    ownerName: ownerFio,
                    accesses: resp
                });

                hideLoading();
            })
            .catch(e => {
                showError('Не удалось загрузить инфо о квартире', e);
                hideLoading();
            })
    }, [flat.id]);

    useEffect(() => {
        loadAccesses();
    }, [flat.id]);

    return <Card size="small" title={<div className='flat-title'>
        <div style={{fontWeight: 600}}>Кв. {flat.number}</div>
        <div className='address'>
            {`${flat.street}, д. ${flat.building}`}
        </div>
    </div>}>
        <div className='flat-info'>
            {loading && <Loading/>}
            <div className={`accesses ${!flatInfo?.accesses?.length ? 'empty' : ''}`}>
                {flatInfo?.accesses?.length ? flatInfo?.accesses.map(
                    ({
                         id, phoneNumber, areas = [], rooms = []
                     }: AccessInfoVO, index) => <div
                        key={id}
                        className='access-info'>
                        <div className='phone'>{index + 1}. <span style={{fontWeight: 600}}>{phoneNumber}</span></div>
                        <div className={`accesses ${!areas.length ? 'empty' : ''}`}>
                            {areas.length ? <>
                                <span style={{fontWeight: 500}}>Доступы: </span>
                                {areas.map(({name}) => name).join(', ')}
                            </> : 'нет доступов'}
                        </div>
                        <div className={`rooms`}>
                            <span style={{fontWeight: 500}}>Собственность: </span>
                            {rooms.map(({
                                            typeDescription = '',
                                            number = ''
                                        }) => `${typeDescription} ${number}`).join(', ')}
                        </div>
                    </div>) : 'нет информации'}
            </div>
        </div>

    </Card>
}
