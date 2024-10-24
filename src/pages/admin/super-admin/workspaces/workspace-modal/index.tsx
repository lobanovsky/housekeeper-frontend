import React, { useCallback, useMemo, useState } from 'react';
import { Provider } from 'react-redux';
import { Button, Input } from 'antd';
import { LoadingOutlined, SaveOutlined } from '@ant-design/icons';

import { Workspace, WorkspaceRequest } from 'backend/services/backend';
import { Loading, useLoading } from 'hooks/use-loading';
import store from 'store';
import { showModal } from 'utils';
import { ModalFormProps } from 'utils/types';
import { getRandomId } from 'utils/utils';
import { createWorkspace, updateWorkspace } from './services';
import './styles.scss';

interface WorkspaceModalProps {
  workspace?: Workspace;
  onFinish: (isSuccess: boolean) => void;
}

const EmptyWorkspace: Workspace = {
  id: 0,
  name: ''
};

const WORKSPACE_FIELDS: Array<{ dataIndex: keyof Workspace, title: string }> = [
  {
    dataIndex: 'name',
    title: 'Наименование'
  }
];

function WorkspaceEditForm({
                             onFinish,
                             onClose,
                             workspace = { ...EmptyWorkspace }
                           }: ModalFormProps<WorkspaceModalProps>) {
  // const { user: { workspaceId } } = useSelector((state: StoreState) => state.auth);
  const [values, setValues] = useState<Workspace>(workspace);
  const [loading, showLoading, hideLoading] = useLoading();

  const isEdit = !!workspace.id;

  const valuesChangeId = useMemo(() => getRandomId(), [values.name]);

  const onSaveWp = useCallback((isSuccess: boolean) => {
    hideLoading();
    onFinish(isSuccess);
    if (isSuccess) {
      onClose();
    }
  }, [onFinish]);

  const editWorkspace = useCallback(() => {
    showLoading();
    updateWorkspace(values as (WorkspaceRequest & { id: number }), onSaveWp);
  }, [valuesChangeId, onSaveWp]);

  const createNewWorkspace = useCallback(() => {
    showLoading();
    const {
      id,
      ...newWorkspace
    } = values;

    createWorkspace(newWorkspace as WorkspaceRequest, onSaveWp);
  }, [valuesChangeId, onSaveWp]);

  return (
    <div className={`company-form ${!values.name ? 'invalid' : ''}`}>
      {loading && <Loading />}
      {WORKSPACE_FIELDS.map(
        ({
           dataIndex,
           title
         }) => (
          <div
            className="field"
            key={dataIndex}
          >
            <div className="field-label">{title}</div>
            <Input
              value={(values[dataIndex] || '') as string}
              onChange={({ target: { value } }) => {
                setValues((prev) => ({
                  ...prev,
                  [dataIndex]: value
                }));
              }}
            />
          </div>
        )
      )}
      <div className="modal-buttons">
        <Button
          type="primary"
          disabled={!values.name}
          onClick={isEdit ? editWorkspace : createNewWorkspace}
        >
          {loading ? <LoadingOutlined /> : <SaveOutlined />}
          {isEdit ? 'Сохранить изменения' : 'Создать пространство'}
        </Button>
        <Button onClick={onClose}>Отмена</Button>
      </div>
    </div>
  );
}

export const showWorkspaceEditModal = (props: WorkspaceModalProps) => {
  showModal({
    width: 680,
    closable: true,
    className: 'workspace-edi-modal modal-no-btns',
    title: props.workspace?.id ? props.workspace?.name : 'Новое пространство',
    getContent: ({ closeModal }) => (
      <Provider store={store}>
        <WorkspaceEditForm
          {...props}
          onClose={closeModal}
        />
      </Provider>
    )
  });
};
