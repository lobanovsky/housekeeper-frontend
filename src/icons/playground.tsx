/* eslint-disable max-len,react/jsx-props-no-spreading */
import React from 'react';
import Icon from '@ant-design/icons';

function PlaygroundSvg() {
  return (
    <svg
      // enableBackground="new 0 0 64 64"
      viewBox="0 0 256 256"
      // stroke="currentColor"
      fill="currentColor"
      width="1em"
      height="1em"
      // strokeLinecap="round"
      // strokeLinejoin="round"
      // strokeWidth="2"
    >
      <rect fill="none" height="256" width="256" />
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        x1="128"
        x2="128"
        y1="232"
        y2="88"
      />
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        x1="128"
        x2="80"
        y1="152"
        y2="128"
      />
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        x1="128"
        x2="176"
        y1="128"
        y2="104"
      />
      <path
        d="M132.5,181.2A64,64,0,1,0,194.7,69.9a8.6,8.6,0,0,1-4-4.2,68,68,0,0,0-125.4,0,8.6,8.6,0,0,1-4,4.2,64,64,0,1,0,62.2,111.3A8.2,8.2,0,0,1,132.5,181.2Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );
}

export function PlaygroundIcon(props: any) {
  return <Icon className="icon-playground" component={PlaygroundSvg} {...props} />;
}
