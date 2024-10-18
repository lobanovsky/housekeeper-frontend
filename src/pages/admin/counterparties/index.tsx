import React, { useCallback, useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CounterpartyService } from '../../../backend/services/backend';
import { counterpartyColumns } from './columns';
import { showError } from '../../../utils/notifications';
import { useLoading } from '../../../hooks/use-loading';
import { showCounterpartyModal } from './modal';

import './style.scss';

export function Counterparties() {
  const [data, setData] = useState([]);
  const [loading, showLoading, hideLoading] = useLoading();
  const [isEmptyTable, setIsEmptyTable] = useState(true);

  const loadData = useCallback(() => {
    showLoading();
    CounterpartyService.findAll()
      .then((loadedData) => {
        hideLoading();
        setIsEmptyTable(!loadedData.length);
        setData(loadedData);
      })
      .catch((e) => {
        hideLoading();
        showError('Не удалось загрузить список компаний-поставщиков ресурсов', e);
      });
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={`view counterparties ${loading ? 'loading' : ''} ${isEmptyTable ? 'no-data' : ''}`}>
      <Button
        type="link"
        className="add-btn"
        onClick={() => {
          showCounterpartyModal({
            counterparty: {
              id: 0,
              name: ''
            },
            onFinish: loadData
          });
        }}
      >
        <PlusOutlined />
        добавить компанию
      </Button>
      <Table
        rowKey="id"
        loading={loading}
        size="small"
        columns={counterpartyColumns}
        dataSource={data}
        onRow={(row) => ({
          onClick: () => {
            showCounterpartyModal({
              counterparty: row,
              onFinish: loadData
            });
          }
        })}
        pagination={{
          size: 'small',
          hideOnSinglePage: false,
          position: ['topRight'],
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50, 100],
          locale: { items_per_page: '/ стр' },
          showTotal: (total, range) => `${range[0]}-${range[1]} из ${total}`
        }}
      />
    </div>
  );
}
