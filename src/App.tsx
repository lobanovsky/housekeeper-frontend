// @ts-ignore
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { UserOutlined, DashboardOutlined, DollarOutlined } from '@ant-design/icons';
import './App.scss';
import Contacts from 'pages/contacts';
import Counters from 'pages/counters';
import Payments from 'pages/payments';
import { Sider } from 'layout/sider';

const { Header, Content } = Layout;


function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Layout>
					<Header>HouseKeeper</Header>
					<Layout>
						<Sider />
						<Content>
							<Routes>
								<Route
									path='/contacts'
									element={<Contacts />}
								/>
								<Route
									path='/counters'
									element={<Counters />}
								/>
								<Route
									path='/payments'
									element={<Payments />}
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
