import { themes } from "@trengym/ui/mobile.ts";
import { useColorScheme } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";

export const Theme = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  setColorScheme("system");
  return (
    <SafeAreaView
      style={themes[colorScheme ?? "light"]}
      className="flex-1 bg-background"
    >
      {children}
    </SafeAreaView>
  );
};
