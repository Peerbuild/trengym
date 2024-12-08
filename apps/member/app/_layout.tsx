import { Stack } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import "react-native-reanimated";
import "./globals.css";
import { Platform, View } from "react-native";
import { Theme } from "@/components/Theme";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ApiClientProvider } from "@/providers/ApiClientProvider";
import { IconChevronLeft, IconChevronsLeft } from "@tabler/icons-react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {
  const queryClient = new QueryClient();
  if (Platform.OS === "android") {
    NavigationBar.setBackgroundColorAsync("#1c1c1e");
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ApiClientProvider>
        <Theme>
          <Stack
            screenOptions={{
              headerLeft: () => {
                return (
                  <View>
                    <IconChevronLeft />
                  </View>
                );
              },
            }}
          >
            <Stack.Screen
              name="index"
              redirect
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="auth/index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </Theme>
      </ApiClientProvider>
    </QueryClientProvider>
  );
}
