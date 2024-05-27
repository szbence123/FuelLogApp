import { Calendar, Clock, Diameter, Fuel, Gauge, LocateFixed, MapPin, Plus, Radius, Receipt, Save, Sigma } from "@tamagui/lucide-icons";
import { Button, ButtonIcon, Dialog, Fieldset, Input, ScrollView, Select, Separator, Spacer, Text, XStack, YStack } from "tamagui";
import { styles } from "../styles/global";
import Modal from "./modal";
import { View } from "react-native";
import React, { ReactNode, useState } from "react";
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

//export function FuelLog({ carId, fuelTypeId }) {
//	return <AddFuelLog carId={carId} fuelTypeId={fuelTypeId} />;
//}

export function FuelLog({ carId, fuelTypeId, openingFromMenuBar = false }) {
	const [km, setKm] = useState("");
	const [all_km, setAllKm] = useState("");
	const [price, setPrice] = useState("");
	const [location, setLocation] = useState("");
	const [amount, setAmount] = useState("");
	const [selectedFuelType, setSelectedFuelType] = useState(fuelTypeId.toString());

	const { data: fuelTypes, isLoading } = useQuery<FuelType[]>({
		queryKey: "fuelTypes",
		queryFn: async (): Promise<FuelType[]> => {
			return await getAllFuelTypes();
		}
	});

	const [showDatePicker, setShowDatePicker] = useState(false);

	const [date, setDate] = useState(new Date());

	const [showTimePicker, setShowTimePicker] = useState(false);

	const openDatePicker = () => {
		setShowDatePicker(true);
	};

	const openTimePicker = () => {
		setShowTimePicker(true);
	};

	const onDateChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setDate(currentDate);
		setShowDatePicker(false);
	};

	const onTimeChange = (event, selectedTime) => {
		const currentTime = selectedTime || date;
		setDate(currentTime);
		setShowTimePicker(false);
	};

	const toast = useToastController();
	const queryClient = useQueryClient();

	const addFuelLog = async () => {
		insertFuelInfo(
			moment(date).format("YYYY-MM-DD HH:mm"),
			parseFloat(km),
			parseFloat(all_km),
			parseFloat(price),
			location,
			parseFloat(amount),
			parseInt(carId),
			parseFloat(selectedFuelType),
			toast.show
		);
		queryClient.invalidateQueries({ queryKey: ["getAllFuelInfo"] });
	};

	return (
		<Modal
			title="Tankolás hozzáadása"
			openBtn={
				openingFromMenuBar ? (
					<Button backgroundColor={styles.primary.backgroundColor} onPress={() => {}} color="#fff" size={40} icon={Plus} />
				) : (
					<Button style={styles.primary} width="100%" alignSelf="center" icon={Plus}>
						Tankolás hozzáadása
					</Button>
				)
			}
			body={
				!isLoading && fuelTypes ? (
					<ScrollView>
						{showDatePicker && (
							<DateTimePicker value={date} mode="date" display="default" onChange={onDateChange} accentColor={styles.primary.backgroundColor} />
						)}
						{showTimePicker && <DateTimePicker value={date} mode="time" display="clock" is24Hour onChange={onTimeChange} />}
						<YStack gap={10}>
							<Fieldset>
								<InputLabel Icon={Fuel} text="Üzemanyag típusa">
									<SelectMenu
										selected={selectedFuelType}
										setSelected={setSelectedFuelType}
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
								</InputLabel>
							</Fieldset>

							<Fieldset>
								<XStack justifyContent="space-between">
									<InputLabel Icon={Calendar} text="Dátum">
										<Input flexGrow={2} value={moment(date).format("YYYY-MM-DD")} onPressIn={() => openDatePicker()} />
									</InputLabel>
									<InputLabel Icon={Clock} text="Idő">
										<Input value={moment(date).format("HH:mm")} onPressIn={() => openTimePicker()} />
									</InputLabel>
								</XStack>
							</Fieldset>

							<Fieldset>
								<InputLabel Icon={Receipt} text={"Fizetve (Ft)"}>
									<Input onChangeText={setPrice} flex={1} id="price" placeholder="Fizetve (Ft)" />
								</InputLabel>
							</Fieldset>

							<Fieldset>
								<InputLabel Icon={Gauge} text={"Tankolt mennyiség"}>
									<Input onChangeText={setAmount} flex={1} id="amount" placeholder="Tankolt mennyiség (l)" />
								</InputLabel>
							</Fieldset>

							<Fieldset>
								<InputLabel Icon={Radius} text={"Km óra állás (nullázás óta)"}>
									<Input onChangeText={setKm} flex={1} id="km" placeholder="Km óra állás (nullázás óta)" />
								</InputLabel>
							</Fieldset>

							<Fieldset>
								<InputLabel Icon={Diameter} text={"Össz. km"}>
									<Input onChangeText={setAllKm} flex={1} id="allkm" placeholder="Össz. km" />
								</InputLabel>
							</Fieldset>

							<Fieldset>
								<InputLabel Icon={MapPin} text={"Tankolás helye"}>
									<Input onChangeText={setLocation} flex={1} id="location" placeholder="Tankolás helye" />
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
								<Button onPress={() => addFuelLog()} icon={Save} theme="active" aria-label="Close" style={styles.primary}>
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
