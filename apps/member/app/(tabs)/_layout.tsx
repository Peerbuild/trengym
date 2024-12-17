import {
  IconBell,
  IconHome,
  IconRun,
  IconUser,
} from "@tabler/icons-react-native";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          borderRadius: 20,
          position: "absolute",
          paddingTop: 20,
          paddingHorizontal: 10,
          height: 100,
          backgroundColor: "#303032",
          borderTopWidth: 0,
        },
        tabBarInactiveTintColor: "#9B97AA",
        tabBarActiveTintColor: "#fff",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => {
            return <IconHome color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ color }) => {
            return <IconRun color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color }) => {
            return <IconBell color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => {
            return <IconUser color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
