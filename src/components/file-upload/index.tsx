import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { UploadFile } from 'antd/lib';
import { RcFile } from 'antd/es/upload';
import axios from 'axios';
import { showError, showMessage } from 'utils/notifications';
import { FileUploadProps } from 'components/file-upload/types';


export const FileUpload = ({ url, errorMsg, successMsg, onSuccessUpload, closeModal }: FileUploadProps) => {
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [uploading, setUploading] = useState(false);

	const uploadFile = () => {
		const formData = new FormData();
		formData.append('file', fileList[0] as RcFile);

		setUploading(true);
		axios.post(url, formData)
			.then(() => {
				setUploading(false);
				showMessage(successMsg);
				closeModal();
				if (onSuccessUpload) {
					onSuccessUpload();
				}
			})
			.catch(e => {
				showError(errorMsg, e);
				setUploading(false);
			})
	};


	return (
		<>
			<Upload
				fileList={fileList}
				beforeUpload={(file) => {
					setFileList([...fileList, file]);
					return false;
				}}
				onRemove={(file) => {
					const index = fileList.indexOf(file);
					const newFileList = fileList.slice();
					newFileList.splice(index, 1);
					setFileList(newFileList);
				}}
			>
				<Button icon={<UploadOutlined />}>Выбрать файл</Button>
			</Upload>
			<Button
				type='primary'
				onClick={uploadFile}
				disabled={fileList.length === 0}
				loading={uploading}
				style={{ marginTop: 16 }}
			>
				{uploading ? 'Загружаем файл' : 'Загрузить файл'}
			</Button>
		</>
	);
}
