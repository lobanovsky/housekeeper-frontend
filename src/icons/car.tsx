import Icon from '@ant-design/icons';
import { Property } from 'csstype';

const blackStroke = {
	fill: 'none',
	stroke: 'currentColor',
	strokeWidth: 2,
	strokeLinecap: 'round' as Property.StrokeLinecap,
	strokeLinejoin: 'round' as Property.StrokeLinejoin,
	strokeMiterlimit: 10
}

const CarSvg = () => <svg
	enableBackground='new 0 0 32 32'
	viewBox='0 0 32 32'
	// stroke="currentColor"
	// fill='currentColor'
	width='1em'
	height='1em'
	// strokeLinecap="round"
	// strokeLinejoin="round"
	// strokeWidth="2"
>
	<circle
		style={blackStroke}
		cx='7'
		cy='23'
		r='3'
	/>
	<circle
		style={blackStroke}
		cx='23'
		cy='23'
		r='3'
	/>
	<line
		style={blackStroke}
		x1='28'
		x2='30'
		y1='19'
		y2='19'
	/>
	<line
		style={blackStroke}
		x1='4'
		x2='24'
		y1='16'
		y2='16'
	/>
	<line
		style={blackStroke}
		x1='13'
		x2='10'
		y1='10'
		y2='16'
	/>
	<path
		style={blackStroke}
		d='M26,23h4c0.6,0,1-0.4,1-1v-2c0-2.2-1.8-4-4-4h-3l-3.8-4.6c-0.8-0.9-1.9-1.4-3.1-1.4H9.5c-1.5,0-2.9,0.9-3.6,2.2  L4,16H3c-1.1,0-2,0.9-2,2v4c0,0.6,0.4,1,1,1h2'
	/>
	<line
		style={blackStroke}
		x1='10'
		x2='20'
		y1='23'
		y2='23'
	/>
</svg>

export const CarIcon = (props: any) => <Icon component={CarSvg} {...props} />;


