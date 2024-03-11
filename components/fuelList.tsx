import { Button, Card, H1, H2, Paragraph, Separator, XStack } from "tamagui";
import { Text } from "react-native";
import { getAllFuelInfo, removeFuelInfo } from "../db/fuelinfo";
import { Trash } from "@tamagui/lucide-icons";
import { useQuery } from "react-query";
import { FuelInfoModel } from "../typedefs/cars";
import NotFoundCard from "./notFoundCard";
import LoadingCard from "./loadingCard";
import { useEffect } from "react";

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
              onPress={() => removeFuelInfo(fuelInfo.id, refetch)}
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
