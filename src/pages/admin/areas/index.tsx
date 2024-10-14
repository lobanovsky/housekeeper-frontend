import React, { useCallback } from 'react';
import { Button, List, Tooltip } from 'antd';
import { DownloadOutlined, LoadingOutlined } from '@ant-design/icons';
import useRemoteData from 'hooks/use-remote-data';
import { AreaEntity, AreaService } from 'backend/services/backend';
import { useLoading } from 'hooks/use-loading';
import { AreaNames } from 'utils/constants';
import { downloadFile } from 'utils/utils';
import './styles.scss';

function DownloadButton({ areaId }: { areaId: number }) {
  const [isExporting, showExportLoading, hideExportLoading] = useLoading();

  const downloadAreaAccesses = useCallback(() => {
    if (!areaId) {
      return;
    }
    showExportLoading();
    downloadFile({
      url: `/access/export/eldes/${areaId}`,
      onFinish: hideExportLoading
    });
  }, [areaId]);

  return (
    <Tooltip title="Скачать файл для ELDES">
      <Button
        type="link"
        onClick={downloadAreaAccesses}
      >
        {isExporting ? <LoadingOutlined /> : <DownloadOutlined />}
      </Button>
    </Tooltip>
  );
}

export function AreasList() {
  const [areas, isLoadingAreas] = useRemoteData<AreaEntity[]>(AreaService.findAll2);
  const [loading, showLoading, hideLoading] = useLoading();

  const downloadExcel = useCallback(() => {
    showLoading();
    downloadFile({
      url: '/access/export',
      onFinish: hideLoading
    });
  }, []);

  const renderAreaItem = useCallback(({
                                        id = 0,
                                        name = ''
                                      }: AreaEntity) => (
    <List.Item key={id}>
      <div className="area-item" key={id}>
        <div className="icon">
          {AreaNames[id]?.icon}
        </div>
        <div className="name">{name}</div>
        <DownloadButton areaId={id} />

      </div>
    </List.Item>
  ), []);

  return (
    <div className="areas view">
      <Button className="export-btn" size="small" onClick={downloadExcel}>
        {loading ? <LoadingOutlined /> : <DownloadOutlined />}
        Выгрузить доступы в Excel
      </Button>
      <List
        // bordered
        style={{ width: 250 }}
        dataSource={areas || []}
        renderItem={renderAreaItem}
        pagination={false}
        loading={isLoadingAreas}
      />
    </div>
  );
}
