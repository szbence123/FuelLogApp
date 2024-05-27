import { useToastController } from "@tamagui/toast";
import { SQLiteDatabase } from "expo-sqlite";
import { ReactNode } from "react";
import { NotificationTypeEnum } from "../types/enums";
/*
export const executeQuery1 = <T>(db: SQLiteDatabase, query: string, params: any[] = [], showToast?: Function): Promise<T> => {
	
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				query,
				params,
				(_, result) => {
					const data: T = result.rows._array as unknown as T;
					console.info(`SQL Query -> { ${query}}`, data);
					if (showToast) {
						showToast("Sikeres művelet!", { notificationOptions: { tag: NotificationTypeEnum.Success, icon: NotificationTypeEnum.Success } });
					}
					resolve(data);
				},
				(error, errorObject) => {
					console.error(`SQL Error -> { ${query}}`, errorObject);
					if (showToast) {
						showToast("Sikertelen művelet!", { notificationOptions: { tag: NotificationTypeEnum.Danger, icon: NotificationTypeEnum.Danger } });
					}
					reject(errorObject);
					return false;
				}
			);
		});
	});
};
*/
