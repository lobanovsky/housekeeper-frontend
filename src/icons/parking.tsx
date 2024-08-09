import Icon from '@ant-design/icons';
import {Property} from 'csstype';

const blackStroke = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as Property.StrokeLinecap,
    strokeLinejoin: 'round' as Property.StrokeLinejoin,
    strokeMiterlimit: 10
}


// .st0{fill:#1E232D;}
// </style>

// @ts-ignore
const ParkingSvg = () => <svg id="Layer_1" style={{enableBackground: 'new 0 0 24 24'}} width='1em' height='1em'
                              viewBox="0 0 24 24">
    <path className="st0" style={{fill: 'currentColor'}}
          d="M24,3c0-1.7-1.3-3-3-3H3C1.3,0,0,1.3,0,3v18c0,1.7,1.3,3,3,3h18c1.7,0,3-1.3,3-3V3z M22,21c0,0.6-0.4,1-1,1H3  c-0.6,0-1-0.4-1-1V3c0-0.6,0.4-1,1-1h18c0.6,0,1,0.4,1,1V21z M14.5,5H6v14h2v-5h6.5C17,14,19,12,19,9.5S17,5,14.5,5z M14.5,12H8V7  h6.5C15.9,7,17,8.1,17,9.5S15.9,12,14.5,12z"/>

</svg>

export const ParkingIcon = (props: any) =>
    <Icon component={ParkingSvg} {...props} />
;


