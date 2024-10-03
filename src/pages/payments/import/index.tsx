import { showFileUploadModal } from 'components/file-upload/modal';

export const showPaymentsImportModal = () => {
  showFileUploadModal({
    title: 'Загрузка файла платежей',
    url: '/files/payments/importer',
    successMsg: 'Файл с платежами загружен',
    errorMsg: 'Не удалось загрузить файл с платежами'
  });
};
