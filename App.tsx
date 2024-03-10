import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import '@tamagui/core/reset.css'
import { TamaguiProvider, createTamagui } from '@tamagui/core'
import { config } from '@tamagui/config/v3'
import {AppNavigator} from "./StackNavigator";
import {init_db, truncate} from "./db/init_db";
import * as SQLite from 'expo-sqlite';
import {PortalProvider} from "tamagui";
import * as Font from 'expo-font';
import AppLoading from "expo-app-loading";
import {QueryClient, QueryClientProvider} from "react-query";
import {useState} from "react";
const tamaguiConfig = createTamagui(config)

type Conf = typeof tamaguiConfig
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}
const fetchFonts = () => {
    return Font.loadAsync({
        'TypeWriter': require('./assets/fonts/JMH Typewriter.ttf'),
        'Inter': require('./assets/fonts/JMH Typewriter.ttf'),
        'InterBold': require('./assets/fonts/JMH Typewriter-Bold.ttf'),
    });
};

let qc = new QueryClient();

export default function App() {

    const [fontLoaded, setFontLoaded] = useState(false);

    if (!fontLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setFontLoaded(true)}
                onError={console.warn}
            />
        );
    }
    
  init_db().then(()=>  {
      console.log("Database initialized successfully!")
  }).catch((err)=>console.log('Error: ' + err.message));
  
  return (
        <QueryClientProvider client={qc}>
            <TamaguiProvider config={tamaguiConfig}>
                <PortalProvider>
                    <StatusBar style="auto"/>
                    <AppNavigator/>
                </PortalProvider>
            </TamaguiProvider>
        </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
