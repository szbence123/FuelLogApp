import { useToastState, Toast } from "@tamagui/toast";
import React from "react";
import { Dimensions } from "react-native";
import { View, XStack, YStack } from "tamagui";
import { styles } from "../styles/global";
import { NotificationTypeEnum } from "../types/enums";
import { AlertCircle, AlertTriangle, Check, Info } from "@tamagui/lucide-icons";

export const InfoToast = () => {
	const currentToast = useToastState();
	const width = Dimensions.get("window").width;
	const height = Dimensions.get("window").height;

	let color = styles.primary.backgroundColor;
	let icon = <Info size={20} color={styles.primary.color} />;

	if (currentToast?.notificationOptions?.tag) {
		if (currentToast.notificationOptions.tag === NotificationTypeEnum.Danger) {
			color = styles.notifications.danger;
		} else if (currentToast.notificationOptions.tag === NotificationTypeEnum.Success) {
			color = styles.notifications.success;
		} else if (currentToast.notificationOptions.tag === NotificationTypeEnum.Warning) {
			color = styles.notifications.warning;
		}
	}

	if (currentToast?.notificationOptions?.icon) {
		if (currentToast.notificationOptions.icon === NotificationTypeEnum.Danger) {
			icon = <AlertTriangle size={20} color={styles.primary.color} />;
		} else if (currentToast.notificationOptions.icon === NotificationTypeEnum.Success) {
			icon = <Check size={20} color={styles.primary.color} />;
		} else if (currentToast.notificationOptions.icon === NotificationTypeEnum.Warning) {
			icon = <AlertCircle size={20} color={styles.primary.color} />;
		}
	}

	if (!currentToast || currentToast.isHandledNatively) return null;
	return (
		<Toast
			key={currentToast.id}
			duration={1800}
			enterStyle={{ opacity: 0, scale: 0.5, x: 0 }}
			exitStyle={{ opacity: 0, scale: 1, x: width }}
			opacity={1}
			scale={1}
			x={20}
			width={width - 40}
			animation="100ms"
			viewportName={currentToast.viewportName}
			backgroundColor={color}
		>
			<YStack width={"100%"}>
				<XStack alignItems="center" gap={10}>
					{icon}
					<Toast.Title color="white">{currentToast.title}</Toast.Title>
				</XStack>
				{!!currentToast.message && <Toast.Description color="white">{currentToast.message}</Toast.Description>}
			</YStack>
		</Toast>
	);
};
