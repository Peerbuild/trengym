import Text from "@/components/Text";
import WheelPicker from "@quidone/react-native-wheel-picker";
import { cn } from "@trengym/ui/lib/utils";
import { View } from "react-native";
import React, { useState } from "react";
import Button from "@/components/Button";
import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "@/providers/ApiClientProvider";
import { router } from "expo-router";
import ScreenContainer from "@/components/ScreenContainer";

const data = [...Array(100).keys()].map((index) => ({
  value: index + 120,
  label: (index + 120).toString(),
}));

export default function HeightPage(): React.JSX.Element {
  const apiClient = useApiClient();
  const [height, setHeight] = useState(0);

  const mutation = useMutation({
    mutationFn: async () => {
      return await apiClient.user.updateSelf({
        height,
      });
    },
    onSuccess: () => {
      router.push("/onboarding/success");
    },
  });

  return (
    <ScreenContainer>
      <View className="gap-2">
        <Text className="text-2xl">Specify Height</Text>
        <Text className="text-base text-muted-foreground">
          This info lets us customize your workout routines
        </Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <WheelPicker
          value={height}
          width={80}
          onValueChanging={({ item }) => {
            setHeight(item.value);
          }}
          data={data}
          itemHeight={65}
          itemTextStyle={{
            color: "black",
          }}
          visibleItemCount={7}
          renderItem={({ item }) => {
            return (
              <View className="h-full items-center justify-center">
                <Text className={cn("text-center text-2xl")}>{item.value}</Text>
              </View>
            );
          }}
          renderOverlay={({ itemHeight }) => {
            return (
              <View
                className="absolute w-full items-center justify-center"
                style={{ height: itemHeight }}
              >
                <View className="h-full self-stretch border-y-[4px] border-primary" />
                <Text className="absolute left-full ml-2 text-2xl text-primary">
                  Cm
                </Text>
              </View>
            );
          }}
        />
      </View>
      <View>
        <Button
          isLoading={mutation.isPending}
          onPress={() => {
            mutation.mutate();
          }}
        >
          Continue
        </Button>
      </View>
    </ScreenContainer>
  );
}
