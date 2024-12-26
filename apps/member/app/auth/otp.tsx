import Button from "@/components/Button";
import Text from "@/components/Text";
import { Theme } from "@/components/Theme";
import { Stack, useLocalSearchParams } from "expo-router";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OTPInput from "@/components/OtpInput";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { VerifyCodeRequest } from "@trengym/api-client";
import { router } from "expo-router";
import { useApiClient } from "@/providers/ApiClientProvider";
import { useAuth } from "@/providers/AuthProvider";

export default function Otp() {
  const { setSession } = useAuth();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const apiClient = useApiClient();

  const mutation = useMutation({
    mutationFn: async (data: VerifyCodeRequest) => {
      return await apiClient.auth.verifyCode(data);
    },
    onSuccess: (data) => {
      setSession(data);
      router.push({
        pathname: "/onboarding/profile",
        params: {
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone,
        },
      });
    },
  });

  const [otp, setOtp] = useState("");
  return (
    <Theme>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <SafeAreaView className="flex-1 px-6 pt-6">
          <View className="flex-1 gap-16">
            <View className="gap-2">
              <Text className="text-2xl">Verification</Text>
              <Text className="text-base">
                Check your phone for a 4 digit code
              </Text>
            </View>
            <OTPInput length={6} value={otp} onChange={setOtp} />
          </View>
          <Button
            isLoading={mutation.isPending}
            onPress={() => {
              mutation.mutate({ phone, code: otp });
            }}
          >
            Verify
          </Button>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Theme>
  );
}
