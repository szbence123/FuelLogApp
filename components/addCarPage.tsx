import { Car, CarFront, Fuel, Hash, Plus, Save, X } from "@tamagui/lucide-icons";
import { Button, Dialog, Fieldset, Input, ScrollView, Select, Separator, Text, XStack, YStack } from "tamagui";
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
import { Controller, useForm } from "react-hook-form";

export default function AddCarPage({ last = false, isEdit = false, openingFromMenuBar = false }) {
	const queryClient = useQueryClient();
	const toast = useToastController();

	const { data: fuelTypes, isLoading } = useQuery<FuelType[]>({
		queryKey: "fuelTypes",
		queryFn: async (): Promise<FuelType[]> => {
			return await getAllFuelTypes();
		}
	});

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		control,
		formState: { errors }
	} = useForm();

	const onSubmit = async (data) => {
		console.log(data.name, data.regNumber, data.fuelType, toast.show);
		await insertCar(data.name, data.regNumber, data.fuelType, toast.show);
		queryClient.invalidateQueries({ queryKey: ["getAllCars"] });
	};

	return (
		<Modal
			title="Autó hozzáadása"
			openBtn={
				openingFromMenuBar ? (
					<Button backgroundColor={styles.primary.backgroundColor} onPress={reset} color="#fff" size={40} icon={Plus} />
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
						onPress={reset}
					/>
				)
			}
			body={
				!isLoading ? (
					<ScrollView>
						<YStack gap={10}>
							<InputLabel Icon={CarFront} text="Név">
								<Input
									{...register("name", { required: "A név megadása kötelező" })}
									onChangeText={(text) => setValue("name", text)}
									flex={1}
									id="name"
									placeholder="Név"
									style={{ borderColor: errors.name ? "red" : "lightgray" }}
								/>
								{errors.name && <Text color={styles.error.color}>{errors.name.message}</Text>}
							</InputLabel>

							<InputLabel Icon={Hash} text="Rendszám">
								<Input
									{...register("regNumber", { required: "A rendszám megadása kötelező" })}
									onChangeText={(text) => setValue("regNumber", text)}
									flex={1}
									id="regNumber"
									placeholder="Rendszám"
									style={{ borderColor: errors.regNumber ? "red" : "lightgray" }}
								/>
								{errors.regNumber && <Text color={styles.error.color}>{errors.regNumber.message}</Text>}
							</InputLabel>

							<InputLabel Icon={Fuel} text="Üzemanyag">
								<Controller
									name="fuelType"
									control={control}
									rules={{ required: "Alapértelmezett üzemanyag megadása kötelező" }}
									render={({ field: { onChange, value } }) => (
										<SelectMenu
											style={{ borderColor: errors.fuelType ? "red" : "lightgray" }}
											selected={value}
											setSelected={onChange}
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
									)}
								/>
								{errors.fuelType && <Text color={styles.error.color}>{errors.fuelType.message}</Text>}
							</InputLabel>
						</YStack>

						<Separator margin={30} />

						<XStack alignSelf="flex-end" gap={4}>
							<Dialog.Close displayWhenAdapted asChild>
								<Button theme="active" aria-label="Close">
									Mégsem
								</Button>
							</Dialog.Close>
							<Dialog.Close displayWhenAdapted asChild>
								<Button onPress={handleSubmit(onSubmit)} icon={Save} theme="active" aria-label="Close" style={styles.primary}>
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
