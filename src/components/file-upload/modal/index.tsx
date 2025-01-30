// @ts-nocheck
import React from 'react';
import { Modal } from 'antd';
import { FileUpload } from '../index';

export const showFileUploadModal = ({
                                      title,
                                      width = 800,
                                      className = '',
                                      ...uploadProps
                                    }: any) => {
  let modal: any = null;

  const closeModal = () => {
    modal?.destroy();
  };

  modal = Modal.info({
    width: width || 800,
    closable: true,
    className: `modal-no-btns ${className}`,
    title,
    content: <FileUpload {...uploadProps} closeModal={closeModal} />
  });
};
