import React, { useState } from 'react';
import { RcFile } from 'antd/es/upload';
import { Button, Modal, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib';
import axios from 'axios';
import { showError, showMessage } from 'utils/notifications';
import './styles.scss';

function PaymentsImportForm() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const uploadFile = () => {
    const formData = new FormData();
    formData.append('file', fileList[0] as RcFile);

    setUploading(true);
    axios.post('/files/payments/importer', formData)
      .then(() => {
        setUploading(false);
        showMessage('Файл с платежами загружен');
      })
      .catch((e) => {
        showError('Не удалось загрузить файл с платежами', e);
        setUploading(false);
      });
  };

  return (
    <>
      <Upload
        fileList={fileList}
        beforeUpload={(file) => {
          setFileList([...fileList, file]);
          return false;
        }}
        onRemove={(file) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          setFileList(newFileList);
        }}
      >
        <Button icon={<UploadOutlined />}>Выбрать файл</Button>
      </Upload>
      <Button
        type="primary"
        onClick={uploadFile}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {/* {uploading && <LoadingOutlined />} */}
        {uploading ? 'Загружаем файл' : 'Загрузить файл'}
      </Button>
    </>
  );
}

export const showPaymentsImportModal = () => {
  Modal.info({
    width: 600,
    closable: true,
    className: 'payments-import-modal',
    title: 'Загрузка файла платежей',
    content: <PaymentsImportForm />
  });
};
