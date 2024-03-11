import { YStack } from "tamagui";
import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { Adapt, Label, Select, Sheet } from "tamagui";
import { SelectProps } from "../typedefs/props";
export default function SelectMenu(props: SelectProps) {
  return (
    <Select
      value={props.selected}
      onValueChange={props.setSelected}
      disablePreventBodyScroll
    >
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
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
        </Select.ScrollUpButton>

        <Select.Viewport
          // to do animations:
          // animation="quick"
          // animateOnly={['transform', 'opacity']}
          // enterStyle={{ o: 0, y: -10 }}
          // exitStyle={{ o: 0, y: 10 }}
          minWidth={200}
          width="100%"
        >
          <Select.Group>
            <Select.Label>{props.title}</Select.Label>
            {props.items.map((item, i) => {
              return (
                <Select.Item
                  index={i}
                  key={item.name}
                  value={item.name.toLowerCase()}
                >
                  <Select.ItemText>{item.name}</Select.ItemText>
                  <Select.ItemIndicator marginLeft="auto">
                    <Check size={16} />
                  </Select.ItemIndicator>
                </Select.Item>
              );
            }, [])}
          </Select.Group>
          {/* Native gets an extra icon */}

          <YStack
            position="absolute"
            right={0}
            top={0}
            bottom={0}
            alignItems="center"
            justifyContent="center"
            width={"$4"}
            pointerEvents="none"
          >
            <ChevronDown size={"$true"} />
          </YStack>
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}
