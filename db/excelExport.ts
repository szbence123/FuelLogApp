import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { getFuelInfoForExport } from "./fuelinfo";
import { encode } from "base64-arraybuffer";
import moment from "moment";

export const excelExport = async () => {
	try {
		const data = await getFuelInfoForExport();
		await generateExcel(data);
	} catch (error) {
		console.error("Error exporting data:", error);
	}
};

const generateExcel = async (data) => {
	const ws = XLSX.utils.json_to_sheet(data);

	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, "Tankolások");

	const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });

	const buffer = new ArrayBuffer(wbout.length);
	const view = new Uint8Array(buffer);
	for (let i = 0; i < wbout.length; i++) {
		view[i] = wbout.charCodeAt(i) & 0xff;
	}

	const base64 = encode(buffer);

	const path = `${FileSystem.documentDirectory}fuel-log-export_${moment().format("YYYY-MM-DD_HH-mm")}.xlsx`;

	await FileSystem.writeAsStringAsync(path, base64, { encoding: FileSystem.EncodingType.Base64 });

	await Sharing.shareAsync(path);
};
