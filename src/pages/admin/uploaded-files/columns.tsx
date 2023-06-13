import { ColumnsType } from 'antd/es/table';
import { FileService, FileType, FileVO } from 'backend/services/backend';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { ActionCallback, EmptyFunction } from 'utils/types';
import { dateTimeRenderer } from 'utils/utils';
import { useLoading } from 'hooks/use-loading';
import { showError } from 'utils/notifications';

const DeleteFileButton = ({ fileId, fileName, onSuccess }: {
	fileId: number,
	fileName: string,
	onSuccess: EmptyFunction
}) => {
	const [loading, showLoading, hideLoading] = useLoading();
	return (
		<Popconfirm
			title='Удалить файл и его содержимое?'
			onConfirm={() => {
				showLoading();
				FileService.remove({ fileIds: [fileId] })
					.then(() => {
						hideLoading();
						onSuccess();
					})
					.catch(e => {
						showError(`Не удалось удалить файл ${fileName}`, e);
						hideLoading();
					})
			}}
		>
			<Button>
				{loading ? <LoadingOutlined /> : <DeleteOutlined />}
			</Button></Popconfirm>
	)
}

export const getFileColumns = ({ reloadTable }: { reloadTable: ActionCallback }): ColumnsType<FileVO> => [
	{
		dataIndex: 'createDate',
		title: 'Дата загрузки',
		render: dateTimeRenderer
	},
	{
		dataIndex: 'name',
		title: 'Имя файла'
	},
	{
		dataIndex: 'type',
		title: 'Тип',
		render: (type: FileType) => type?.description || ''
	},
	{
		dataIndex: 'checksum',
		title: 'Хеш',
	},
	{
		dataIndex: 'actions',
		title: '',
		render: (value: string, { id = 0, name = '' }: FileVO) => <DeleteFileButton
			fileId={id}
			fileName={name}
			onSuccess={reloadTable}
		/>
	}

].map(column => ({
	...column,
	className: column.dataIndex
}));
