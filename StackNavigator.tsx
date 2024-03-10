import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import CarsPage from "./pages/cars";
import {styles} from "./styles/global";
import FuelInfosPage from "./pages/fuelInfos";

const Stack = createNativeStackNavigator();

export function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: styles.primary.backgroundColor, // Your desired color
                },
                headerTintColor: 'white', // Color of the title and buttons
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }} initialRouteName="Cars">
                <Stack.Screen name="Cars" component={CarsPage} options={{ title: 'Autóim' }} />
                <Stack.Screen name="FuelInfos" component={FuelInfosPage} options={{ title: 'Tankolások' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}