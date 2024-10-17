import React from 'react';
import { Result } from 'antd';

function AccessDeniedPage() {
  return (
    <Result
      status="403"
      title="Нет доступа"
      subTitle="У вас нет прав для просмотра этой страницы."
    />
  );
}

export default AccessDeniedPage;
