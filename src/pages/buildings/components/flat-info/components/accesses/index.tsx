import React, { useContext } from 'react';
import { Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { KeyVO } from 'backend/services/backend';
import { DictionariesContext } from 'context/AppContext';
import { AccessContext } from '../../context/AccessContext';
import { AccessItem } from './access-item';
import { showAddAccessItemModal } from './access-item/add-modal';
import './styles.scss';

export function FlatAccesses({ keys = [] }: {
  keys: KeyVO[],
}) {
  const contextValue = useContext(AccessContext);
  const { areas } = useContext(DictionariesContext);
  const { ownerId, flatNumber, reloadFlatInfo } = contextValue;
  return (
    <div className="flat-accesses">
      <div className="access-header">
        <Typography.Title level={5}>Доступы</Typography.Title>
        <Button
          type="link"
          size="small"
          className="add-btn"
          onClick={() => {
            showAddAccessItemModal({
              reloadInfo: reloadFlatInfo, ownerId, areas, flatNumber
            });
          }}
        >
          <PlusOutlined />
          добавить
        </Button>
      </div>
      {!keys.length && <span className="emtpy-placeholder">не указаны</span>}
      <div style={{ padding: '4px 0' }} />
      {keys.map((accessInfo: KeyVO) => (
        <AccessItem key={accessInfo.id} accessInfo={accessInfo} />
      ))}
    </div>
  );
}
