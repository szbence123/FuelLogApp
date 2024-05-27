import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, RouteProp, useRoute } from "@react-navigation/native";
import CarsPage from "./pages/cars";
import { styles } from "./styles/global";
import FuelInfosPage from "./pages/fuelInfos";
import { Button, XStack } from "tamagui";
import { Plus, Settings2 } from "@tamagui/lucide-icons";
import React from "react";
import { FuelLog } from "./components/addFuelLog";
import AddCarPage from "./components/addCarPage";
import { RefetchOptions } from "react-query";
import SettingsPage from "./pages/settings";

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
	Cars: { refetch: RefetchOptions };
	FuelInfos: { carId: number; fuelTypeId: number };
};

export type FuelInfosRouteProp = RouteProp<RootStackParamList, "FuelInfos">;
export type CarsRouteProp = RouteProp<RootStackParamList, "Cars">;

const FuelInfosHeaderRight = () => {
	const route = useRoute<FuelInfosRouteProp>();
	const { carId, fuelTypeId } = route.params;
	return <FuelLog carId={carId} fuelTypeId={fuelTypeId} openingFromMenuBar={true} />;
};

export function AppNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: styles.primary.backgroundColor // Your desired color
					},
					headerTintColor: "white", // Color of the title and buttons
					headerTitleStyle: {
						fontWeight: "bold"
					}
				}}
				initialRouteName="Cars"
			>
				<Stack.Screen
					name="Cars"
					component={CarsPage}
					options={({ navigation }) => ({
						title: "Autóim",
						headerRight: () => (
							<XStack>
								<Button
									backgroundColor={styles.primary.backgroundColor}
									onPress={() => {
										navigation.navigate("Settings");
									}}
									color="#fff"
									size={40}
									icon={Settings2}
								/>
								<AddCarPage openingFromMenuBar={true} />
							</XStack>
						)
					})}
				/>
				<Stack.Screen
					name="FuelInfos"
					component={FuelInfosPage}
					options={{
						title: "Tankolások",
						headerRight: () => {
							return <FuelInfosHeaderRight />;
						}
					}}
				/>
				<Stack.Screen
					name="Settings"
					component={SettingsPage}
					options={{
						title: "Beállítások"
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
