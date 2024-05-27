import {
	ArrowUpFromLine,
	BookOpenText,
	ChevronRight,
	Cloud,
	Download,
	DownloadCloud,
	Import,
	Moon,
	Star,
	Sun,
	UploadCloud
} from "@tamagui/lucide-icons";
import React from "react";
import { ListItem, ScrollView, Separator, Text, View, XStack, YGroup, YStack } from "tamagui";
import { exportDatabase, importDatabase } from "../db/localBackup";
import { useToastController } from "@tamagui/toast";
import { useQueryClient } from "react-query";

export default function SettingsPage() {
	const toast = useToastController();
	const queryClient = useQueryClient();
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
