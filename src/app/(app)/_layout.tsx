import { Tabs } from "expo-router";

export default function AppLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="dashboard/index"
        options={{ tabBarLabel: "Dashboard" }}
      />
      <Tabs.Screen name="profile/index" options={{ tabBarLabel: "Profile" }} />
    </Tabs>
  );
}
