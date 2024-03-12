import { StatusBar } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import "@tamagui/core/reset.css";
import { TamaguiProvider, createTamagui } from "@tamagui/core";
import { config } from "@tamagui/config/v3";
import { AppNavigator } from "./StackNavigator";
import { init_db, truncate } from "./db/init_db";
import { PortalProvider } from "tamagui";
import * as Font from "expo-font";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useState } from "react";
import { styles } from "./styles/global";
const tamaguiConfig = createTamagui(config);
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";

type Conf = typeof tamaguiConfig;
declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}
const fetchFonts = async () => {
  await Font.loadAsync({
    TypeWriter: require("./assets/fonts/JMH Typewriter.ttf"),
    Inter: require("./assets/fonts/JMH Typewriter.ttf"),
    InterBold: require("./assets/fonts/JMH Typewriter-Bold.ttf")
  });
};

let qc = new QueryClient();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await preventAutoHideAsync();
        await fetchFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontLoaded(true);
        await hideAsync();
      }
    }
    prepare();
  }, []);

  if (!fontLoaded) return null;

  /*
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }
*/
  init_db().catch((err) => console.log(err));

  return (
    <QueryClientProvider client={qc}>
      <TamaguiProvider config={tamaguiConfig}>
        <PortalProvider>
          <StatusBar
            backgroundColor={styles.primary.backgroundColor}
            barStyle="light-content"
          />
          <AppNavigator />
        </PortalProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
