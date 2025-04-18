/* eslint-disable max-len,react/jsx-props-no-spreading, no-tabs */
import React from 'react';
import Icon from '@ant-design/icons';

function GateSvg() {
  return (
    <svg
      viewBox="0 0 512.001 512.001"
      // stroke="currentColor"
      fill="currentColor"
      width="1em"
      height="1em"
      // strokeLinecap="round"
      // strokeLinejoin="round"
      // strokeWidth="2"
    >
      <g transform="translate(0 -1)">
        <g>
          <g>
            <polygon points="259.534,137.534 208.334,188.734 252.468,188.734 303.668,137.534 			" />
            <polygon points="327.8,137.534 276.6,188.734 320.735,188.734 371.935,137.534 			" />
            <path d="M144.845,137.534c-6.153-8.132-15.027-14.097-25.378-16.205v-10.317c0-13.611-11.068-24.678-24.678-24.678H41.745
				c-13.611,0-24.678,11.068-24.678,24.678v265.566C7.569,377.175,0,385.018,0,394.66v14.814c0,10.027,8.158,18.193,18.193,18.193
				H118.34c10.035,0,18.193-8.166,18.193-18.193V394.66c0-9.643-7.569-17.485-17.067-18.082V204.939
				c10.351-2.108,19.226-8.073,25.378-16.205h39.356l51.2-51.2H144.845z M119.467,409.474c0,0.623-0.512,1.126-1.126,1.126H18.193
				c-0.614,0-1.126-0.503-1.126-1.126V394.66c0-0.623,0.512-1.126,1.126-1.126H118.34c0.614,0,1.126,0.504,1.126,1.126V409.474z
				 M110.933,188.734c-14.114,0-25.6-11.486-25.6-25.6s11.486-25.6,25.6-25.6s25.6,11.486,25.6,25.6
				S125.047,188.734,110.933,188.734z"
            />
            <polygon points="396.067,137.534 344.867,188.734 389.001,188.734 440.201,137.534 			" />
            <path d="M495.625,137.534h-31.292l-51.2,51.2h82.492c9.028,0,16.375-7.347,16.375-16.375v-18.449
				C512.001,144.881,504.654,137.534,495.625,137.534z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

export function GateIcon(props: any) {
  return <Icon component={GateSvg} {...props} />;
}
