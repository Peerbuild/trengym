import React from "react";
import { Theme } from "@/components/Theme";
import Text from "@/components/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, View } from "react-native";
import RadioItem from "@/components/Radio";
import { LinearGradient } from "expo-linear-gradient";
import Button from "@/components/Button";

const BgImage = require("../../assets/images/onboarding.png");

const Subscribe = () => {
  return (
    <Theme>
      <View className="h-[30rem]">
        <LinearGradient
          colors={["transparent", "#1c1c1e"]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100%",
          }}
        />
        <Image
          source={BgImage}
          width={100}
          height={100}
          className="-z-10 h-full w-full object-cover"
        />
      </View>
      <SafeAreaView className="mt-auto gap-16 px-6">
        <View className="gap-8">
          <Text className="text-2xl">Exclusive Access to Elite Fitness</Text>
          <Text className="text-muted-foreground">
            Select a plan to get access to the gym and private coaching
            sessions.
          </Text>
        </View>
        <View className="gap-5">
          <RadioItem className="rounded-lg bg-secondary p-4">
            <View className="flex-1 flex-row items-center justify-between">
              <View>
                <Text className="text-lg">Monthly</Text>
                <Text className="text-muted-foreground">
                  Pay monthly, cancel anytime
                </Text>
              </View>
              <View className="h-fit w-fit flex-row">
                <Text>$</Text>
                <Text className="text-xl">18</Text>
                <Text className="self-end">/m</Text>
              </View>
            </View>
          </RadioItem>
          <RadioItem className="rounded-lg bg-secondary p-4">
            <View className="flex-1 flex-row items-center justify-between">
              <View>
                <Text className="text-lg">Yearly</Text>
                <Text className="text-muted-foreground">
                  Pay for an year advance
                </Text>
              </View>
              <View className="h-fit w-fit flex-row">
                <Text>$</Text>
                <Text className="text-xl">10</Text>
                <Text className="self-end">/m</Text>
              </View>
            </View>
          </RadioItem>
          <Text className="text-center text-muted-foreground">
            Got reffered? Enjoy a week for free
          </Text>
        </View>
        <Button>Subscribe</Button>
      </SafeAreaView>
    </Theme>
  );
};

export default Subscribe;
