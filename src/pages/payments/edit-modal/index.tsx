import {Button, Input, Modal, Typography} from "antd";
import {PaymentService, PaymentVO} from "../../../backend/services/backend";
import './styles.scss';
import {useCallback, useMemo, useState} from "react";
import {CloseCircleOutlined, SaveOutlined} from "@ant-design/icons";
import {showError, showMessage} from "../../../utils/notifications";

interface PaymentEditFormProps {
    payment: PaymentVO;
    onSuccess?: () => void
}

// const [antModal, contextHolder] = Modal.useModal();

const PaymentEditForm = ({payment, onClose, onSuccess}: PaymentEditFormProps & { onClose: () => void, }) => {
    const [newValues, setValues] = useState<PaymentVO>({...payment});


    const onChangeAccount = useCallback(({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
        setValues(prev => ({
            ...prev,
            account: value
        }));
    }, [newValues.account]);

    const isValidForm = useMemo(() => !!newValues.account, [newValues.account]);

    const saveChanges = useCallback(() => {
        // @ts-ignore
        PaymentService.setManualAccountForPayment({id: payment.id, body: {account: newValues.account}})
            .then(() => {
                showMessage('Изменения сохранены');
                if (onSuccess) {
                    onSuccess();
                }

                onClose();
            })
            .catch(e => {
                showError('Не удалось проставить л/с', e);
                onClose();
            })

    }, [newValues.account]);

    return (
        <div className='payment-edit-form'>
            <div className='field account'>
                <Typography.Text className='label'>Номер л/с:</Typography.Text>
                <Input value={newValues.account} onChange={onChangeAccount}/>
            </div>
            <div className='buttons'>
                <Button
                    type='primary'
                    disabled={!isValidForm || newValues.account === payment.account}
                    onClick={saveChanges}
                >
                    <SaveOutlined/>
                    Сохранить изменения
                </Button>
                <Button
                    onClick={onClose}
                >
                    <CloseCircleOutlined/>
                    Отмена
                </Button>
            </div>
        </div>
    )
}

export const showPaymentEditModal = ({payment, onSuccess}: PaymentEditFormProps) => {
    let modal: any = null;

    const closeModal = () => {
        modal?.destroy();
    }

    modal = Modal.info({
        className: 'payment-edit-modal modal-no-btns',
        width: 480,
        title: 'Редактирование платежа',
        content: <PaymentEditForm payment={payment} onSuccess={onSuccess} onClose={closeModal}/>
    })
}
