/**
 * Лоадинг-маска на весь экран. Блокирует любые действия пользователя до окончания процесса
 * @param        size     Размер лоадинг-спиннера
 * @param        text     Текст для отображения возле спиннера
 *
 * @returns      {JSX.Element}
 * @constructor
 */

import React from 'react';
import Spin, { SpinProps } from 'antd/lib/spin';
import './styles.scss';

interface ILoadingProps extends SpinProps {
  text?: string;
}

function Loading({ size, text }: ILoadingProps): JSX.Element {
  return (
    <div
      role="button"
      onKeyDown={() => {
      }}
      className="loadingMask"
      onClick={(ev) => {
        ev.preventDefault();
      }}
    >
      <Spin
        className="spin"
        {...{ size }}
        tip={text || ''}
      />
    </div>
  );
}

export default Loading;
