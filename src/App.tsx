// @ts-ignore
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import {Layout} from 'antd';
import {HouseIcon} from 'icons/house';
import PageHeader from 'layout/page-header';
import {Sider} from 'layout/sider';
import Counters from 'pages/counters';
import IncomingPayments from 'pages/payments/incoming';
import OutgoingPayments from 'pages/payments/outgoing';

import './App.scss';
import Rooms from 'pages/rooms';
import Gates from 'pages/gates';
import UploadedFiles from 'pages/admin/uploaded-files';
import {ExpensesView} from "./pages/expences";
import {Counterparties} from "./pages/admin/counterparties";


const {Header, Content} = Layout;


function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Layout>
                    <Header style={{paddingInline: 25}}><HouseIcon style={{marginRight: 5, fontSize: '26px'}}/>HouseKeeper</Header>
                    <Layout>
                        <Sider/>
                        <Content>
                            <PageHeader/>
                            <Routes>
                                <Route
                                    path='/rooms'
                                    element={<Rooms/>}
                                />
                                <Route
                                    path='/counters'
                                    element={<Counters/>}
                                />
                                <Route
                                    path='/gates'
                                    element={<Gates/>}
                                />
                                <Route
                                    path='/payments-incoming'
                                    element={<IncomingPayments/>}
                                />
                                <Route
                                    path='/payments-outgoing'
                                    element={<OutgoingPayments/>}
                                />
                                <Route
                                    path='/uploaded-files'
                                    element={<UploadedFiles/>}
                                />
                                <Route
                                    path='/expenses'
                                    element={<ExpensesView/>}
                                />
                                <Route
                                    path='/counterparties'
                                    element={<Counterparties/>}
                                />

                                {/*<Route*/}
                                {/*	path='*'*/}
                                {/*	element={<Navigate*/}
                                {/*		replace*/}
                                {/*		to='/requests'*/}
                                {/*	/>}*/}
                                {/*/>*/}
                            </Routes>
                        </Content>
                    </Layout>
                </Layout>
            </BrowserRouter>
        </div>
    );
}

export default App;
