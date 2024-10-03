import React from 'react';
import { ModalProps } from 'antd';
import { modal, ModalInstanceType } from '../global/NotificationsProvider';
import { EmptyFunction } from './types';

export interface InfoModalProps extends ModalProps {
  getContent: (props: { closeModal: EmptyFunction }) => React.ReactNode;
}

export const showModal = ({ className = '', getContent, ...modalProps }: InfoModalProps) => {
  let modalCmp: ModalInstanceType = null;

  const closeModal = () => {
    modalCmp?.destroy();
  };

  modalCmp = modal.info({
    width: 800,
    className: `app-static-modal ${className}`,
    ...modalProps,
    content: (
      <div className="info-modal-content" style={{ position: 'relative' }}>
        {getContent({ closeModal })}
      </div>
    )
  });
};
