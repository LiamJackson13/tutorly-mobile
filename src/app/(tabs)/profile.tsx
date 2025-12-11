import { ProfileScreen } from "@/src/features/profiles/screens";
import { useAuthStore } from "@/src/store/AuthStore";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
  const logoutUser = useAuthStore((state) => state.logout);

  return (
    <>
      <ProfileScreen />

        <TouchableOpacity onPress={logoutUser} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
  },
});
