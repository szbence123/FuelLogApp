import { StatusBar } from "react-native";
import "@tamagui/core/reset.css";
import { TamaguiProvider, createTamagui } from "@tamagui/core";
import { config } from "@tamagui/config/v3";
import { AppNavigator } from "./StackNavigator";
import { initDatabase } from "./db/init_db";
import { PortalProvider } from "tamagui";
import * as Font from "expo-font";
import { QueryClient, QueryClientProvider } from "react-query";
import React, { StrictMode, Suspense, useEffect, useState } from "react";
import { styles } from "./styles/global";
const tamaguiConfig = createTamagui(config);
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";
import { ToastProvider, ToastViewport } from "@tamagui/toast";
import { InfoToast } from "./components/toast";

import { SQLiteProvider } from "expo-sqlite";

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
	const [dbInitDone, setDbInitDone] = useState(false);
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

	return (
		<StrictMode>
			<QueryClientProvider client={qc}>
				<TamaguiProvider config={tamaguiConfig}>
					<Suspense fallback={<></>}>
						<SQLiteProvider databaseName="fuel-log.db" onInit={initDatabase} useSuspense>
							<PortalProvider>
								<ToastProvider burntOptions={{ from: "bottom" }}>
									<StatusBar backgroundColor={styles.primary.backgroundColor} barStyle="light-content" />
									<AppNavigator />
									<ToastViewport bottom={10} />
									<InfoToast />
								</ToastProvider>
							</PortalProvider>
						</SQLiteProvider>
					</Suspense>
				</TamaguiProvider>
			</QueryClientProvider>
		</StrictMode>
	);
}
