import { YStack } from "tamagui";
import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { Adapt, Select, Sheet } from "tamagui";
import { SelectProps } from "../types/props";
export default function SelectMenu(props: SelectProps) {
	return (
		<Select value={props.selected} onValueChange={props.setSelected} disablePreventBodyScroll>
			<Select.Trigger width="100%" iconAfter={ChevronDown}>
				<Select.Value placeholder={props.title} />
			</Select.Trigger>

			<Adapt when="sm" platform="touch">
				<Sheet
					native={false}
					modal
					dismissOnSnapToBottom
					animationConfig={{
						type: "spring",
						damping: 20,
						mass: 1.2,
						stiffness: 250
					}}
				>
					<Sheet.Frame>
						<Sheet.ScrollView>
							<Adapt.Contents />
						</Sheet.ScrollView>
					</Sheet.Frame>
				</Sheet>
			</Adapt>

			<Select.Content zIndex={200000}>
				<Select.ScrollUpButton alignItems="center" justifyContent="center" position="relative" width="100%" height="$3">
					<YStack zIndex={10}>
						<ChevronUp size={20} />
					</YStack>
				</Select.ScrollUpButton>

				<Select.Viewport minWidth={200} width="100%">
					<Select.Group>
						<Select.Label>{props.title}</Select.Label>
						{props.items.map((item, i) => {
							return (
								<Select.Item index={i} key={item.value} value={item.value} justifyContent="flex-start" gap={30}>
									{item.icon ? item.icon : <></>}
									<Select.ItemText textAlign="left">{item.name}</Select.ItemText>
									<Select.ItemIndicator marginRight="auto">
										<Check size={16} />
									</Select.ItemIndicator>
								</Select.Item>
							);
						}, [])}
					</Select.Group>
					{/* Native gets an extra icon */}
				</Select.Viewport>

				<Select.ScrollDownButton alignItems="center" justifyContent="center" position="relative" width="100%" height="$3">
					<YStack zIndex={10}>
						<ChevronDown size={20} />
					</YStack>
				</Select.ScrollDownButton>
			</Select.Content>
		</Select>
	);
}
