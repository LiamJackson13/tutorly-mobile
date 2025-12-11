import { UserOnlyGuard } from "@/src/features/auth/components/UserOnly";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const TabsLayout = () => {
  return (
    <UserOnlyGuard>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="dashboard" />
        <Tabs.Screen name="profile" />
      </Tabs>
    </UserOnlyGuard>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
