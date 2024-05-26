import { Button, Card, H2, Paragraph, XStack } from "tamagui";
import { Text } from "react-native";
import { getAllFuelInfo, removeFuelInfo } from "../db/fuelinfo";
import { Fuel, Trash } from "@tamagui/lucide-icons";
import { useQuery } from "react-query";
import { FuelInfoModel } from "../typedefs/cars";
import NotFoundCard from "./notFoundCard";
import LoadingCard from "./loadingCard";

export default function FuelList({ route, selectedYear, start, end }) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllFuelInfo", selectedYear, start, end],
    queryFn: async () => {
      return await getAllFuelInfo(route.params.carId, selectedYear, start, end);
    }
  });

  return isLoading || !data ? (
    <LoadingCard />
  ) : data && data.length > 0 ? (
    data.map((fuelInfo: FuelInfoModel) => (
      <Card
        size="$4"
        style={{ borderRadius: 50, margin: 10 }}
        key={fuelInfo.id}
      >
        <Card.Header padded>
          <H2>
            {fuelInfo.amount} l - {fuelInfo.price} Ft
          </H2>
          <H2 textAlign="right" color="gray">
            {fuelInfo.date}
          </H2>

          <XStack
            alignItems="center"
            gap={5}
            borderRadius={40}
            backgroundColor="#eee"
            margin={10}
          >
            <XStack
              borderRadius={50}
              padding={10}
              backgroundColor={fuelInfo.color}
            >
              <Fuel size={20} color="white" />
            </XStack>
            <XStack>
              <Paragraph>{fuelInfo.name}</Paragraph>
            </XStack>
          </XStack>
          <Paragraph theme="alt2">
            Km óra állás:{" "}
            <Text style={{ fontFamily: "InterBold" }}>{fuelInfo.km} km</Text>
          </Paragraph>
          <Paragraph theme="alt2">
            Össz km:{" "}
            <Text style={{ fontFamily: "InterBold" }}>
              {fuelInfo.all_km} km
            </Text>
          </Paragraph>
          <Paragraph theme="alt2">
            Hely:{" "}
            <Text style={{ fontFamily: "InterBold" }}>{fuelInfo.location}</Text>
          </Paragraph>
          <XStack justifyContent="flex-end">
            <Button
              style={{}}
              onLongPress={() => removeFuelInfo(fuelInfo.id, refetch)}
              color="red"
              icon={Trash}
            >
              Törlés
            </Button>
          </XStack>
        </Card.Header>
      </Card>
    ))
  ) : (
    <NotFoundCard />
  );
}
