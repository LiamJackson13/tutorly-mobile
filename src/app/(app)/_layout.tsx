import { UserOnlyGuard } from "@/src/features/auth/components/UserOnly";
import { Tabs } from "expo-router";

export default function AppLayout() {
  return (
    <UserOnlyGuard>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="dashboard/index"
          options={{ tabBarLabel: "Dashboard" }}
        />
        <Tabs.Screen
          name="profile/index"
          options={{ tabBarLabel: "Profile" }}
        />
      </Tabs>
    </UserOnlyGuard>
  );
}
