import { ChevronRight, Moon, Plus, Pencil } from "@tamagui/lucide-icons";

import { PopoverProps, Popover, Adapt, YStack, XStack, ListItem, Separator, YGroup, Button } from "tamagui";

export function SettingsPopover({ Icon, Name, ...props }: PopoverProps & { Icon?: any; Name?: string }) {
	return (
		<Popover size="$5" allowFlip {...props}>
			<Popover.Trigger asChild>
				<Button icon={Icon} />
			</Popover.Trigger>

			<Adapt when="sm" platform="touch">
				<Popover.Sheet modal dismissOnSnapToBottom>
					<Popover.Sheet.Frame padding="$4">
						<Adapt.Contents />
					</Popover.Sheet.Frame>
					<Popover.Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
				</Popover.Sheet>
			</Adapt>

			<Popover.Content
				borderWidth={1}
				borderColor="$borderColor"
				enterStyle={{ y: -10, opacity: 0 }}
				exitStyle={{ y: -10, opacity: 0 }}
				elevate
				animation={[
					"quick",
					{
						opacity: {
							overshootClamping: true
						}
					}
				]}
			>
				<Popover.Arrow borderWidth={1} borderColor="$borderColor" />

				<YStack space="$3">
					<XStack space="$3">
						<YGroup alignSelf="center" bordered width={240} size="$5" separator={<Separator />}>
							<YGroup.Item>
								<ListItem hoverTheme pressTheme title="Hozzáadás" subTitle="Autó hozzáadása" icon={Plus} iconAfter={ChevronRight} />
								<ListItem hoverTheme pressTheme title="Szerkesztls" subTitle="Autók szerkesztése" icon={Pencil} iconAfter={ChevronRight} />
							</YGroup.Item>
							<YGroup.Item>
								<ListItem hoverTheme pressTheme title="Moon" subTitle="Subtitle" icon={Moon} iconAfter={ChevronRight} />
							</YGroup.Item>
						</YGroup>
					</XStack>

					<Popover.Close asChild></Popover.Close>
				</YStack>
			</Popover.Content>
		</Popover>
	);
}
