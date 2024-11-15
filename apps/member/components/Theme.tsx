import { themes } from "@trengym/ui/mobile.ts";
import { useColorScheme } from "nativewind";
import { View } from "react-native";

export const Theme = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  setColorScheme("system");
  return (
    <View
      style={themes[colorScheme ?? "light"]}
      className="flex-1 bg-background"
    >
      {children}
    </View>
  );
};
