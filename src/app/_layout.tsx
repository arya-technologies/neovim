import { Material3ThemeProvider } from "@/components/providers/Material3ThemeProvider";
import { persistor, store } from "@/features/store";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router/stack";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function Layout() {
  useEffect(() => {
    NavigationBar.setPositionAsync("absolute");
    NavigationBar.setBackgroundColorAsync("#00000000");
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <Material3ThemeProvider
          settings={{
            icon: (props: any) => <Ionicons {...props} />,
          }}
        >
          <Stack
            screenOptions={{
              animation: "default",
              headerShown: false,
            }}
            initialRouteName="/"
          />
        </Material3ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
