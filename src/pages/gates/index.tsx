import { Tabs } from 'antd';
import GatesLog from 'pages/gates/logs';
import { useState } from 'react';
import RemoteSelect from 'components/remote-select';
import GateTopUsers from 'pages/gates/tops';

const Gates = () => {
	const [gateId, setGateId] = useState<number | null>(null);

	return (
		<div className='gates view'>
			<RemoteSelect
				size='large'
				className='gate-selector'
				optionsURL='/gates'
				placeholder='Выберите шлагбаум'
				popupMatchSelectWidth={false}
				value={gateId}
				onChange={setGateId}
			/>
			{!!gateId && (
				<Tabs
					defaultActiveKey='log'
					items={[
						{
							key: 'log',
							label: 'История въездов',
							children: <GatesLog gateId={gateId} />
						},
						{
							key: 'top',
							label: 'Рейтинг',
							children: <GateTopUsers gateId={gateId} />
						}
					]}
				/>
			)}

		</div>
	)
}

export default Gates;
