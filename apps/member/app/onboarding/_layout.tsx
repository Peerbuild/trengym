import { IconChevronLeft } from "@tabler/icons-react-native";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function OnboardingLayout(): React.JSX.Element {
  return (
    <Stack
      screenOptions={{
        headerTitle: "",
        headerLeft: () => {
          return (
            <Pressable onPress={() => router.dismiss(1)}>
              <IconChevronLeft color={"#fff"} />
            </Pressable>
          );
        },
      }}
    >
      <Stack.Screen name="success" />
    </Stack>
  );
}
