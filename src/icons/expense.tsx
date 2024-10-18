/* eslint-disable max-len,react/jsx-props-no-spreading */
import React from 'react';
import Icon from '@ant-design/icons';

function ExpenseSvg() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width="1em"
      height="1em"
    >
      <path
        d="M7 12H9H10M17 9H14V12H15.5C16.3284 12 17 12.6716 17 13.5V13.5C17 14.3284 16.3284 15 15.5 15H14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <circle
        r="10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        transform="matrix(-1 0 0 1 12 12)"
      />
    </svg>
  );
}

export function ExpenseIcon(props: any) {
  return <Icon component={ExpenseSvg} {...props} />;
}
