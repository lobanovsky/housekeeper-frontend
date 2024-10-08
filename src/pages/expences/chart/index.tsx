import React, { useMemo } from 'react';
import { Statistic } from 'antd';
import { ResponsivePie } from '@nivo/pie';

import { GroupOfPayment } from 'backend/services/backend';
import { summRenderer } from 'utils/renderers';
import { generateNewColor } from 'utils/utils';
import './style.scss';

const formatSum = (sum: number) => summRenderer(Math.ceil(sum), {
  minimumFractionDigits: 0
});

export function ExpensesChart({ data, total }: { data: GroupOfPayment[], total: number }) {
  const chartData = useMemo(() => data.map(({ name, total: totalCount = 0 }: GroupOfPayment) => ({
    value: totalCount,
    id: name,
    label: name,
    color: generateNewColor()
  })), [data.length]);

  return (
    <div className="expenses-chart">
      <div className="header">
        <Statistic
          value={total}
          formatter={(value) => summRenderer(value)}
        />
      </div>

      <div style={{ position: 'relative', height: 300 }}>
        <ResponsivePie
          /* @ts-ignore */
          theme={{ fontSize: 12 }}
          data={chartData}
          margin={{
            top: 30, right: 40, bottom: 30, left: 40
          }}
          innerRadius={0.5}
          padAngle={0.7}
          valueFormat={formatSum}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: 'color',
            modifiers: [
              [
                'darker',
                0.2
              ]
            ]
          }}
          // arcLinkLabel={}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="black"
          arcLinkLabelsThickness={3}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: 'color',
            modifiers: [
              [
                'darker',
                3
              ]
            ]
          }}
        />
      </div>
    </div>

  );
}
