import { Alert } from "react-native";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import moment from "moment";
import * as DocumentPicker from "expo-document-picker";
import RNRestart from "react-native-restart";
import { QueryClient } from "react-query";
import { NotificationTypeEnum } from "../types/enums";

export const exportDatabase = async (showToast: Function) => {
	try {
		const db = SQLite.openDatabase("fuel-log.db");

		const dbPath = `${FileSystem.documentDirectory}SQLite/fuel-log.db`;

		const dirInfo = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`);
		if (!dirInfo.exists) {
			await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, { intermediates: true });
		}

		const destinationPath = `${FileSystem.documentDirectory}fuel-log_${moment().format("YYYY-MM-DD_HH-mm")}.db`;

		await FileSystem.copyAsync({
			from: dbPath,
			to: destinationPath
		});

		if (await Sharing.isAvailableAsync()) {
			await Sharing.shareAsync(destinationPath);
		}
	} catch (error) {
		console.error(error);
		showToast("Sikertelen exportálás!", {
			message: error.message,
			notificationOptions: { tag: NotificationTypeEnum.Danger, icon: NotificationTypeEnum.Danger }
		});
	}
};

export const importDatabase = async (showToast: Function, queryClient: QueryClient) => {
	try {
		const result = await DocumentPicker.getDocumentAsync({
			type: "application/octet-stream",
			copyToCacheDirectory: false
		});

		if (result) {
			const destinationPath = `${FileSystem.documentDirectory}SQLite/fuel-log.db`;

			const dirInfo = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`);
			if (!dirInfo.exists) {
				await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, { intermediates: true });
			}

			await FileSystem.copyAsync({
				from: result.assets[0].uri,
				to: destinationPath
			});

			showToast("Sikeres importálás!", { notificationOptions: { tag: NotificationTypeEnum.Success, icon: NotificationTypeEnum.Success } });
			queryClient.invalidateQueries({ queryKey: ["getAllCars"] });
		}
	} catch (error) {
		console.error(error);
		showToast("Sikertelen importálás.", {
			message: error.message,
			notificationOptions: { tag: NotificationTypeEnum.Danger, icon: NotificationTypeEnum.Danger }
		});
	}
};
