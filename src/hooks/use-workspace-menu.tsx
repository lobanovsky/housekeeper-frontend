import React, { useCallback, useMemo } from 'react';
import { Menu, Modal } from 'antd';
import { AvailableWorkspaceResponse } from '../backend/services/backend';
import { workspaceAvatarRenderer } from '../utils/renderers';
import { modal } from '../global/NotificationsProvider';

export interface WorkspaceMenuProps {
  workspaces: AvailableWorkspaceResponse[],
  onOk: (wp: AvailableWorkspaceResponse) => void
}

export const useWorkspaceMenu = ({
                                   workspaces,
                                   onOk
                                 }: WorkspaceMenuProps) => {
  const menuItems = useMemo(() => workspaces.map((workspace) => ({
    key: `${workspace.id}`,
    label: (
      <div className="workspace-item">
        {workspaceAvatarRenderer(workspace)}
        <span style={{ marginLeft: 4 }}>{workspace.name}</span>
      </div>
    )
  })), [workspaces.length]);

  const onSelectWp = useCallback(({ key }: any) => {
    const selectedWp = workspaces.find(({ id }) => String(id) === String(key));
    if (selectedWp) {
      Modal.destroyAll();
      onOk(selectedWp);
    } else {
      // eslint-disable-next-line no-console
      console.error('Выбранного пространства не существует!!');
    }
  }, [workspaces.length, onOk]);

  return {
    menuItems,
    onSelectWp
  };
};

function WorkspaceMenu({
                         workspaces,
                         onOk
                       }: WorkspaceMenuProps) {
  const {
    menuItems,
    onSelectWp
  } = useWorkspaceMenu({
    workspaces,
    onOk
  });

  return <Menu items={menuItems} onClick={onSelectWp} />;
}

export const showWorkspaceSelectModal = (props: WorkspaceMenuProps) => {
  modal.info({
    className: 'workspace-selector',
    title: 'Выберите пространство для работы',
    content: <WorkspaceMenu {...props} />
  });
};
