import React from "react";
import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import * as SplashScreen from "expo-splash-screen";
import { Colors } from "@config";
import { toastConfig } from "@config";
import NavigationStack from "@navigation/NavigationStack";
import { secureStorage, storage } from "@utils";
import AuthProviders from "@context/providers/AuthProviders";

const theme = {
  ...DefaultTheme,
  colors: Colors.colors,
  mode: "exact",
};

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = React.useState(false);
  const [token, setToken] = React.useState(null);
  const [me, setMe] = React.useState(null);

  React.useEffect(() => {
    async function ready() {
      try {
        // Bootstrapping process
        const tk = await secureStorage.getItem("_token");
        const meData = await storage.getItem("_me");
        setToken(tk);
        setMe(meData);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    ready();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <AuthProviders value={{ token, setToken, me, setMe }}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider onLayout={onLayoutRootView}>
          <NavigationStack />
          <Toast position="top" autoHide={false} config={toastConfig} />
        </SafeAreaProvider>
      </PaperProvider>
    </AuthProviders>
  );
}
