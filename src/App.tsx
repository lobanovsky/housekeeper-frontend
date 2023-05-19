// @ts-ignore
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { HouseIcon } from 'icons/house';
import { Sider } from 'layout/sider';
import Contacts from 'pages/contacts';
import Counters from 'pages/counters';
import Payments from 'pages/payments';
import './App.scss';

const { Header, Content } = Layout;


function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Layout>
					<Header style={{ paddingInline: 24 }}><HouseIcon style={{ marginRight: 5, fontSize: '26px' }} />HouseKeeper</Header>
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
