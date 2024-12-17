import ScreenContainer from "@/components/ScreenContainer";
import Text from "@/components/Text";
import { IconObjectScan, IconWifi } from "@tabler/icons-react-native";
import { Image, ScrollView, View } from "react-native";

const TrailerHubImage = require("../../assets/images/trainerHub.png");

const HomeTabHeader = () => {
  return (
    <View className="flex-row items-center justify-between px-6">
      <View className="flex-row items-center gap-4">
        <View className="size-14 items-center justify-center rounded-full bg-muted">
          <Text className="text-lg">P</Text>
        </View>
        <View>
          <Text className="text-xs text-muted-foreground">Welcome</Text>
          <Text className="">Priyobroto Kar</Text>
        </View>
      </View>
      <View className="flex-row gap-4">
        <View className="size-10 items-center justify-center rounded-full bg-secondary">
          <IconObjectScan color={"#fff"} size={18} />
        </View>
        <View className="size-10 items-center justify-center rounded-full bg-primary">
          <IconWifi color={"#fff"} size={18} />
        </View>
      </View>
    </View>
  );
};

const features = [
  {
    title: "Trainer Hub",
    description: "Expert tailored diet and workout plan",
    image: TrailerHubImage,
  },
  {
    title: "Trainer Hub",
    description: "Expert tailored diet and workout plan",
    image: TrailerHubImage,
  },
  {
    title: "Trainer Hub",
    description: "Expert tailored diet and workout plan",
    image: TrailerHubImage,
  },
];

const FeaturedSection = () => {
  return (
    <View className="gap-4">
      <Text className="px-6 text-lg font-medium">Featured</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-4 px-6"
      >
        {features.map((feature, index) => {
          return (
            <View
              key={index}
              className="h-52 w-80 justify-end overflow-hidden rounded-[12px]"
            >
              <Image
                source={feature.image}
                width={100}
                height={100}
                className="absolute -z-10 h-full w-full object-cover"
              />
              <View className="p-4">
                <Text className="text-xl">{feature.title}</Text>
                <Text className="text-xs">{feature.description}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default function HomeTabPage(): React.JSX.Element {
  return (
    <ScreenContainer headerShown={false} className="gap-12 px-0">
      <HomeTabHeader />
      <FeaturedSection />
    </ScreenContainer>
  );
}
