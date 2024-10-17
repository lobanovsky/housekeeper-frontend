import React, { MouseEvent, useCallback, useMemo } from 'react';
import { Dropdown, Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SettingOutlined, StarTwoTone, UserOutlined } from '@ant-design/icons';
import { HouseIcon } from '../../icons/house';
import { StoreState } from '../../store';
import { logout } from '../../store/reducers/auth';
import './styles.scss';

export function AppHeader() {
  const dispatch = useDispatch();

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
    <Layout.Header style={{ paddingInline: 25 }}>
      <HouseIcon style={{
        marginRight: 5,
        fontSize: '26px'
      }}
      />
      <div className="app-title">HouseKeeper</div>
      {
        isUserLoggedIn && (
          <div className="user-info">
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
                {user.isSuperAdmin ? <StarTwoTone twoToneColor="rgb(217,7,245)" />
                  : (
                    // eslint-disable-next-line react/jsx-no-undef
                    user.isAdmin ? <SettingOutlined style={{ color: 'rgb(254,138,12)' }} /> : <UserOutlined />
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
