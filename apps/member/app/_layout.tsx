import { Stack } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import "react-native-reanimated";
import "./globals.css";
import { Platform } from "react-native";
import { Theme } from "@/components/Theme";

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {
  if (Platform.OS === "android") {
    NavigationBar.setBackgroundColorAsync("#1c1c1e");
  }

  return (
    <Theme>
      <Stack screenOptions={{}}>
        <Stack.Screen name="index" redirect options={{ headerShown: false }} />
        <Stack.Screen
          name="onboarding/index"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </Theme>
  );
}
