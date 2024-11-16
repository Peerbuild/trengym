import Text from "@/components/Text";
import { Theme } from "@/components/Theme";
import { Link } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";

const HomeScreen = () => {
  return (
    <Theme>
      <View className="flex-1 justify-start gap-2 px-10 pt-60">
        <Text className="text-xl">TrenGym</Text>
        <Text className="text-base">
          An app brought you by <Text className="font-bold">Peerbuild</Text>
        </Text>
        <Link href="/onboarding" asChild>
          <Pressable className="mt-4 w-full rounded-lg bg-blue-800 p-4 text-blue-300">
            <Text className="text-center">Go To Onboarding</Text>
          </Pressable>
        </Link>
      </View>
    </Theme>
  );
};

export default HomeScreen;
