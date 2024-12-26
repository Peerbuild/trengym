import { Stack } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import "react-native-reanimated";
import "./globals.css";
import { Platform } from "react-native";
import { Theme } from "@/components/Theme";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ApiClientProvider } from "@/providers/ApiClientProvider";
import AuthProvider from "@/providers/AuthProvider";

export default function RootLayout() {
  const queryClient = new QueryClient();
  if (Platform.OS === "android") {
    NavigationBar.setBackgroundColorAsync("#1c1c1e");
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ApiClientProvider>
          <Theme>
            <Stack>
              <Stack.Screen
                name="auth/index"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="+not-found" />
              <Stack.Screen
                name="onboarding"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                }}
              />
            </Stack>
          </Theme>
        </ApiClientProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
