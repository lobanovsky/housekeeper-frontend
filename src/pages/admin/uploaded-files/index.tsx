import React, { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { EnumFileFilterFileType, FileService } from 'backend/services/backend';
import Table, { TablePublicMethods } from 'components/table';
import { getUser } from 'store/reducers/auth/selectors';
import { getFileColumns } from './columns';
import { fileFilters } from './filters';
import './styles.scss';

function UploadedFiles() {
  const tableRef = useRef<TablePublicMethods>(null);
  const {
    isAdmin,
    isSuperAdmin
  } = useSelector(getUser);

  const reloadTable = useCallback(() => {
    tableRef.current?.reloadTable();
  }, [tableRef.current]);

  return (
    <div className="uploaded-files">
      <Table
        ref={tableRef}
        columns={getFileColumns({
          reloadTable,
          canDeleteFiles: isSuperAdmin || isAdmin
        })}
        loadDataFn={FileService.getAllFiles}
        filters={fileFilters}
        defaultFilterValues={{ fileType: EnumFileFilterFileType.PAYMENTS }}
      />
    </div>
  );
}

export default UploadedFiles;
