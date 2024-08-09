import Icon from '@ant-design/icons';
import {CSSProperties} from "react";

const st0: CSSProperties = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeMiterlimit: 10
};

const ApartmentPlanSvg = () => <svg
    viewBox='0 0 32 32'
    fill='currentColor'
    width='1em'
    height='1em'
>
    <g id="plan">
        <rect x="3" y="3" style={st0} width="26" height="26"/>
        <rect x="18" y="20" style={st0} width="11" height="9"/>
        <polyline style={st0} points="14,3 29,3 29,15 20,15 "/>
        <line style={st0} x1="14" y1="15" x2="14" y2="3"/>
        <rect x="18" y="23" style={st0} width="11" height="6"/>
        <rect x="18" y="26" style={st0} width="11" height="3"/>
        <polyline style={st0} points="11,29 11,20 7,20 "/>
        <polyline style={st0} points="14,15 3,15 3,3 14,3 "/>
    </g>
</svg>

export const ApartmentPlanIcon = (props: any) => <Icon component={ApartmentPlanSvg} {...props} />;


