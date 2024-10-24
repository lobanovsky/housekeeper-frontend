import React, { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button, Tabs } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { showFileUploadModal } from 'components/file-upload/modal';
import GatesLog from 'pages/gates/logs';
import { getIsAdmin } from 'store/selectors/auth';
import { GateTopUsers } from './tops';
import './style.scss';

function Gates() {
  const isAdmin = useSelector(getIsAdmin);
  const gatesTableRef = useRef(null);
  const ratingTableRef = useRef(null);

  const reloadTables = useCallback(() => {
    // @ts-ignore
    gatesTableRef.current?.reloadTable();
    // @ts-ignore
    ratingTableRef.current?.reloadTable();
    // @ts-ignore
  }, [gatesTableRef.current?.reloadTable, ratingTableRef.current?.reloadTable]);

  const showGatesUploadModal = useCallback(() => {
    showFileUploadModal({
      title: 'Загрузка файла въездов/выездов (шлагбаумы)',
      url: '/files/eldes-gate/importer',
      successMsg: 'Файл с шлагбаумами загружен',
      errorMsg: 'Не удалось загрузить файл с шлагбаумами',
      onFinish: (isSuccess) => {
        if (isSuccess) {
          reloadTables();
        }
      }
    });
  }, [reloadTables]);

  return (
    <div className="gates view">
      {isAdmin && (
        <Button size="small" className="upload-btn" type="dashed" onClick={showGatesUploadModal}>
          <UploadOutlined />
          Загрузить файл
        </Button>
      )}

      <Tabs
        defaultActiveKey="log"
        type="card"
        items={[
          {
            key: 'log',
            label: 'История въездов',
            children: <GatesLog ref={gatesTableRef} />
          },
          {
            key: 'top',
            label: 'Рейтинг',
            children: <GateTopUsers ref={ratingTableRef} />
          }
        ]}
      />
    </div>
  );
}

export default Gates;
