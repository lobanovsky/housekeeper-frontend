import React, { useCallback, useRef } from 'react';
import { FileService } from 'backend/services/backend';
import Table, { TablePublicMethods } from 'components/table';
import { getFileColumns } from './columns';
import { fileFilters } from './filters';
import './styles.scss';

function UploadedFiles() {
  const tableRef = useRef<TablePublicMethods>(null);

  const reloadTable = useCallback(() => {
    tableRef.current?.reloadTable();
  }, [tableRef.current]);

  return (
    <div className="uploaded-files">
      <Table
        ref={tableRef}
        columns={getFileColumns({ reloadTable })}
        loadDataFn={FileService.getAllFiles}
        filters={fileFilters}
      />
    </div>
  );
}

export default UploadedFiles;
