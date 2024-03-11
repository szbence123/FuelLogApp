import { Plus } from "@tamagui/lucide-icons";
import { Button, XStack } from "tamagui";
import { styles } from "../styles/global";

export default function AddButton() {
  return (
    <XStack justifyContent="center" width="100%">
      <Button
        size={80}
        alignSelf="center"
        icon={Plus}
        backgroundColor={styles.primary.backgroundColor}
        color={styles.primary.color}
        borderRadius={30}
        height={50}
        width={50}
      />
    </XStack>
  );
}
