import React, { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button, Tabs } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, UploadOutlined } from '@ant-design/icons';
import { showFileUploadModal } from 'components/file-upload/modal';
import { getIsAdmin } from 'store/selectors/auth';
import IncomingPayments from './incoming';
import OutgoingPayments from './outgoing';
import './styles.scss';

function Payments() {
  const isAdmin = useSelector(getIsAdmin);
  const incomingTableRef = useRef(null);
  const outgoingTableRef = useRef(null);

  const reloadTables = useCallback(() => {
    // @ts-ignore
    incomingTableRef.current?.reloadTable();
    // @ts-ignore
    outgoingTableRef.current?.reloadTable();
    // @ts-ignore
  }, [incomingTableRef.current?.reloadTable, outgoingTableRef.current?.reloadTable]);

  const showPaymentsUploadModal = useCallback(() => {
    showFileUploadModal({
      title: 'Загрузка файла платежей',
      url: '/files/payments/importer',
      successMsg: 'Файл с платежами загружен',
      errorMsg: 'Не удалось загрузить файл с платежами',
      onFinish: (isSuccess: boolean) => {
        if (isSuccess) {
          reloadTables();
        }
      }
    });
  }, [reloadTables]);

  return (
    <div className="payments view">
      {isAdmin && (
        <Button size="small" className="upload-btn" type="dashed" onClick={showPaymentsUploadModal}>
          <UploadOutlined />
          Загрузить файл
        </Button>
      )}

      <Tabs
        defaultActiveKey="incoming"
        type="card"
        items={[
          {
            key: 'incoming',
            label: <>
              <ArrowDownOutlined />
              Входящие
                   </>,
            children: <IncomingPayments ref={incomingTableRef} />
          },
          {
            key: 'outgoing',
            label: <>
              <ArrowUpOutlined />
              Исходящие
                   </>,
            children: <OutgoingPayments ref={outgoingTableRef} />
          }
        ]}
      />
    </div>
  );
}

export default Payments;
