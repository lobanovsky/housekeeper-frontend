import React from 'react';
import { ColumnsType } from 'antd/es/table';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { FileService, FileType, FileVO } from 'backend/services/backend';
import { ActionCallback, EmptyFunction } from 'utils/types';
import { dateTimeRenderer } from 'utils/renderers';
import { useLoading } from 'hooks/use-loading';
import { showError } from 'utils/notifications';

function DeleteFileButton({
                            fileId,
                            fileName,
                            onSuccess
                          }: {
  fileId: number,
  fileName: string,
  onSuccess: EmptyFunction
}) {
  const [loading, showLoading, hideLoading] = useLoading();
  return (
    <Popconfirm
      title="Удалить файл и его содержимое?"
      onConfirm={() => {
        showLoading();
        FileService.remove({ fileIds: [fileId] })
          .then(() => {
            hideLoading();
            onSuccess();
          })
          .catch((e) => {
            showError(`Не удалось удалить файл ${fileName}`, e);
            hideLoading();
          });
      }}
    >
      <Button>
        {loading ? <LoadingOutlined /> : <DeleteOutlined />}
      </Button>
    </Popconfirm>
  );
}

export const getFileColumns = ({
                                 reloadTable,
                                 canDeleteFiles
                               }: { canDeleteFiles: boolean, reloadTable: ActionCallback }): ColumnsType<FileVO> => [
  {
    dataIndex: 'createDate',
    title: 'Дата загрузки',
    render: dateTimeRenderer
  },
  {
    dataIndex: 'name',
    title: 'Имя файла'
  },
  {
    dataIndex: 'type',
    title: 'Тип',
    render: (type: FileType) => type?.description || ''
  },
  {
    dataIndex: 'checksum',
    title: 'Хеш'
  },
  {
    dataIndex: 'actions',
    title: '',
    hidden: !canDeleteFiles,
    render: (value: string, {
      id = 0,
      name = ''
    }: FileVO) => (
      <DeleteFileButton
        fileId={id}
        fileName={name}
        onSuccess={reloadTable}
      />
    )
  }
]
  .filter(({ hidden }) => !hidden)
  .map((column) => ({
    ...column,
    className: column.dataIndex
  }));
