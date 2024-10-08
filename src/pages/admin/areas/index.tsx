import React, { useCallback } from 'react';
import { Button, List } from 'antd';
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
      url: `/access/export/${areaId}`,
      onFinish: hideExportLoading
    });
  }, [areaId]);

  return (
    <Button
      type="link"
      onClick={downloadAreaAccesses}
    >
      {isExporting ? <LoadingOutlined /> : <DownloadOutlined />}
    </Button>
  );
}

export function AreasList() {
  const [areas, isLoadingAreas] = useRemoteData<AreaEntity[]>(AreaService.findAll2);

  const renderAreaItem = useCallback(({ id = 0, name = '' }: AreaEntity) => (
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
