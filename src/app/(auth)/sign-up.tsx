import { GuestOnlyGuard } from "@/src/features/auth/components/GuestOnly";
import SignUpScreen from "@/src/features/auth/screens/SignUpScreen";
import React from "react";
import { StyleSheet } from "react-native";

const SignUp = () => {
  return (
    <GuestOnlyGuard>
      <SignUpScreen />
    </GuestOnlyGuard>
  );
};

export default SignUp;
const styles = StyleSheet.create({});
