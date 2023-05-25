import Icon from '@ant-design/icons';
import { Property } from 'csstype';

const blackStroke = {
	// fill: 'none',
	stroke: 'currentColor',
	strokeWidth: 0,
	strokeLinecap: 'round' as Property.StrokeLinecap,
	strokeLinejoin: 'round' as Property.StrokeLinejoin,
	strokeMiterlimit: 5
}

const FlatSvg = () => <svg
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
	<g id='home'>
		<path
			style={blackStroke}
			d='M29.71,15.29l-3-3h0l-10-10a1,1,0,0,0-1.42,0l-10,10h0l-3,3a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L5,15.41V29a1,1,0,0,0,1,1H26a1,1,0,0,0,1-1V15.41l1.29,1.3a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,15.29ZM25,28H7V13.41l9-9,9,9Z'
		/>
	</g>
</svg>

export const FlatIcon = (props: any) => <Icon component={FlatSvg} {...props} />;


