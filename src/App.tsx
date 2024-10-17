import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App as AppContext, Layout } from 'antd';
import { HouseIcon } from 'icons/house';
import NotificationsProvider from 'global/NotificationsProvider';
import PageHeader from 'layout/page-header';
import { Sider } from 'layout/sider';
import { Buildings } from './pages/buildings';
import useRemoteData from './hooks/use-remote-data';
import { AreaEntity, AreaService } from './backend/services/backend';
import { BuildingScheme } from './pages/buildings/components/building-scheme';
import { FlatInfo } from './pages/buildings/components/flat-info';
import { DictionariesContext } from './context/AppContext';
import './App.scss';
import { AppRoutes } from './navigation/routes';

const {
  Header,
  Content
} = Layout;

function App() {
  const [areas] = useRemoteData<AreaEntity[]>(AreaService.findAll2, {
    errorMsg: 'Не удалось загрузить список типов доступов'
  });
  //
  // const dispatch = useDispatch();
  // const {
  //   user,
  //   isUserLoggedIn
  // } = useSelector((state: StoreState) => state.auth);
  //
  // useEffect(() => {
  //   if (isUserLoggedIn) {
  //     getUserData(user, dispatch);
  //   } else {
  //     // @ts-ignore
  //     dispatch(logout());
  //   }
  // }, []);

  return (
    <div className="App">
      {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
      <DictionariesContext.Provider value={{ areas: areas || [] }}>
        <AppContext>
          <NotificationsProvider />
          <BrowserRouter>
            <Layout>
              <Header style={{ paddingInline: 25 }}>
                <HouseIcon style={{
                  marginRight: 5,
                  fontSize: '26px'
                }}
                />
                <div className="app-title">HouseKeeper</div>
                <div className="company-name">© 2020-2024 Бюро Лобановского</div>
              </Header>
              <Layout>
                <Sider />
                <Content>
                  <PageHeader />
                  <Routes>

                    <Route path="/buildings" element={<Buildings />}>
                      <Route
                        path=":buildingId"
                        // todo возможно добавить PrivateRoute и в чилдренов
                        /* @ts-ignore */
                        element={<BuildingScheme />}
                      >
                        <Route
                          path="rooms/:roomId"
                          /* @ts-ignore */
                          element={<FlatInfo />}
                        />
                      </Route>
                    </Route>
                    {AppRoutes.map(
                      ({
                         permissions = [],
                         path,
                         element,
                         ...routeProps
                       }) => (
                        <Route
                          key={path}
                          {...routeProps}
                          path={path}
                          element={element}
                        />
                      )
                    )}
                    <Route
                      path="*"
                      element={<Navigate replace to="/buildings" />}
                    />
                  </Routes>
                </Content>
              </Layout>
            </Layout>
          </BrowserRouter>
        </AppContext>
      </DictionariesContext.Provider>
    </div>
  );
}

export default App;
