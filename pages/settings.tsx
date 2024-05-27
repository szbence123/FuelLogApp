import {
	AlertTriangle,
	ArrowUpFromLine,
	BookOpenText,
	ChevronLeft,
	ChevronRight,
	Cloud,
	Download,
	DownloadCloud,
	Eraser,
	Import,
	Moon,
	Sheet,
	Star,
	Sun,
	UploadCloud
} from "@tamagui/lucide-icons";
import React, { useState } from "react";
import { Button, ListItem, ScrollView, Separator, Text, View, XStack, YGroup, YStack } from "tamagui";
import { deleteDatabase, exportDatabase, importDatabase } from "../db/localBackup";
import { useToastController } from "@tamagui/toast";
import { useQueryClient } from "react-query";
import { styles } from "../styles/global";
import { NotificationTypeEnum } from "../types/enums";
import { restartApp } from "../App";
import { excelExport } from "../db/excelExport";

export default function SettingsPage() {
	const toast = useToastController();
	const queryClient = useQueryClient();

	const [isDangerShown, setDangerShown] = useState(false);

	return (
		<ScrollView>
			<YGroup alignSelf="center" padded bordered size="$5" separator={<Separator />}>
				<YGroup.Item>
					<ListItem
						onPress={() => importDatabase(toast.show, queryClient)}
						hoverTheme
						pressTheme
						title="Import"
						subTitle="Adatbázis importálása"
						icon={Import}
						iconAfter={ChevronRight}
					/>
				</YGroup.Item>
				<YGroup.Item>
					<ListItem
						onPress={() => exportDatabase(toast.show)}
						hoverTheme
						pressTheme
						title="Export"
						subTitle="Adatbázis exportálása"
						icon={ArrowUpFromLine}
						iconAfter={ChevronRight}
					/>
				</YGroup.Item>
				<YGroup.Item>
					<ListItem
						onPress={excelExport}
						hoverTheme
						pressTheme
						title="Excel export"
						subTitle="Adatbázis exportálása Excel fájlba"
						icon={Sheet}
						iconAfter={ChevronRight}
					/>
				</YGroup.Item>
			</YGroup>

			<YGroup alignSelf="center" padded bordered size="$5" separator={<Separator />}>
				<YGroup.Item>
					<ListItem
						color={styles.notifications.danger}
						onPress={() => {
							toast.show("Törléshez nyomd hosszan.", { notificationOptions: { icon: NotificationTypeEnum.Info } });
							if (isDangerShown) {
								setDangerShown(false);
							}
						}}
						onLongPress={() => setDangerShown(true)}
						hoverTheme
						pressTheme
						title="Adatbázis törlése"
						subTitle="Adatbázis végleges törlése"
						icon={Eraser}
						iconAfter={ChevronLeft}
					/>
					{isDangerShown ? (
						<ListItem
							color={styles.notifications.danger}
							backgroundColor={styles.dangerZone.background}
							onPress={() => toast.show("Törléshez nyomd hosszan.", { notificationOptions: { icon: NotificationTypeEnum.Info } })}
							onLongPress={() => deleteDatabase(toast.show, queryClient)}
							hoverTheme
							pressTheme
							title="Végleges törlés"
							subTitle="Törléshez hosszan lenyomni"
							icon={AlertTriangle}
						/>
					) : (
						<></>
					)}
				</YGroup.Item>
			</YGroup>

			<YGroup alignSelf="center" padded bordered size="$5" separator={<Separator />}>
				<YGroup.Item>
					<ListItem
						hoverTheme
						pressTheme
						title="Névjegy"
						subTitle={
							<YStack gap={5}>
								<Text fontSize={12}>Fejlesztette: Szalai Bence Zoltán</Text>
								<Text fontSize={12}>Fejlesztés éve: 2024</Text>
								<Text fontSize={12}>Verzió: 1.0.0</Text>
							</YStack>
						}
						icon={BookOpenText}
					/>
				</YGroup.Item>
			</YGroup>
		</ScrollView>
	);
}
/*

<YGroup alignSelf="center" padded bordered size="$5" separator={<Separator />}>
				<YGroup.Item>
					<ListItem
						hoverTheme
						pressTheme
						title="Felhő import"
						subTitle="Adatbázis importálása Google Drive-ról"
						icon={DownloadCloud}
						iconAfter={ChevronRight}
					/>
				</YGroup.Item>
				<YGroup.Item>
					<ListItem
						hoverTheme
						pressTheme
						title="Felhő export"
						subTitle="Adatbázis exportálása Google Drive-ra"
						icon={UploadCloud}
						iconAfter={ChevronRight}
					/>
				</YGroup.Item>
			</YGroup>
*/
