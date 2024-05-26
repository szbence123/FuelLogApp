import { View } from "react-native";
import { Button, Card, H2, H3, Paragraph, ScrollView, XStack, YStack, Text } from "tamagui";
import { CarFront, ChevronRight, Fuel, Info, Menu, Trash } from "@tamagui/lucide-icons";
import { getAllCars, removeCar } from "../db/cars";
import { FuelLog } from "../components/addFuelLog";
import AddCarPage from "../components/addCarPage";
import { useQuery } from "react-query";
import LoadingCard from "../components/loadingCard";
import { styles } from "../styles/global";
import { useState } from "react";
import { useToastController } from "@tamagui/toast";

export default function CarsPage({ navigation }: any) {
	const [propsOpened, setPropsOpened] = useState(-1);
	const { data: cars, isFetching, refetch } = useQuery({ queryKey: "getAllCars", queryFn: () => getAllCars() });
	const toast = useToastController();
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
								</YStack>

								<XStack borderRadius={50} padding={10} width={50} height={50} justifyContent="center" alignItems="center" backgroundColor={car.color}>
									<Text color="white" fontWeight="bold">
										{car.fuel_type_name.substring(0, 3)}
									</Text>
								</XStack>
							</XStack>
							<YStack gap={5} borderRadius={40} height={80} flexDirection="column">
								<Text>Üzemanyag típusa: {car.fuel_type_name}</Text>
								<XStack style={styles.plate}>
									<XStack style={styles.eu}>
										<Text color="white" fontSize={20}>
											HU
										</Text>
									</XStack>
									<XStack margin="auto" justifyContent="center" alignItems="center">
										<Text fontSize={30}>{car.reg_number.toString().substring(0, 10)}</Text>
									</XStack>
								</XStack>
							</YStack>
						</Card.Header>
						<Card.Footer padded>
							<YStack width="100%" gap={5}>
								<FuelLog carId={car.id} fuelTypeId={car.fuel_type_id} />
								<XStack width="100%" justifyContent="space-between" gap={5}>
									<Button
										flex={1}
										onPress={() => navigation.navigate("FuelInfos", { carId: car.id, fuelTypeId: car.fuel_type_id })}
										alignSelf="center"
										icon={Fuel}
									>
										Tankolások
									</Button>
									{propsOpened === car.id ? (
										<XStack gap={5}>
											<Button
												onPress={() => toast.show("Törléshez nyomd hosszan.")}
												onLongPress={() => removeCar(car.id, refetch, toast.show)}
												color="red"
												alignSelf="center"
												icon={Trash}
											>
												Törlés
											</Button>
											<Button onPress={() => setPropsOpened(-1)} icon={ChevronRight} />
										</XStack>
									) : (
										<Button onPress={() => setPropsOpened(car.id)} icon={Menu} />
									)}
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
								<Paragraph theme="alt2">Jelenleg nincs autó hozzáadva</Paragraph>
							</YStack>
							<AddCarPage />
						</XStack>
					</Card.Header>
					<Card.Background />
				</Card>
			)}
			{cars && cars.length > 0 ? (
				<XStack>
					<AddCarPage />
				</XStack>
			) : (
				<View></View>
			)}
		</ScrollView>
	);
}
