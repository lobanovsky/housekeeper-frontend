import React, { useCallback, useEffect, useState } from 'react';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { UploadFile } from 'antd/lib';
import { RcFile } from 'antd/es/upload';
import axios from 'axios';
import { FileUploadProps } from 'components/file-upload/types';
import { FileItem } from 'components/file-upload/file-list-renderer';
import { useLoading } from 'hooks/use-loading';
import './style.scss';

export function FileUpload({
                             url,
                             onFinish
                           }: FileUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<UploadFile[]>([]);
  const [uploading] = useLoading();

  const uploadFile = (file: RcFile) => {
    const formData = new FormData();
    formData.append('file', file);
    const fileIndex = selectedFiles.findIndex(({ uid }) => uid === file.uid);
    if (fileIndex > -1) {
      const newFileList = [...selectedFiles];
      newFileList[fileIndex].status = 'uploading';
      setSelectedFiles(newFileList);
    }

    axios
      .post(url, formData, {
        timeout: 2 * 60 * 1000
      })
      .then(() => {
        if (fileIndex > -1) {
          const newFiles = [...selectedFiles];
          // @ts-ignore
          newFiles[fileIndex].status = 'success';
          setSelectedFiles(newFiles);
          // onChangeSelectedFiles(newFiles);
        }
      })
      .catch((e) => {
        if (fileIndex > -1) {
          const errorMsg = e.response?.data?.message
            || e.response?.data?.error
            || e.message
            || 'ошибка загрузки файла';
          const newFiles = [...selectedFiles];
          newFiles[fileIndex].status = 'error';
          newFiles[fileIndex].error = errorMsg;
          setSelectedFiles(newFiles);
        }
      });
  };

  const uploadSelectedFiles = () => {
    const newFiles = selectedFiles.filter(
      // @ts-ignore
      (file) => file.status !== 'success' && file.status !== 'error'
    );
    // @ts-ignore
    newFiles.forEach(uploadFile);
  };

  const onRemoveFile = useCallback(
    (file: RcFile) => {
      const newFiles = [...selectedFiles];
      const fileIndex = selectedFiles.findIndex((selectedFile) => selectedFile.uid === file.uid);
      if (fileIndex > -1) {
        newFiles.splice(fileIndex, 1);
        setSelectedFiles(newFiles);
        // onChangeSelectedFiles(newFiles);
      }
    },
    [selectedFiles.length]
  );

  useEffect(() => {
    const allLoaded = selectedFiles.length
      && selectedFiles.every((file: UploadFile) => file.status === 'success' || file.status === 'error');
    if (allLoaded && onFinish) {
      onFinish(selectedFiles[0].status === 'success');
    }
  }, [selectedFiles.map((file: UploadFile) => `${file.uid}-${file.status}`)]);

  return (
    <div className="file-upload">
      <Upload
        fileList={selectedFiles}
        multiple
        showUploadList={false}
        beforeUpload={(file, fileList) => {
          setSelectedFiles([...fileList]);
          return false;
        }}
        onRemove={(file) => {
          const index = selectedFiles.indexOf(file);
          const newFileList = selectedFiles.slice();
          newFileList.splice(index, 1);
          setSelectedFiles(newFileList);
        }}
      >
        <Button type="dashed">Выбрать файлы</Button>
      </Upload>
      <Button
        type="primary"
        onClick={uploadSelectedFiles}
        disabled={selectedFiles.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
          marginLeft: 20
        }}
      >
        {uploading ? <LoadingOutlined /> : <UploadOutlined />}
        {uploading ? 'Загружаем файлы' : 'Загрузить'}
      </Button>
      <div className="selected-files">
        {selectedFiles.map((file, index) => (
          <FileItem
            key={file.uid}
            file={file}
            index={index}
            onRemoveFile={onRemoveFile}
          />
        ))}
      </div>
    </div>
  );
}
