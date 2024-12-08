import React from "react";
import { SigninRequest } from "@trengym/api-client";
import { Theme } from "@/components/Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, KeyboardAvoidingView, Platform, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Button from "@/components/Button";
import Text from "@/components/Text";
import Input from "@/components/Input";
import { Form, FormField } from "@/components/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useMutation } from "@tanstack/react-query";
import { Redirect, router, Stack } from "expo-router";
import { useApiClient } from "@/providers/ApiClientProvider";

const BgImage = require("../../assets/images/onboarding.png");

const signinSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10),
});

const SignInPage = () => {
  const apiClient = useApiClient();
  const mutation = useMutation({
    mutationFn: (data: SigninRequest) => {
      return apiClient.auth.signin(data);
    },
    onSuccess: (data: void, variables) => {
      router.push({
        pathname: "/auth/otp",
        params: {
          phone: variables.phone,
        },
      });
    },
  });
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
  });
  const onSubmit = (data: z.infer<typeof signinSchema>) => {
    mutation.mutate(data);
  };

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
            <Text className="text-2xl">Welcome to Citadel</Text>
            <Text className="text-lg text-muted-foreground">
              TRLS Network is an exclusive, private platform accessible only to
              approved applicants.
            </Text>
          </View>
          <Form {...form}>
            <View className="gap-5 pb-8">
              <FormField
                name="email"
                render={({ field }) => {
                  return (
                    <View className="gap-2">
                      <Text className="text-xs">Email</Text>
                      <Input
                        keyboardType="email-address"
                        placeholder="georgetrains@gmail.com"
                        value={field.value}
                        onChangeText={field.onChange}
                      />
                    </View>
                  );
                }}
              />
              <FormField
                name="phone"
                render={({ field }) => {
                  return (
                    <View className="gap-2">
                      <Text className="text-xs">Phone Number</Text>
                      <Input
                        keyboardType="phone-pad"
                        placeholder="+44 7975 556677"
                        value={field.value}
                        onChangeText={field.onChange}
                      />
                    </View>
                  );
                }}
              />
            </View>
          </Form>
          <Button
            isLoading={mutation.isPending}
            // onPressIn={form.handleSubmit(onSubmit)}
            onPressIn={() => {
              router.push("/onboarding/gender");
            }}
          >
            Login
          </Button>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Theme>
  );
};

export default SignInPage;
