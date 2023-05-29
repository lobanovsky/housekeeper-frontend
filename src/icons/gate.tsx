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


const GateSvg = () => <svg
	enableBackground='new 0 0 32 32'
	viewBox='0 0 32 32'
	// stroke="currentColor"
	fill='currentColor'
	width='1em'
	height='1em'
	// strokeLinecap="round"
	// strokeLinejoin="round"
	// strokeWidth="2"
>
	<g
		data-name='Layer 2'
		id='Layer_2'
	>
		<path d='M28.5,1A2.5,2.5,0,0,0,26,3.5V6H6V3.5a2.5,2.5,0,0,0-5,0v25a2.5,2.5,0,0,0,5,0V24H26v4.5a2.5,2.5,0,0,0,5,0V3.5A2.5,2.5,0,0,0,28.5,1ZM26,17H23V8h3Zm-9,0V8h4v9Zm-6,0V8h4v9ZM9,8v9H6V8ZM4,28.5a.5.5,0,0,1-1,0V3.5a.5.5,0,0,1,1,0v25ZM6,22V19H26v3Zm23,6.5a.5.5,0,0,1-1,0V3.5a.5.5,0,0,1,1,0Z' />
	</g>
</svg>

export const GateIcon = (props: any) => <Icon component={GateSvg} {...props} />;


