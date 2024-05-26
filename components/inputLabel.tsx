import { Diameter } from "@tamagui/lucide-icons";
import { YStack, XStack, Text } from "tamagui";

export default function InputLabel(props) {
	return (
		<YStack gap={5}>
			<XStack alignItems="center" gap={10}>
				<props.Icon size={15} />
				<Text>{props.text}</Text>
			</XStack>
			{props.children}
		</YStack>
	);
}
