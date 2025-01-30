import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { App as AppContext, Layout } from 'antd';
import NotificationsProvider from 'global/NotificationsProvider';

import { logout } from 'store/reducers/auth';
import { AreaEntity, AreaService } from './backend/services/backend';
import { DictionariesContext } from './context/AppContext';
import useRemoteData from './hooks/use-remote-data';
import { AppHeader, PageHeader, Sider } from './layout';
import { AppRoutes } from './navigation/routes';
import { PrivatePage } from './navigation/routes/private-route';
import { getUserData } from './pages/auth/login/helpers';
import { Buildings } from './pages/buildings';
import { BuildingScheme } from './pages/buildings/components/building-scheme';
import { FlatInfo } from './pages/buildings/components/flat-info';
import { StoreState } from './store';
import './App.scss';

function App() {
  const [areas] = useRemoteData<AreaEntity[]>(AreaService.findAll2, {
    errorMsg: 'Не удалось загрузить список типов доступов'
  });

  const dispatch = useDispatch();
  const {
    user,
    isUserLoggedIn
  } = useSelector((state: StoreState) => state.auth);

  useEffect(() => {
    if (isUserLoggedIn) {
      getUserData(user, dispatch);
    } else {
      // @ts-ignore
      dispatch(logout());
    }
  }, []);

  return (
    <div className="App">
      {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
      <DictionariesContext.Provider value={{ areas: areas || [] }}>
        <AppContext>
          <NotificationsProvider />
          <BrowserRouter>
            <Layout>
              {isUserLoggedIn && <Sider />}
              <Layout>
                <AppHeader />
                <Layout.Content>
                  {isUserLoggedIn && <PageHeader />}
                  <Routes>
                    <Route path="/buildings" element={<PrivatePage><Buildings /></PrivatePage>}>
                      <Route
                        path=":buildingId"
                        element={<PrivatePage><BuildingScheme /></PrivatePage>}
                      >
                        <Route
                          path="rooms/:roomId"
                          element={<PrivatePage><FlatInfo /></PrivatePage>}
                        />
                      </Route>
                    </Route>
                    {AppRoutes.map(
                      ({
                         roles = [],
                         path,
                         element,
                         ...routeProps
                       }) => (
                        <Route
                          key={path}
                          {...routeProps}
                          path={path}
                          element={<PrivatePage roles={roles}>{element}</PrivatePage>}
                        />
                      )
                    )}
                    <Route
                      path="*"
                      element={<Navigate replace to="/buildings" />}
                    />
                  </Routes>
                </Layout.Content>
                {/* <Footer> */}
                {/*   <div className="company-name">© 2020-2024 Бюро Лобановского</div> */}
                {/* </Footer> */}
              </Layout>

            </Layout>
          </BrowserRouter>
        </AppContext>
      </DictionariesContext.Provider>
    </div>
  );
}

export default App;
