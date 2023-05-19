import Icon from '@ant-design/icons';

const HouseSvg = () => <svg
	// enableBackground='new 0 0 64 64'
	viewBox='0 0 48 48'
	// stroke="currentColor"
	fill='#42c3cf'
	width='1em'
	height='1em'
	// strokeLinecap="round"
	// strokeLinejoin="round"
	// strokeWidth="2"
>
	<path
		className="cls-1"
		d="M44.62,20.22l-18.75-15a3,3,0,0,0-3.74,0l-18.75,15a1,1,0,1,0,1.24,1.56L8,19.08V41a3,3,0,0,0,3,3h7a1,1,0,0,0,1-1V25a3,3,0,0,1,3-3h4a3,3,0,0,1,3,3V43a1,1,0,0,0,1,1h7a3,3,0,0,0,3-3V19.08l3.38,2.7A1,1,0,0,0,44,22a1,1,0,0,0,.78-.38A1,1,0,0,0,44.62,20.22Z"
	/>
	<path
		className="cls-1"
		d="M38.38,13.7A1,1,0,0,0,40,12.92V8a1,1,0,0,0-1-1H32.85a1,1,0,0,0-.62,1.78Z"
	/>
</svg>

export const HouseIcon = (props: any) => <Icon component={HouseSvg} {...props} />;


