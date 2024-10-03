import React from 'react';
import { Tabs } from 'antd';
import GatesLog from 'pages/gates/logs';
import GateTopUsers from 'pages/gates/tops';
import './style.scss';

function Gates() {
  return (
    <div className="gates view">
      <Tabs
        defaultActiveKey="log"
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
  );
}

export default Gates;
