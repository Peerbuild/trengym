import Button from "@/components/Button";
import ScreenContainer from "@/components/ScreenContainer";
import Text from "@/components/Text";
import { useApiClient } from "@/providers/ApiClientProvider";
import { IconTriangleFilled } from "@tabler/icons-react-native";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Animated, LayoutChangeEvent, View } from "react-native";

const Items = [...Array(200 - 100).keys()].map((index) => index + 100);
const itemWidth = 80;

export default function WeightPage(): React.JSX.Element {
  const [flatListWidth, setFlatListWidth] = useState(0);
  const [weight, setWeight] = useState(Items[0] || 100);
  const apiClient = useApiClient();

  const itemSpacing = (flatListWidth - itemWidth) / 2;
  const scrollX = useRef(new Animated.Value(0)).current;

  const mutation = useMutation({
    mutationFn: async () => {
      return await apiClient.user.updateSelf({
        weight,
      });
    },
    onSuccess: () => {
      router.push("/onboarding/height");
    },
  });

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setFlatListWidth(width);
  };

  return (
    <ScreenContainer className="justify-between">
      <View className="gap-2">
        <Text className="text-2xl">State your weight</Text>
        <Text className="text-base text-muted-foreground">
          This info lets us customize your workout routines
        </Text>
      </View>
      <View className="gap-6">
        <Text className="text-center text-xl font-bold">Lbs</Text>
        <Animated.FlatList
          data={Items}
          horizontal
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true },
          )}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / itemWidth);
            setWeight(Items[index] || 100);
          }}
          showsHorizontalScrollIndicator={false}
          snapToInterval={itemWidth}
          contentContainerStyle={{
            paddingHorizontal: itemSpacing,
          }}
          decelerationRate={"fast"}
          onLayout={handleLayout}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 2) * itemWidth,
              (index - 1) * itemWidth,
              index * itemWidth,
              (index + 1) * itemWidth,
              (index + 2) * itemWidth,
            ];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.2, 0.4, 1, 0.4, 0.2],
              extrapolate: "clamp",
            });
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.6, 1, 1.4, 1, 0.6],
              extrapolate: "clamp",
            });

            return (
              <Animated.Text
                style={{
                  width: itemWidth,
                  opacity,
                  transform: [{ scale }],
                  transformOrigin: "center",
                }}
                className="items-center justify-center text-center text-2xl text-foreground"
              >
                {item}
              </Animated.Text>
            );
          }}
        />
        <View className="items-center">
          <IconTriangleFilled fill={"#0076F9"} />
        </View>
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
