import { ActionFinishCallback } from 'utils/types';

export interface FileUploadProps {
  closeModal: () => void;
  errorMsg: string;
  onFinish?: ActionFinishCallback;
  successMsg: string;
  url: string;
  canEdit?: boolean,
}
