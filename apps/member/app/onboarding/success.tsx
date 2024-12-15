import ScreenContainer from "@/components/ScreenContainer";
import { router, Stack, useFocusEffect, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

export default function SuccessPage(): React.JSX.Element {
  const opacity = useSharedValue(0);
  const router = useRouter();

  useEffect(() => {
    opacity.value = withDelay(
      2500,
      withTiming(1, {
        duration: 500,
      }),
    );
  }, [opacity]);

  useEffect(() => {
    setTimeout(() => {
      router.replace("/auth");
    }, 4000);
  }, [router]);

  return (
    <ScreenContainer fullscreen className="items-center justify-center">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <LottieView
        source={require("../../assets/lottieFiles/success.json")}
        style={{ width: 400, height: 400 }}
        autoPlay
        loop={false}
      />
      <Animated.Text
        className="-translate-y-28 text-base font-semibold text-foreground"
        style={{ opacity }}
      >
        You are all set!
      </Animated.Text>
    </ScreenContainer>
  );
}
