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

const ExpenseSvg = () => <svg enableBackground="new 0 0 32 32" id="Stock_cut" version="1.1" viewBox="0 0 32 32"
                              width='1em' height='1em'>
    <g>
        <path d="M23,12V3   c0-1.105-0.895-2-2-2H3C1.895,1,1,1.895,1,3v22c0,1.105,0.895,2,2,2h9" fill="none"
              stroke="currentColor" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
        <path d="M7,10H1v8h6   c2.209,0,4-1.791,4-4v0C11,11.791,9.209,10,7,10z" fill="none" stroke="currentColor"
              strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
        <circle cx="7" cy="14" r="1"/>
        <circle cx="23" cy="23" fill="none" r="8" stroke="currentColor" strokeLinejoin="round" strokeMiterlimit="10"
                strokeWidth="2"/>
        <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" x1="18"
              x2="28" y1="23" y2="23"/>
    </g>
</svg>

export const ExpenseIcon = (props: any) => <Icon component={ExpenseSvg} {...props} />;


