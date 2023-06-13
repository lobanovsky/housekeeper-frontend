import { Modal, ModalProps } from 'antd';
import { FileUploadProps } from 'components/file-upload/types';
import { FileUpload } from 'components/file-upload/index';

interface FileUploadModalProps extends Omit<FileUploadProps, 'closeModal'>, ModalProps {
}

export const showFileUploadModal = ({ title, width = 600, className = '', ...uploadProps }: FileUploadModalProps) => {
	let modal: any = null;

	const closeModal = () => {
		modal?.destroy();
	}


	modal = Modal.info({
		width,
		closable: true,
		className: `modal-no-btns ${className}`,
		title,
		content: <FileUpload {...uploadProps} closeModal={closeModal} />
	});
}
