import { NotificationTypeEnum } from "../types/enums";

const responseMessages = {
	success: "Sikeres művelet!",
	reject: "Sikertelen művelet!"
};

const showSuccessMessage = (showMessage: Function) => {
	showMessage("Sikeres művelet!", { notificationOptions: { tag: NotificationTypeEnum.Success, icon: NotificationTypeEnum.Success } });
};

const showErrorMessage = (showMessage: Function, error: Error) => {
	showMessage("Sikertelen művelet!", {
		message: error.message,
		notificationOptions: { tag: NotificationTypeEnum.Danger, icon: NotificationTypeEnum.Danger }
	});
};

export { responseMessages, showErrorMessage, showSuccessMessage };
