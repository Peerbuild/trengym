import Text from "@/components/Text";
import { Theme } from "@/components/Theme";
import React from "react";
import { View } from "react-native";

const HomeScreen = () => {
  return (
    <Theme>
      <View className="flex-1 justify-start gap-2 px-10 pt-60">
        <Text className="text-xl">Admin</Text>
        <Text className="text-3xl">TrenGym</Text>
        <Text className="text-lg">
          An app brought you by <Text className="font-bold">Peerbuild</Text>
        </Text>
      </View>
    </Theme>
  );
};

export default HomeScreen;
