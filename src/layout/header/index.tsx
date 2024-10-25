import React, { MouseEvent, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Dropdown, Layout } from 'antd';

import { SettingFilled, StarFilled, UserOutlined } from '@ant-design/icons';
import { HouseIcon } from 'icons/house';
import { StoreState } from 'store';
import { logout, workspaceChanged } from 'store/reducers/auth';
import './styles.scss';
import { AvailableWorkspaceResponse } from 'backend/services/backend';
import { workspaceAvatarRenderer } from 'utils/renderers';
import { useWorkspaceMenu } from 'hooks/use-workspace-menu';

export function AppHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    user,
    isUserLoggedIn
  } = useSelector((state: StoreState) => state.auth);

  const onChangeSelectedWorkspace = useCallback((wp: AvailableWorkspaceResponse) => {
    dispatch(workspaceChanged({
      id: wp.id,
      name: wp.name,
      color: wp.color
    }));
    navigate('/buildings');
  }, []);

  const {
    menuItems,
    onSelectWp
  } = useWorkspaceMenu({
    workspaces: user.workspaces || [],
    onOk: onChangeSelectedWorkspace
  });

  const displayName = useMemo(() => {
    const nameParts = user.name ? user.name.split(' ') : [];
    return nameParts.length > 1 ? nameParts[1] : user.name;
  }, [user.name]);

  const onLinkClick = useCallback((ev: MouseEvent) => {
    ev.preventDefault();
  }, []);

  const onLogoutClick = useCallback(() => {
    // @ts-ignore
    dispatch(logout());
  }, []);

  // @ts-ignore
  return (
    <Layout.Header>
      <HouseIcon style={{
        marginRight: 5,
        fontSize: '26px'
      }}
      />
      <div className="app-title">HouseKeeper</div>
      {
        isUserLoggedIn && (
          <div className="user-info">
            {workspaceAvatarRenderer({
              id: user.workspaceId,
              name: user.workspaceName,
              color: user.workspaceColor
            }, 'workspace-avatar')}
            {!!user.workspaceName && (user.workspaces || []).length > 1
              ? (
                <Dropdown
                  className="workspace-selector"
                  placement="bottomRight"
                  // @ts-ignore
                  menu={{
                    items: menuItems,
                    onClick: onSelectWp
                  }}
                >
                  <span className="workspace-selected">{user.workspaceName}</span>
                </Dropdown>
              ) : <span className="workspace-name">{user.workspaceName}</span>}
            <Dropdown
              className="user-name"
              menu={{
                items: [
                  {
                    key: 'logout',
                    label: 'Выход',
                    onClick: onLogoutClick
                  }
                ]
              }}
            >
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/no-static-element-interactions */}
              <a onClick={onLinkClick}>
                {user.isSuperAdmin ? <StarFilled />
                  : (
                    // eslint-disable-next-line react/jsx-no-undef
                    user.isAdmin ? <SettingFilled /> : <UserOutlined />
                  )}
                <span className="userName">{displayName}</span>
              </a>
            </Dropdown>
          </div>
        )
      }
    </Layout.Header>
  );
}
