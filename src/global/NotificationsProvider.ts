import { App, ModalFuncProps } from "antd";
import type { MessageInstance } from "antd/es/message/interface";
import type { ModalStaticFunctions } from "antd/es/modal/confirm";
import type { NotificationInstance } from "antd/es/notification/interface";

export type ModalInstanceType =
  { destroy: any; update?: (configUpdate: ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps)) => void; }
  | null;

let message: MessageInstance;
let notificationsProvider: NotificationInstance;
let modal: Omit<ModalStaticFunctions, "warn">;

export default () => {
  const staticFunction = App.useApp();
  message = staticFunction.message;
  modal = staticFunction.modal;
  notificationsProvider = staticFunction.notification;
  return null;
};

export { message, modal, notificationsProvider };
