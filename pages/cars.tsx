import { View } from "react-native";
import {
  Button,
  Card,
  H2,
  H3,
  Paragraph,
  ScrollView,
  XStack,
  YStack,
  Text
} from "tamagui";
import { CarFront, Fuel, Info, Trash } from "@tamagui/lucide-icons";
import { getAllCars, removeCar } from "../db/cars";
import { FuelLog } from "../components/addFuelLog";
import AddCarPage from "../components/addCarPage";
import { useQuery } from "react-query";
import LoadingCard from "../components/loadingCard";

export default function CarsPage({ navigation }: any) {
  const {
    data: cars,
    isFetching,
    refetch
  } = useQuery("getCars", () => getAllCars());
  if (isFetching) return <LoadingCard />;

  return (
    <ScrollView>
      {cars && cars.length > 0 ? (
        cars.map((car) => (
          <Card margin={10} borderRadius={20} key={car.id}>
            <Card.Header padded>
              <XStack justifyContent="space-between">
                <YStack>
                  <H2>{car.name}</H2>
                  <Paragraph theme="alt2">{car.regNumber}</Paragraph>
                </YStack>
                <Button
                  backgroundColor="transparent"
                  size={80}
                  alignSelf="center"
                  icon={CarFront}
                ></Button>
              </XStack>
              <XStack
                alignItems="center"
                gap={5}
                borderRadius={40}
                backgroundColor="#eee"
              >
                <XStack
                  borderRadius={50}
                  padding={10}
                  backgroundColor={car.color}
                >
                  <Fuel size={20} color="white" />
                </XStack>
                <Text>{car.fuel_type_name}</Text>
              </XStack>
            </Card.Header>
            <Card.Footer padded>
              <YStack width="100%" gap={5}>
                <FuelLog carId={car.id} fuelTypeId={car.fuel_type_id} />
                <XStack width="100%" justifyContent="space-between" gap={5}>
                  <Button
                    flex={1}
                    onPress={() =>
                      navigation.navigate("FuelInfos", { carId: car.id })
                    }
                    alignSelf="center"
                    icon={Info}
                  >
                    Tankolások
                  </Button>
                  <Button
                    onPress={() => removeCar(car.id, refetch)}
                    color="red"
                    alignSelf="center"
                    icon={Trash}
                  >
                    Törlés
                  </Button>
                </XStack>
              </YStack>
            </Card.Footer>
            <Card.Background />
          </Card>
        ))
      ) : (
        <Card margin={10} borderRadius={20} paddingTop={50} paddingBottom={50}>
          <Card.Header padded>
            <XStack justifyContent="space-between">
              <YStack>
                <H3>Autó hozzáadása</H3>
                <Paragraph theme="alt2">
                  Jelenleg nincs autó hozzáadva
                </Paragraph>
              </YStack>
              <AddCarPage refetch={refetch} />
            </XStack>
          </Card.Header>
          <Card.Background />
        </Card>
      )}
      {cars && cars.length > 0 ? (
        <XStack>
          <AddCarPage refetch={refetch} />
        </XStack>
      ) : (
        <View></View>
      )}
    </ScrollView>
  );
}
