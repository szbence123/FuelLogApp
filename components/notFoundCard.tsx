import { Search } from "@tamagui/lucide-icons";
import { Button, Card, H2, XStack } from "tamagui";

export default function NotFoundCard() {
  return (
    <Card size="$4" style={{ borderRadius: 50, margin: 10 }}>
      <Card.Header padded height={150} justifyContent="center">
        <Button scaleIcon={2} icon={Search}>
          <H2>Nincs találat!</H2>
        </Button>
      </Card.Header>
    </Card>
  );
}
