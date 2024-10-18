import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import Table from 'components/table';
import { GateService } from 'backend/services/backend';
import { gateLogColumns } from 'pages/gates/logs/columns';
import { gateLogFilters } from 'pages/gates/logs/filters';
import './style.scss';

export const GatesLog = forwardRef((props, ref) => {
  const tableRef = useRef(null);

  const reloadTable = useCallback(() => {
    // @ts-ignore
    tableRef?.current?.reloadTable();
  }, [tableRef?.current]);

  useImperativeHandle(ref, () => ({
    reloadTable
  }), [reloadTable]);

  return (
    <div className="gates-log">
      <Table
        ref={tableRef}
        columns={gateLogColumns}
        loadDataFn={GateService.findAllLogEntries}
        filters={gateLogFilters}
        isValidForm={({ gateId }: { gateId: number }) => !!gateId}
        defaultFilterValues={{
          gateId: 1
        }}
      />
    </div>
  );
});

export default GatesLog;
