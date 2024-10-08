import React, { useCallback, useMemo, useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { LoadingOutlined, SaveOutlined } from '@ant-design/icons';
import { ActionCallback, ActionFinishCallback } from 'utils/types';
import { CounterpartyRequest, CounterpartyService } from 'backend/services/backend';
import { useLoading } from 'hooks/use-loading';
import { showError, showMessage } from 'utils/notifications';

function CounterpartyEditForm({ counterparty, onFinish, onClose }: {
  counterparty: CounterpartyRequest & { id?: number },
  onFinish: ActionFinishCallback,
  onClose: ActionCallback
}) {
  const [values, setValues] = useState<CounterpartyRequest & { id?: number }>({ ...counterparty });
  const [loading, showLoading, hideLoading] = useLoading();

  const valuesChanged = useMemo(
    () => counterparty.name !== values.name || counterparty.inn !== values.inn,
    [counterparty.name, counterparty.inn, values.name, values.inn]
  );

  const onChangeName = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      name: value
    }));
  }, []);

  const onChangeINN = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      inn: value
    }));
  }, []);

  const saveChanges = useCallback(() => {
    showLoading();
    const { id, ...newValues } = values;
    const promise = id ? CounterpartyService.update({ counterpartyId: counterparty.id || 0, body: newValues })
      : CounterpartyService.create({ body: newValues });

    promise.then(() => {
      showMessage('Изменения сохранены');
      onFinish(true);
      onClose();
    })
      .catch((e) => {
        hideLoading();
        showError('Не удалось сохранить компанию-поставшика ресурсов', e);
      });
  }, [counterparty.id, counterparty.inn, counterparty.name]);

  return (
    <div className="cunterparty-form">
      {/* {loading && <Loading />} */}
      <div className="field name">
        <div className="field-label">Наименование компании</div>
        <Input
          value={values.name}
          onChange={onChangeName}
          placeholder="Наименование компании"
          disabled={loading}
        />
      </div>
      <div className="field inn">
        <div className="field-label">ИНН</div>
        <Input value={values.inn} onChange={onChangeINN} placeholder="ИНН" disabled={loading} />
      </div>
      {/* <div className='field bankName'> */}
      {/*    <div className='field-label'>Банк</div> */}
      {/*    <Input value={values.bank} onChange={onChangeBank} placeholder='Банк' disabled={loading}/> */}
      {/* </div> */}
      <div className="buttons">
        <Button
          type="primary"
          disabled={!values.inn || !values.name || loading || !valuesChanged}
          onClick={saveChanges}
        >
          {loading ? <LoadingOutlined /> : <SaveOutlined />}
          {' '}
          Сохранить
        </Button>
        <Button onClick={onClose}>Отмена</Button>
      </div>
    </div>
  );
}

export const showCounterpartyModal = ({ counterparty, onFinish }: {
  counterparty: CounterpartyRequest & { id?: number },
  onFinish: ActionCallback
}) => {
  let modal: any = null;

  const closeModal = () => {
    modal?.destroy();
  };

  modal = Modal.info({
    width: 600,
    closable: true,
    className: 'counterparty-modal',
    title: counterparty.id ? counterparty.name : 'Новая компания',
    content: <CounterpartyEditForm counterparty={counterparty} onFinish={onFinish} onClose={closeModal} />
  });
};
