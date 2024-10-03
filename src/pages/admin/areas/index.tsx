import React, { useCallback } from "react";
import { Button, List } from "antd";
import { DownloadOutlined, LoadingOutlined } from "@ant-design/icons";
import useRemoteData from "hooks/use-remote-data";
import { Area, AreaService } from "backend/services/backend";
import { useLoading } from "hooks/use-loading";
import { AreaNames } from "utils/constants";
import { downloadFile } from "utils/utils";
import "./styles.scss";


const DownloadButton = ({ areaId }: { areaId: number }) => {
  const [isExporting, showExportLoading, hideExportLoading] = useLoading();

  const downloadAreaAccesses = useCallback((areaId: number) => {
    if (!areaId) {
      return;
    }
    showExportLoading();
    downloadFile({
      url: `/access/export/${areaId}`,
      onFinish: hideExportLoading
    });
  }, []);

  return <Button type="link" onClick={() => {
    downloadAreaAccesses(areaId || 0);
  }}>{isExporting ? <LoadingOutlined /> : <DownloadOutlined />}</Button>;
};

export const AreasList = () => {

  const [areas, isLoadingAreas] = useRemoteData<Area[]>(AreaService.findAll2);

  const renderAreaItem = useCallback(({ id = 0, name }: Area) =>
    <List.Item>
      <div className="area-item" key={id}>
        <div className="icon">
          {AreaNames[id]?.icon}
        </div>
        <div className="name">{name}</div>
        <DownloadButton areaId={id} />

      </div>
    </List.Item>, []);

  return <div className="areas view">
    <List
      // bordered
      style={{ width: 250 }}
      dataSource={areas || []}
      renderItem={renderAreaItem}
      pagination={false}
      loading={isLoadingAreas} />
  </div>;
};
