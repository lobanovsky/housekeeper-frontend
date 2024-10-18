/* eslint-disable max-len,react/jsx-props-no-spreading, no-tabs */
import React from 'react';
import Icon from '@ant-design/icons';

function BuildingSvg() {
  return (
    <svg
      enableBackground="new 0 0 64 64"
      viewBox="0 0 64 64"
      // stroke="currentColor"
      // fill='#42c3cf'
      fill="currentColor"
      width="1em"
      height="1em"
      // strokeLinecap="round"
      // strokeLinejoin="round"
      // strokeWidth="2"
    >
      <path
        fill="currentColor"
        d="M62.79,29.172l-28-28C34.009,0.391,32.985,0,31.962,0s-2.047,0.391-2.828,1.172l-28,28
	c-1.562,1.566-1.484,4.016,0.078,5.578c1.566,1.57,3.855,1.801,5.422,0.234L8,33.617V60c0,2.211,1.789,4,4,4h16V48h8v16h16
	c2.211,0,4-1.789,4-4V33.695l1.195,1.195c1.562,1.562,3.949,1.422,5.516-0.141C64.274,33.188,64.356,30.734,62.79,29.172z"
      />
      {/* <g id="office"> */}
      {/*   <path d="M12.5,13h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,12.5,13Z" /> */}
      {/*   <path d="M12.5,9h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,12.5,9Z" /> */}
      {/*   <path d="M12.5,5h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,12.5,5Z" /> */}
      {/*   <path d="M8.5,13h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,8.5,13Z" /> */}
      {/*   <path d="M8.5,9h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,8.5,9Z" /> */}
      {/*   <path d="M8.5,5h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,8.5,5Z" /> */}
      {/*   <path d="M16.5,13h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,16.5,13Z" /> */}
      {/*   <path d="M16.5,9h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,16.5,9Z" /> */}
      {/*   <path d="M16.5,5h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,16.5,5Z" /> */}
      {/*   <path */}
      {/*     d="M22,21H21V2a1,1,0,0,0-1-1H4A1,1,0,0,0,3,2V21H2a1,1,0,0,0,0,2H22A1,1,0,0,0,22,21ZM10,21V19h4v2Zm6,0V18a1,1,0,0,0-1-1H9a1,1,0,0,0-1,1v3H5V3H19V21Z" */}
      {/*   /> */}
      {/* </g> */}
    </svg>
  );
}

export function BuildingIcon(props: any) {
  return <Icon component={BuildingSvg} {...props} />;
}
