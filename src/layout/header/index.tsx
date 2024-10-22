import React, { MouseEvent, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Avatar, Dropdown, Layout } from 'antd';

import { SettingFilled, StarFilled, UserOutlined } from '@ant-design/icons';
import { HouseIcon } from '../../icons/house';
import { StoreState } from '../../store';
import { logout, workspaceChanged } from '../../store/reducers/auth';
import './styles.scss';
import { AvailableWorkspaceResponse } from '../../backend/services/backend';

export function AppHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    user,
    isUserLoggedIn
  } = useSelector((state: StoreState) => state.auth);

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
            {!!user.workspaceName && (user.workspaces || []).length > 1
              ? (
                <Dropdown
                  className="workspace-selector"
                  placement="bottomRight"
                  menu={{
                    className: 'workspaces-menu',
                    onClick: ({
                                item,
                                key,
                                keyPath,
                                domEvent
                              }) => {
                      const [workspaceIdStr, workspaceName = ''] = key.split(' - ');
                      const workspaceId = parseInt(workspaceIdStr, 10);
                      if (workspaceId) {
                        dispatch(workspaceChanged({
                          id: workspaceId,
                          name: workspaceName
                        }));
                        navigate('/buildings');
                      }
                    },
                    items: (user.workspaces || []).map((workspace: AvailableWorkspaceResponse) => ({
                      key: `${workspace.id} - ${workspace.name}`,
                      label: <div className="workspace-item">
                        <Avatar style={{
                          marginRight: 4,
                          // todo wp color
                          backgroundColor: 'gray',
                          color: 'white'
                        }}
                        >
                          {workspace.name ? workspace.name[0].toUpperCase() : '?'}
                        </Avatar>
                        {workspace.name}
                             </div>
                    }))
                  }}
                >
                  <span className="workspace-name">{user.workspaceName}</span>
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
