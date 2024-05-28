import { Button, Card, H2, H3, Paragraph, View, XStack, YStack } from "tamagui";
import { Text } from "react-native";
import { getAllFuelInfo, removeFuelInfo } from "../db/fuelinfo";
import { ChevronRight, Fuel, Menu, Trash } from "@tamagui/lucide-icons";
import { useQuery, useQueryClient } from "react-query";
import { FuelInfoModel } from "../types/cars";
import NotFoundCard from "./notFoundCard";
import LoadingCard from "./loadingCard";
import { useState } from "react";
import { useToastController } from "@tamagui/toast";
import { styles } from "../styles/global";

export default function FuelList({ route, selectedYear, start, end }) {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["getAllFuelInfo", selectedYear, start, end],
		queryFn: async () => {
			return await getAllFuelInfo(route.params.carId, selectedYear, start, end);
		}
	});

	const queryClient = useQueryClient();

	const [propsOpened, setPropsOpened] = useState(-1);
	const toast = useToastController();

	const removeFuelLog = (id: number) => {
		removeFuelInfo(id, toast.show);
		queryClient.invalidateQueries({ queryKey: ["getAllFuelInfo"] });
	};

	return isLoading || !data ? (
		<LoadingCard />
	) : data && data.length > 0 ? (
		data.map((fuelInfo: FuelInfoModel) => (
			<Card size="$4" style={{ borderRadius: 80, margin: 10 }} key={fuelInfo.id}>
				<Card.Header padded>
					<YStack gap={5}>
						<View style={styles.primary} padding={5}>
							<H2 color={styles.primary.color} textAlign="center">
								{fuelInfo.amount} l - {fuelInfo.price} Ft
							</H2>
						</View>

						<H3 textAlign="center" color="gray">
							{fuelInfo.date}
						</H3>
					</YStack>

					<XStack alignItems="center" gap={5} borderRadius={40} backgroundColor="#eee" margin={10}>
						<XStack borderRadius={50} padding={10} backgroundColor={fuelInfo.color}>
							<Fuel size={20} color="white" />
						</XStack>
						<XStack>
							<Paragraph>{fuelInfo.name}</Paragraph>
						</XStack>
					</XStack>
					<Paragraph theme="alt2">
						Km óra állás:
						<Text style={{ fontFamily: "InterBold" }}>{fuelInfo.km} km</Text>
					</Paragraph>
					<Paragraph theme="alt2">
						Össz km: <Text style={{ fontFamily: "InterBold" }}>{fuelInfo.all_km} km</Text>
					</Paragraph>
					<Paragraph theme="alt2">
						Hely: <Text style={{ fontFamily: "InterBold" }}>{fuelInfo.location || "Ismeretlen"}</Text>
					</Paragraph>
					<XStack justifyContent="flex-end">
						{propsOpened === fuelInfo.id ? (
							<XStack gap={5}>
								<Button
									onPress={() => toast.show("Törléshez nyomd hosszan.")}
									onLongPress={() => removeFuelLog(fuelInfo.id)}
									color="red"
									icon={Trash}
								>
									Törlés
								</Button>
								<Button onPress={() => setPropsOpened(-1)} icon={ChevronRight} />
							</XStack>
						) : (
							<Button onPress={() => setPropsOpened(fuelInfo.id)} icon={Menu} />
						)}
					</XStack>
				</Card.Header>
			</Card>
		))
	) : (
		<NotFoundCard />
	);
}
