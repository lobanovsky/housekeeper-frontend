import {Button, Input, Modal} from 'antd';
import {LoadingOutlined, SaveOutlined} from '@ant-design/icons';
import {useCallback, useMemo, useState} from "react";

import {ActionCallback, ActionFinishCallback} from "utils/types";
import {CounterpartyRequest, CounterpartyService} from "backend/services/backend";
import {useLoading} from "../../../../hooks/use-loading";
import {showError, showMessage} from "../../../../utils/notifications";

const CounterpartyEditForm = ({counterparty, onFinish, onClose}: {
    counterparty: CounterpartyRequest & { id?: number },
    onFinish: ActionFinishCallback,
    onClose: ActionCallback
}) => {
    const [values, setValues] = useState<CounterpartyRequest & { id?: number }>({...counterparty});
    const [loading, showLoading, hideLoading] = useLoading();


    const valuesChanged = useMemo(() => {
        return counterparty.originalName !== values.originalName || counterparty.inn !== values.inn
    }, [counterparty.originalName, counterparty.inn, values.originalName, values.inn]);

    const onChangeName = useCallback(({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
        setValues(prev => ({
            ...prev,
            originalName: value
        }))
    }, []);

    const onChangeINN = useCallback(({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
        setValues(prev => ({
            ...prev,
            inn: value
        }))
    }, []);

    const onChangeBank = useCallback(({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
        setValues(prev => ({
            ...prev,
            bank: value
        }))
    }, []);

    const saveChanges = useCallback(() => {
        showLoading();
        const {id, ...newValues} = values;
        const promise = !!id ? CounterpartyService.update({counterpartyId: counterparty.id || 0, body: newValues})
            : CounterpartyService.create({body: newValues});


        promise.then(resp => {
            showMessage('Изменения сохранены');
            onFinish(true);
            onClose();
        })
            .catch(e => {
                hideLoading();
                showError('Не удалось сохранить компанию-поставшика ресурсов', e);
            })
    }, [counterparty.id, counterparty.inn, counterparty.originalName]);


    return (
        <div className='cunterparty-form'>
            {/*{loading && <Loading />}*/}
            <div className='field originalName'>
                <div className='field-label'>Наименование компании</div>
                <Input value={values.originalName} onChange={onChangeName} placeholder='Наименование компании'
                       disabled={loading}/>
            </div>
            <div className='field inn'>
                <div className='field-label'>ИНН</div>
                <Input value={values.inn} onChange={onChangeINN} placeholder='ИНН' disabled={loading}/>
            </div>
            {/*<div className='field bankName'>*/}
            {/*    <div className='field-label'>Банк</div>*/}
            {/*    <Input value={values.bank} onChange={onChangeBank} placeholder='Банк' disabled={loading}/>*/}
            {/*</div>*/}
            <div className='buttons'>
                <Button type='primary' disabled={!values.inn || !values.originalName || loading || !valuesChanged}
                        onClick={saveChanges}>
                    {loading ? <LoadingOutlined/> : <SaveOutlined/>} Сохранить</Button>
                <Button onClick={onClose}>Отмена</Button>
            </div>
        </div>
    )
        ;
}


export const showCounterpartyModal = ({counterparty, onFinish}: {
    counterparty: CounterpartyRequest & { id?: number },
    onFinish: ActionCallback
}) => {
    let modal: any = null;

    const closeModal = () => {
        modal?.destroy();
    }


    modal = Modal.info({
        width: 600,
        closable: true,
        className: 'counterparty-modal',
        title: counterparty.id ? counterparty.originalName : 'Новая компания',
        content: <CounterpartyEditForm counterparty={counterparty} onFinish={onFinish} onClose={closeModal}/>
    });
}

