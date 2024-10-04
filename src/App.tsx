import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App as AppContext, Layout } from 'antd';
import { HouseIcon } from 'icons/house';
import NotificationsProvider from 'global/NotificationsProvider';
import PageHeader from 'layout/page-header';
import { Sider } from 'layout/sider';
import IncomingPayments from 'pages/payments/incoming';
import OutgoingPayments from 'pages/payments/outgoing';
import Rooms from 'pages/rooms';
import Gates from 'pages/gates';
import UploadedFiles from 'pages/admin/uploaded-files';
import { ExpensesView } from './pages/expences';
import { Counterparties } from './pages/admin/counterparties';
import { Buildings } from './pages/buildings';
import useRemoteData from './hooks/use-remote-data';
import { Area, AreaService } from './backend/services/backend';
import { BuildingScheme } from './pages/buildings/components/building-scheme';
import { FlatInfo } from './pages/buildings/components/flat-info';
import { DictionariesContext } from './context/AppContext';
import './App.scss';
import { AreasList } from './pages/admin/areas';

// todo роуты вынести отдельно
const { Header, Content } = Layout;

function App() {
  const [areas] = useRemoteData<Area[]>(AreaService.findAll2, {
    errorMsg: 'Не удалось загрузить список типов доступов'
  });

  return (
    <div className="App">
      {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
      <DictionariesContext.Provider value={{ areas: areas || [] }}>
        <AppContext>
          <NotificationsProvider />
          <BrowserRouter>
            <Layout>
              <Header style={{ paddingInline: 25 }}>
                <HouseIcon style={{ marginRight: 5, fontSize: '26px' }} />
                <div className="app-title">HouseKeeper</div>
                <div className="company-name">© 2020-2024 Бюро Лобановского</div>
              </Header>
              <Layout>
                <Sider />
                <Content>
                  <PageHeader />
                  <Routes>
                    <Route
                      path="/rooms"
                      element={<Rooms />}
                    />
                    <Route path="/buildings" element={<Buildings />}>
                      <Route
                        path=":buildingId"
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
                    <Route
                      path="/buildings"
                      element={<Buildings />}
                    />
                    {/* <Route */}
                    {/*  path="/counters" */}
                    {/*  element={<Counters />} */}
                    {/* /> */}
                    <Route
                      path="/gates"
                      element={<Gates />}
                    />
                    <Route
                      path="/payments-incoming"
                      element={<IncomingPayments />}
                    />
                    <Route
                      path="/payments-outgoing"
                      element={<OutgoingPayments />}
                    />
                    <Route
                      path="/uploaded-files"
                      element={<UploadedFiles />}
                    />
                    <Route
                      path="/expenses"
                      element={<ExpensesView />}
                    />
                    <Route
                      path="/counterparties"
                      element={<Counterparties />}
                    />
                    <Route
                      path="/areas"
                      element={<AreasList />}
                    />
                    <Route
                      path="*"
                      element={(
                        <Navigate
                          replace
                          to="/buildings"
                        />
                      )}
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
