import { notification } from "antd";
import { ServerError } from "utils/types";
import { ReactNode } from "react";
import { ArgsProps } from "antd/es/notification/interface";

// @ts-ignore
export const showMessage = (text: string | ReactNode, props?: ArgsProps = {}) => {
	notification.success({
		// @ts-ignore
		message: '',
		description: text,
		...props
	});
}

export const showError = (text: string, serverError?: ServerError ) => {
	// ошибки с 401 статусом не показываем - за это отвечает интерсептор
	let errorMessage = '';
	const { response: serverResponse = {}, error, message } = serverError || {};

	// @ts-ignore
	if (serverResponse && serverResponse.status === 401) {
		return;
	}

	// @ts-ignore
	if (serverResponse.data) {
		// @ts-ignore
		errorMessage = serverResponse.data?.message || serverResponse.data?.error;
	} else if (error || message) {
		// @ts-ignore
		errorMessage = message || error;
	}

	let messageText = text;
	if (errorMessage) {
		// @ts-ignore
		messageText = <span>{messageText}.<br /><br />{errorMessage}</span>
	}

	notification.error({
		message: '',
		description: messageText
	});
}
