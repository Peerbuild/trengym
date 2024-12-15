import { Theme } from "./Theme";
import { cn } from "@trengym/ui/lib/utils";
import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScreenContainer({
  children,
  className,
  headerShown = true,
  fullscreen = false,
}: {
  children: React.ReactNode;
  className?: string;
  headerShown?: boolean;
  fullscreen?: boolean;
}): React.JSX.Element {
  return (
    <Theme>
      {headerShown && !fullscreen && (
        <Stack.Screen
          options={{
            headerBackground: () => {
              return <View className="flex-1 bg-background" />;
            },
          }}
        />
      )}
      <SafeAreaView
        edges={
          headerShown || fullscreen
            ? ["left", "right", "bottom"]
            : ["top", "left", "right", "bottom"]
        }
        className={cn(
          "flex-1 bg-background px-6 pt-6",
          fullscreen && "pt-0",
          className,
        )}
      >
        {children}
      </SafeAreaView>
    </Theme>
  );
}
