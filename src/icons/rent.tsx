/* eslint-disable max-len,react/jsx-props-no-spreading */
import React from 'react';
import Icon from '@ant-design/icons';

function RentSvg() {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path
        d="m14.492,7.116c-.405-.97-1.368-1.597-2.453-1.597s-2.048.627-2.469,1.637l-3.22,8.768c-.19.519.075,1.093.594,1.283.517.19,1.093-.075,1.283-.594l.861-2.345h5.901l.861,2.345c.148.405.531.656.938.656.115,0,.231-.02.345-.062.519-.19.784-.765.594-1.283l-3.235-8.809Zm-4.67,5.153l1.609-4.383c.142-.341.501-.367.607-.367s.465.026.592.327l1.624,4.423h-4.433ZM12.039.019C5.422.019.039,5.402.039,12.019s5.383,12,12,12,12-5.383,12-12S18.655.019,12.039.019Zm0,22c-5.514,0-10-4.486-10-10S6.524,2.019,12.039,2.019s10,4.486,10,10-4.486,10-10,10Z"
      />
    </svg>
  );
}

export function RentIcon(props: any) {
  return <Icon component={RentSvg} {...props} />;
}
