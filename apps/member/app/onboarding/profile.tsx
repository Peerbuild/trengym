import Button from "@/components/Button";
import { Form, FormField } from "@/components/Form";
import Input from "@/components/Input";
import Text from "@/components/Text";
import { Theme } from "@/components/Theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { launchImageLibraryAsync } from "expo-image-picker";
import { useForm } from "react-hook-form";
import { Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import z from "zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { UpdateSelfRequest } from "@trengym/api-client";
import { useApiClient } from "@/providers/ApiClientProvider";

const profileFormSchema = z.object({
  name: z.string().min(3),
});

type ProfileParams = {
  name: string;
  email: string;
  phone: string;
};

export default function OnboardingProfilePage(): React.JSX.Element {
  const apiClient = useApiClient();
  const { name, email, phone } = useLocalSearchParams<ProfileParams>();
  const [image, setImage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: UpdateSelfRequest) =>
      await apiClient.user.updateSelf(data),
    onSuccess: () => {
      router.push("/onboarding/gender");
    },
  });

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "William Barns",
    },
  });

  const pickImage = async () => {
    const result = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0]?.uri;
      uri && setImage(uri);
    }
  };

  const onSubmit = (data: z.infer<typeof profileFormSchema>) => {
    mutation.mutate(data);
  };

  return (
    <Theme>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SafeAreaView className="flex-1 px-6 pt-6">
        <View className="flex-1 gap-16">
          <View className="gap-2">
            <Text className="text-2xl">Create a Profile</Text>
            <Text className="text-md text-muted-foreground">
              Lets curate a profile for you
            </Text>
          </View>
          <Pressable
            onPress={pickImage}
            className="size-28 items-center justify-center self-center overflow-hidden rounded-full bg-muted"
          >
            {image ? (
              <Image
                source={{ uri: image }}
                className="h-full w-full object-cover"
                width={100}
                height={100}
              />
            ) : (
              <Text className="text-2xl font-extrabold text-muted-foreground">
                {form.getValues("name")[0]}
              </Text>
            )}
          </Pressable>
          <View className="gap-5">
            <Form {...form}>
              <FormField
                name="name"
                render={({ field }) => {
                  return (
                    <View className="gap-2">
                      <Text className="text-xs">Full Name</Text>
                      <Input
                        placeholder="William Barns"
                        value={field.value}
                        onChangeText={field.onChange}
                      />
                    </View>
                  );
                }}
              />
              <View className="gap-2">
                <Text className="text-xs">Email</Text>
                <Input
                  className="text-muted-foreground"
                  editable={false}
                  value={email}
                />
              </View>
              <View className="gap-2">
                <Text className="text-xs">Phone Number</Text>
                <Input
                  className="text-muted-foreground"
                  editable={false}
                  value={phone}
                />
              </View>
            </Form>
          </View>
        </View>
        <Button
          isLoading={mutation.isPending}
          onPress={form.handleSubmit(onSubmit)}
        >
          Continue
        </Button>
      </SafeAreaView>
    </Theme>
  );
}
