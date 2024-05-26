import { Adapt, Button, Dialog, Sheet, Unspaced } from "tamagui";
import { X } from "@tamagui/lucide-icons";
import { ModalProps } from "../types/props";

export default function Modal(props: ModalProps) {
	return (
		<Dialog modal>
			<Dialog.Trigger asChild>{props.openBtn}</Dialog.Trigger>

			<Adapt when="sm" platform="touch">
				<Sheet animation="quick" zIndex={200000} modal dismissOnSnapToBottom>
					<Sheet.Frame padding="$4" gap="$4">
						<Adapt.Contents />
					</Sheet.Frame>
					<Sheet.Overlay animation="quick" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
				</Sheet>
			</Adapt>

			<Dialog.Portal>
				<Dialog.Overlay key="overlay" animation="quick" opacity={0} enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />

				<Dialog.Content
					bordered
					elevate
					key="content"
					animateOnly={["transform", "opacity"]}
					enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
					exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
					gap="$4"
				>
					<Dialog.Title>{props.title}</Dialog.Title>

					{props.body}

					<Unspaced>
						<Dialog.Close asChild>
							<Button position="absolute" top="$3" right="$3" size="$2" circular icon={X} />
						</Dialog.Close>
					</Unspaced>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog>
	);
}
