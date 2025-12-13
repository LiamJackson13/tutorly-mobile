import React from "react";
import { Text, View } from "react-native";
import {useAuthStore} from "@/src/store/AuthStore";

export function ParentProfileScreen() {
    const user = useAuthStore((state) => state.user);

    return (
    <View>
      <Text>{user!.email}</Text>
        <Text>{user!.role}</Text>
    </View>
  );
}

