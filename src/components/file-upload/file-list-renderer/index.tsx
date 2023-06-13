import React from 'react';
import { CheckOutlined, CloseOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import Button from 'antd/lib/button';
import { RcFile } from 'antd/es/upload';
import { UploadFile } from 'antd/lib';

const BYTE_IN_MEGABYTE = 1000;
const UNITS = ['КБ', 'МБ', 'ГБ', 'ТБ'];

export const fileSizeRenderer = (fileSizeBytes: number) => {
	let sizeInBytes = String(fileSizeBytes);
	if (Math.abs(fileSizeBytes) < BYTE_IN_MEGABYTE) {
		return `${fileSizeBytes} B`;
	}

	let u = -1;
	const r = 10 ** 1;

	do {
		// @ts-ignore
		sizeInBytes /= BYTE_IN_MEGABYTE;
		++u;
		// @ts-ignore
	} while (Math.round(Math.abs(sizeInBytes) * r) / r >= BYTE_IN_MEGABYTE && u < UNITS.length - 1);
// @ts-ignore
	return `${sizeInBytes.toFixed(1)} ${UNITS[u]}`;
};

export const FileItem = ({ file, index, onRemoveFile }: {
	file: UploadFile,
	index: number,
	onRemoveFile: (file: RcFile) => void
}) => (
	<div
		className={`upload-item ${file.status || ''}`}
		key={file.uid}
	>
		<div className='index-and-status'>
			<div className='index'>{index + 1}.</div>
			<div className='status-icon'>
				{file.status === 'success' && <CheckOutlined />}
				{file.status === 'error' && <CloseOutlined />}
			</div>
		</div>

		<div className='file-info'>
			<div className='file-name'>
				{file.name} ({fileSizeRenderer(file.size || 0)})
			</div>
			{file.status === 'uploading' ? (
				<LoadingOutlined />
			) : (
				<Button
					className='icon-button'
					onClick={() => {
						onRemoveFile(file as RcFile);
					}}
				>
					<DeleteOutlined />
				</Button>
			)}
		</div>
		{!!file.error && <div className='file-error'>{file.error}</div>}
	</div>
);
