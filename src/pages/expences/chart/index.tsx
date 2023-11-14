import {useMemo} from "react";
import {GroupOfPayment} from "../../../backend/services/backend";
import {generateNewColor, summRenderer} from "../../../utils/utils";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {ResponsivePie} from '@nivo/pie'
import {Statistic} from "antd";
import './style.scss';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const formatSum = (sum: number) => summRenderer(Math.ceil(sum), {
    minimumFractionDigits: 0
});


export const ExpensesChart = ({data, total}: { data: GroupOfPayment[], total: number }) => {
    const chartData = useMemo(() => data.map(({counterparty, total = 0}: GroupOfPayment) => ({
        value: total,
        id: counterparty?.name,
        label: counterparty?.name,
        color: generateNewColor()
    })), [data.length]);

    return (
        <div className='expenses-chart'>
            <div className='header'>
                <span className='label'>Потрачено: &nbsp;</span>
                <Statistic value={total} formatter={(value) => summRenderer(value)}/>
                {/*<span className='sum'>{summRenderer(total)}</span>*/}
            </div>

            <div style={{position: 'relative', height: 300}}>
                <ResponsivePie
                    /*@ts-ignore*/
                    theme={{fontSize: 12}}
                    data={chartData}
                    margin={{top: 30, right: 40, bottom: 30, left: 40}}
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
                    arcLinkLabelsColor={{from: 'color'}}
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

    )
}
