import React from "react";
import { Theme } from "@/components/Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Button from "@/components/Button";
import Text from "@/components/Text";
import Input from "@/components/Input";

const BgImage = require("../../assets/images/onboarding.png");

const index = () => {
  return (
    <Theme>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "position" : undefined}
      >
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
            <Text className="text-xl">First Steps.</Text>
            <Text className="text-lg text-muted-foreground">
              TRLS Network is an exclusive, private platform accessible only to
              approved applicants.
            </Text>
          </View>
          <View className="gap-5 pb-8">
            <View className="gap-2">
              <Text className="text-xs">Email</Text>
              <Input
                keyboardType="email-address"
                placeholder="georgetrains@gmail.com"
              />
            </View>
            <View className="gap-2">
              <Text className="text-xs">Phone Number</Text>
              <Input keyboardType="phone-pad" placeholder="+44 7975 556677" />
            </View>
          </View>
          <Button>Login</Button>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Theme>
  );
};

export default index;
