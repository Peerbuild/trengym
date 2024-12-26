import ScreenContainer from "@/components/ScreenContainer";
import Text from "@/components/Text";
import { Redirect } from "expo-router";

export default function HomeTabPage(): React.JSX.Element {
  return <Redirect href={"/auth"} />;
  return (
    <ScreenContainer>
      <Text>Account Screen </Text>
    </ScreenContainer>
  );
}
