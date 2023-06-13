import { showFileUploadModal } from 'components/file-upload/modal';

export const showGatesImportModal = () => {
	showFileUploadModal({
		title: 'Загрузка файла въездов/выездов (шлагбаумы)',
		url: '/files/eldes-gate/importer',
		successMsg: 'Файл с шлагбаумами загружен',
		errorMsg: 'Не удалось загрузить файл с шлагбаумами'
	})
}
