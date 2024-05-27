import { Car, CarFront, Fuel, Hash, Plus, Save, X } from "@tamagui/lucide-icons";
import { Button, Dialog, Fieldset, Input, ScrollView, Select, Separator, XStack, YStack } from "tamagui";
import { useState } from "react";
import { insertCar } from "../db/cars";
import { styles } from "../styles/global";
import Modal from "./modal";
import SelectMenu from "./select";
import { SelectItem } from "../types/props";
import { useQuery, useQueryClient } from "react-query";
import { getAllFuelTypes } from "../db/fuelTypes";
import { FuelType } from "../types/fuelTypes";
import LoadingCard from "./loadingCard";
import InputLabel from "./inputLabel";
import { useToastController } from "@tamagui/toast";
import { NotificationTypeEnum } from "../types/enums";

export default function AddCarPage({ last = false, isEdit = false, openingFromMenuBar = false }) {
	const [carName, setCarName] = useState("");
	const [regNumber, setRegNumber] = useState("");
	const [selectedFuelType, setSelectedFuelType] = useState();
	const queryClient = useQueryClient();
	const toast = useToastController();

	const addCar = () => {
		if (carName != "" && regNumber != "" && selectedFuelType) {
			insertCar(carName, regNumber, selectedFuelType, toast.show);
			queryClient.invalidateQueries({ queryKey: ["getAllCars"] });
		} else {
			toast.show("Kitöltés kötelező!", { notificationOptions: { tag: NotificationTypeEnum.Danger, icon: NotificationTypeEnum.Danger } });
		}
	};

	const { data: fuelTypes, isLoading } = useQuery<FuelType[]>({
		queryKey: "fuelTypes",
		queryFn: async (): Promise<FuelType[]> => {
			return await getAllFuelTypes();
		}
	});

	return (
		<Modal
			title="Autó hozzáadása"
			openBtn={
				openingFromMenuBar ? (
					<Button backgroundColor={styles.primary.backgroundColor} onPress={() => {}} color="#fff" size={40} icon={Plus} />
				) : (
					<Button
						margin="auto"
						size={80}
						alignSelf="center"
						icon={Plus}
						backgroundColor={styles.primary.backgroundColor}
						color={styles.primary.color}
						borderRadius={30}
						height={50}
						width={50}
					/>
				)
			}
			body={
				!isLoading ? (
					<ScrollView>
						<YStack gap={10}>
							<Fieldset>
								<InputLabel Icon={CarFront} text="Név">
									<Input onChangeText={setCarName} flex={1} id="name" placeholder="Név" />
								</InputLabel>
							</Fieldset>
							<Fieldset>
								<InputLabel Icon={Hash} text="Rendszám">
									<Input onChangeText={setRegNumber} flex={1} id="regNumber" placeholder="Rendszám" />
								</InputLabel>
							</Fieldset>
							<Fieldset>
								<InputLabel Icon={Fuel} text="Üzemanyag">
									<SelectMenu
										selected={selectedFuelType}
										setSelected={setSelectedFuelType}
										title="Alapértelmezett üzemanyag"
										items={fuelTypes.map((f: FuelType): SelectItem => {
											return {
												value: f.id.toString(),
												name: `${f.name} (${f.short_name})`,
												icon: (
													<Select.Icon borderRadius={40} backgroundColor={f.color} padding={5}>
														<Fuel color="white" />
													</Select.Icon>
												)
											};
										})}
									/>
								</InputLabel>
							</Fieldset>
						</YStack>
						<Separator margin={30} />
						<XStack alignSelf="flex-end" gap={4}>
							<Dialog.Close displayWhenAdapted asChild>
								<Button theme="active" aria-label="Close">
									Mégsem
								</Button>
							</Dialog.Close>
							<Dialog.Close displayWhenAdapted asChild>
								<Button onPress={addCar} icon={Save} theme="active" aria-label="Close" style={styles.primary}>
									Mentés
								</Button>
							</Dialog.Close>
						</XStack>
					</ScrollView>
				) : (
					<LoadingCard />
				)
			}
		/>
	);
}
