import React, { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { EnumFileFilterFileType, FileService } from 'backend/services/backend';
import Table, { TablePublicMethods } from 'components/table';
import { getIsAdmin } from 'store/selectors/auth';
import { getFileColumns } from './columns';
import { fileFilters } from './filters';
import './styles.scss';

function UploadedFiles() {
  const isAdmin = useSelector(getIsAdmin);
  const tableRef = useRef<TablePublicMethods>(null);

  const reloadTable = useCallback(() => {
    tableRef.current?.reloadTable();
  }, [tableRef.current]);

  return (
    <div className="uploaded-files">
      <Table
        ref={tableRef}
        columns={getFileColumns({
          reloadTable,
          canDeleteFiles: isAdmin
        })}
        loadDataFn={FileService.getAllFiles}
        filters={fileFilters}
        defaultFilterValues={{ fileType: EnumFileFilterFileType.PAYMENTS }}
      />
    </div>
  );
}

export default UploadedFiles;
