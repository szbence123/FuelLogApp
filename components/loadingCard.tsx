import { Loader } from "@tamagui/lucide-icons";
import { Button, Card, H2 } from "tamagui";
import { ProgressBar } from "./progress";

export default function LoadingCard() {
  return (
    <Card size="$4" style={{ borderRadius: 50, margin: 10 }}>
      <Card.Header padded height={150} justifyContent="center">
        <Button scaleIcon={2} icon={Loader}>
          <H2>Betöltés...</H2>
        </Button>
        <ProgressBar />
      </Card.Header>
    </Card>
  );
}
