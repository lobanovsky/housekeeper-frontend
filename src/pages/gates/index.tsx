import { Tabs } from 'antd';
import GatesLog from 'pages/gates/logs';
import { useCallback, useState } from 'react';
import GateTopUsers from 'pages/gates/tops';
import './style.scss';

const Gates = () => {
	const [gateId, setGateId] = useState<number | null>(null);

	const uploadFile = useCallback(() => {

	}, []);
	return (
		<div className='gates view'>
			<div
				className='toolbar'
				// style={{ display: 'flex' }}
			>
				{/*<RemoteSelect*/}
				{/*	size='large'*/}
				{/*	className='gate-selector'*/}
				{/*	optionsURL='/gates'*/}
				{/*	placeholder='Выберите шлагбаум'*/}
				{/*	popupMatchSelectWidth={false}*/}
				{/*	value={gateId}*/}
				{/*	onChange={setGateId}*/}
				{/*/>*/}
				{/*<div className='upload-container'>*/}
				{/*	<Upload action={`${process.env.REACT_APP_BACKEND_URL}/files/eldes-gate/importer`}>*/}
				{/*		<Button><UploadOutlined /> Загрузить файл</Button>*/}
				{/*	</Upload>*/}
				{/*</div>*/}
			</div>
			<div>
				<Tabs
					defaultActiveKey='log'
					items={[
						{
							key: 'log',
							label: 'История въездов',
							children: <GatesLog />
						},
						{
							key: 'top',
							label: 'Рейтинг',
							children: <GateTopUsers />
						}
					]}
				/>

			</div>
		</div>
	)
}

export default Gates;
