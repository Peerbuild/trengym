import Text from "@/components/Text";
import { router } from "expo-router";
import { View } from "react-native";
import { RadioGroup, RadioItem } from "@/components/Radio";
import Button from "@/components/Button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "@/providers/ApiClientProvider";
import { Gender, UpdateSelfRequest } from "@trengym/api-client";
import z from "zod";
import ScreenContainer from "@/components/ScreenContainer";

const genderSchema = z.nativeEnum(Gender);

export default function GenderPage(): React.JSX.Element {
  const [gender, setGender] = useState<string | undefined>();
  const apiClient = useApiClient();

  const mutation = useMutation({
    mutationFn: async (data: UpdateSelfRequest) => {
      return await apiClient.user.updateSelf(data);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      router.push("/onboarding/age");
    },
  });

  const onSubmit = () => {
    const { success, data } = genderSchema.safeParse(gender);
    if (!success) {
      return;
    }

    mutation.mutate({
      gender: data,
    });
  };

  return (
    <ScreenContainer>
      <View className="gap-2">
        <Text className="text-2xl">Identify your gender</Text>
        <Text className="text-base text-muted-foreground">
          This info lets us customize your workout routines
        </Text>
      </View>
      <RadioGroup
        className="flex-1 justify-center gap-5"
        onValueChange={setGender}
      >
        <RadioItem value="MALE" className="rounded-lg bg-secondary p-5">
          <View className="flex-1 flex-row items-center justify-between">
            <View>
              <Text>Male</Text>
            </View>
          </View>
        </RadioItem>
        <RadioItem value="FEMALE" className="rounded-lg bg-secondary p-5">
          <View className="flex-1 flex-row items-center justify-between">
            <View>
              <Text>Female</Text>
            </View>
          </View>
        </RadioItem>
        <RadioItem value="OTHER" className="rounded-lg bg-secondary p-5">
          <View className="flex-1 flex-row items-center justify-between">
            <View>
              <Text>Prefer not to say</Text>
            </View>
          </View>
        </RadioItem>
      </RadioGroup>
      <View>
        <Button isLoading={mutation.isPending} onPress={onSubmit}>
          Continue
        </Button>
      </View>
    </ScreenContainer>
  );
}
