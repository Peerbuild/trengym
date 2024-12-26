import Text from "@/components/Text";
import { View } from "react-native";
import WheelPicker from "@quidone/react-native-wheel-picker";
import Button from "@/components/Button";
import { useState } from "react";
import { cn } from "@trengym/ui/lib/utils";
import { useApiClient } from "@/providers/ApiClientProvider";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import ScreenContainer from "@/components/ScreenContainer";

const data = [...Array(100 - 15).keys()].map((index) => ({
  value: index + 15,
  label: (index + 15).toString(),
}));

export default function AgePage(): React.JSX.Element {
  const [age, setAge] = useState(0);
  const apiClient = useApiClient();

  const mutation = useMutation({
    mutationFn: async () => {
      return await apiClient.user.updateSelf({
        age,
      });
    },
    onSuccess: () => {
      router.push("/onboarding/weight");
    },
  });

  return (
    <ScreenContainer>
      <View className="gap-2">
        <Text className="text-2xl">Specify Age</Text>
        <Text className="text-base text-muted-foreground">
          This info lets us customize your workout routines
        </Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <WheelPicker
          value={age}
          width={100}
          onValueChanging={({ item }) => {
            setAge(item.value);
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
