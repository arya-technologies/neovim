import { useAppTheme } from "@/components/providers/Material3ThemeProvider";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";

export default function index() {
  const { colors } = useAppTheme();

  return (
    <View
      className="h-full flex-1 items-center justify-center"
      style={{ backgroundColor: colors.surface }}
    >
      <Text className="text-center font-bold text-2xl">Namaste World!</Text>
      <IconButton icon="settings" onPress={() => router.navigate("settings")} />
    </View>
  );
}
