import {router} from "expo-router";
import React, {useEffect} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useAuthStore} from "@/src/store/AuthStore";

const HomeScreen = () => {
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    useEffect(() => {
        console.log("=== AUTH STORE ===");
        console.log("User:", user);
        console.log("Is Authenticated:", isAuthenticated);
        console.log("==================");
    }, [user, isAuthenticated]);

    return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
        <Text style={{ color: "blue", fontSize: 16 }}>Go to Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});