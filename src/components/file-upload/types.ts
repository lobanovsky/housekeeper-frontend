import { ActionCallback } from 'utils/types';

export interface FileUploadProps {
  closeModal: () => void;
  errorMsg: string;
  onSuccessUpload?: ActionCallback;
  successMsg: string;
  url: string;
}
