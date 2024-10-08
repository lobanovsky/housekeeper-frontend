/* eslint-disable max-len,react/jsx-props-no-spreading */
import React from 'react';
import Icon from '@ant-design/icons';

function CarFrontSvg() {
  return (
    <svg
      viewBox="0 0 32 32"
      // stroke="currentColor"
      fill="currentColor"
      width="1em"
      height="1em"
    >
      <path
        d="M29.3379,15.9336l-7.7324-2.7783L18.374,9.0967A2.99,2.99,0,0,0,16.0537,8H8.0576a2.9982,2.9982,0,0,0-2.48,1.3115L2.8662,13.2949A4.9884,4.9884,0,0,0,2,16.1074V24a1,1,0,0,0,1,1H5.1421a3.9806,3.9806,0,0,0,7.7158,0h6.2842a3.9806,3.9806,0,0,0,7.7158,0H29a1,1,0,0,0,1-1V16.875A1,1,0,0,0,29.3379,15.9336ZM9,26a2,2,0,1,1,2-2A2.0027,2.0027,0,0,1,9,26Zm14,0a2,2,0,1,1,2-2A2.0025,2.0025,0,0,1,23,26Zm5-3H26.8579a3.9806,3.9806,0,0,0-7.7158,0H12.8579a3.9806,3.9806,0,0,0-7.7158,0H4V16.1074A2.9977,2.9977,0,0,1,4.52,14.4189l2.711-3.9814A.9992.9992,0,0,1,8.0576,10h7.9961a.9928.9928,0,0,1,.7647.3545l3.3994,4.2685a1.0007,1.0007,0,0,0,.4443.3184L28,17.5781Z"
      />
      <rect
        style={{ fill: 'none' }}
        data-name="&lt;Transparent Rectangle&gt;"
        height="1em"
        id="_Transparent_Rectangle_"
        width="1em"
      />
    </svg>
  );
}

export function CarFrontIcon(props: any) {
  return <Icon {...props} component={CarFrontSvg} />;
}
