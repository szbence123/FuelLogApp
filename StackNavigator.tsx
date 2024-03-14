import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import CarsPage from "./pages/cars";
import { styles } from "./styles/global";
import FuelInfosPage from "./pages/fuelInfos";
import { Button, XStack } from "tamagui";
import { Settings } from "react-native";
import { Plus, Settings2 } from "@tamagui/lucide-icons";

const Stack = createNativeStackNavigator();

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
          options={{
            title: "Autóim",
            headerRight: () => (
              <XStack>
                <Button
                  backgroundColor={styles.primary.backgroundColor}
                  onPress={() => {}}
                  color="#fff"
                  size={40}
                  icon={Settings2}
                />
                <Button
                  backgroundColor={styles.primary.backgroundColor}
                  onPress={() => {}}
                  color="#fff"
                  size={40}
                  icon={Plus}
                />
              </XStack>
            )
          }}
        />
        <Stack.Screen
          name="FuelInfos"
          component={FuelInfosPage}
          options={{
            title: "Tankolások",
            headerRight: () => (
              <Button
                backgroundColor={styles.primary.backgroundColor}
                onPress={() => {}}
                color="#fff"
                size={40}
                icon={Plus}
              />
            )
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
