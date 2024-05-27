import {
	Calendar,
	CalendarClock,
	Clock,
	Diameter,
	Fuel,
	Gauge,
	LocateFixed,
	MapPin,
	Plus,
	Radius,
	Receipt,
	Save,
	Sigma
} from "@tamagui/lucide-icons";
import { Button, ButtonIcon, Dialog, Fieldset, Input, ScrollView, Select, Separator, Spacer, Text, XStack, YStack } from "tamagui";
import { styles } from "../styles/global";
import Modal from "./modal";
import { TouchableOpacity, View } from "react-native";
import React, { ReactNode, useEffect, useState } from "react";
import { insertFuelInfo } from "../db/fuelinfo";
import moment from "moment";
import SelectMenu from "./select";
import { FuelType } from "../types/fuelTypes";
import { getAllFuelTypes } from "../db/fuelTypes";
import { useQuery, useQueryClient } from "react-query";
import { SelectItem } from "../types/props";
import LoadingCard from "./loadingCard";
import { Locate } from "@tamagui/lucide-icons";
import InputLabel from "./inputLabel";
import { useToastController } from "@tamagui/toast";
import { toast } from "burnt";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Controller, useForm } from "react-hook-form";
import { insertCar } from "../db/cars";

//export function FuelLog({ carId, fuelTypeId }) {
//	return <AddFuelLog carId={carId} fuelTypeId={fuelTypeId} />;
//}

export function FuelLog({ carId, fuelTypeId, openingFromMenuBar = false }) {
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
		getValues,
		reset,
		control,
		formState: { errors }
	} = useForm();

	const [date, setDate] = useState(new Date());

	const [datePickerVisible, setDatePickerVisible] = useState(false);
	const [mode, setMode] = useState<string>("date");

	const onDateChange = (event, selectedDate) => {
		if (selectedDate) {
			setValue("date", selectedDate);
			if (mode === "time") {
				setDatePickerVisible(false);
			}
		}
	};

	const openDatePicker = (currentMode: any) => {
		setMode(currentMode);
		setDatePickerVisible(true);
	};

	const toast = useToastController();
	const queryClient = useQueryClient();

	const onSubmit = async (data) => {
		console.log(data.date, data.km, data.allkm, data.price, data.location, data.amount, parseInt(carId), data.fuelType);
		await insertFuelInfo(
			moment(data.date).format("YYYY-MM-DD HH:mm"),
			data.km,
			data.allkm,
			data.price,
			data.location,
			data.amount,
			parseInt(carId),
			data.fuelType,
			toast.show
		);
		queryClient.invalidateQueries({ queryKey: ["getAllFuelInfo"] });
	};

	const initForm = () => {
		reset();
	};

	return (
		<Modal
			title="Tankolás"
			openBtn={
				openingFromMenuBar ? (
					<Button backgroundColor={styles.primary.backgroundColor} onPress={initForm} color="#fff" size={40} icon={Plus} />
				) : (
					<Button onPress={initForm} style={styles.primary} width="100%" alignSelf="center" icon={Plus}>
						Tankolás hozzáadása
					</Button>
				)
			}
			body={
				!isLoading && fuelTypes ? (
					<ScrollView>
						<YStack gap={10}>
							<InputLabel Icon={Fuel} text="Üzemanyag típusa">
								<Controller
									defaultValue={fuelTypeId.toString()}
									name="fuelType"
									control={control}
									rules={{ required: "Üzemanyag megadása kötelező" }}
									render={({ field: { onChange, value } }) => (
										<SelectMenu
											style={{ borderColor: errors.fuelType ? "red" : "lightgray" }}
											selected={value}
											setSelected={onChange}
											title="Üzemanyag típusa"
											items={fuelTypes.map((f: FuelType): SelectItem => {
												return {
													value: f.id.toString(),
													name: `${f.name} (${f.short_name})`,
													icon: (
														<Select.Icon borderRadius={40} backgroundColor={f.color} padding={5}>
															<Fuel color={styles.primary.color} />
														</Select.Icon>
													)
												};
											})}
										/>
									)}
								/>
								{errors.fuelType && <Text color={styles.error.color}>{errors.fuelType.message}</Text>}
							</InputLabel>

							<InputLabel Icon={CalendarClock} text="Dátum, idő">
								<Controller
									name="date"
									defaultValue={new Date()}
									control={control}
									rules={{ required: "A dátum és idő megadása kötelező" }}
									render={({ field: { onChange, value } }) => (
										<>
											<TouchableOpacity onPress={() => openDatePicker("date")}>
												<Input
													placeholder="Date and Time"
													value={value ? value.toLocaleString() : ""}
													style={{ borderColor: errors.datetime ? "red" : "lightgray" }}
													editable={false}
												/>
											</TouchableOpacity>
											{datePickerVisible && (
												<DateTimePicker
													value={value || new Date()}
													// @ts-ignore
													mode={mode}
													display="default"
													onChange={(event, selectedDate) => {
														onDateChange(event, selectedDate);
														if (mode === "date") {
															openDatePicker("time");
														}
													}}
												/>
											)}
										</>
									)}
								/>
								{errors.date && <Text style={{ color: "red" }}>{errors.date.message}</Text>}
							</InputLabel>

							<InputLabel Icon={Receipt} text={"Fizetve (Ft)"}>
								<Input
									keyboardType="numeric"
									{...register("price", { valueAsNumber: true, required: "Az ár megadása kötelező" })}
									onChangeText={(text) => setValue("price", text)}
									style={{ borderColor: errors.price ? "red" : "lightgray" }}
									flex={1}
									id="price"
									placeholder="Fizetve (Ft)"
								/>
								{errors.price && <Text color={styles.error.color}>{errors.price.message}</Text>}
							</InputLabel>

							<InputLabel Icon={Gauge} text={"Tankolt mennyiség (l)"}>
								<Input
									keyboardType="numeric"
									{...register("amount", { valueAsNumber: true, required: "A mennyiség megadása kötelező" })}
									onChangeText={(text) => setValue("amount", text)}
									style={{ borderColor: errors.amount ? "red" : "lightgray" }}
									flex={1}
									id="amount"
									placeholder="Tankolt mennyiség (l)"
								/>
								{errors.amount && <Text color={styles.error.color}>{errors.amount.message}</Text>}
							</InputLabel>

							<InputLabel Icon={Radius} text={"Km óra állás (nullázás óta)"}>
								<Input
									keyboardType="numeric"
									{...register("km", { valueAsNumber: true, required: "A km óra állásának megadása kötelező" })}
									onChangeText={(text) => setValue("km", text)}
									style={{ borderColor: errors.km ? "red" : "lightgray" }}
									flex={1}
									id="km"
									placeholder="Km óra állás (nullázás óta)"
								/>
								{errors.km && <Text color={styles.error.color}>{errors.km.message}</Text>}
							</InputLabel>

							<InputLabel Icon={Diameter} text={"Össz. km"}>
								<Input
									keyboardType="numeric"
									{...register("allkm", { valueAsNumber: true, required: "Az össz. km állásának megadása kötelező" })}
									onChangeText={(text) => setValue("allkm", text)}
									style={{ borderColor: errors.allkm ? "red" : "lightgray" }}
									flex={1}
									id="allkm"
									placeholder="Össz. km"
								/>
								{errors.allkm && <Text color={styles.error.color}>{errors.allkm.message}</Text>}
							</InputLabel>

							<InputLabel Icon={MapPin} text={"Tankolás helye"}>
								<Input
									{...register("location")}
									onChangeText={(text) => setValue("location", text)}
									flex={1}
									id="location"
									placeholder="Tankolás helye"
								/>
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
								<Button onPressIn={handleSubmit(onSubmit)} icon={Save} theme="active" aria-label="Close" style={styles.primary}>
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
