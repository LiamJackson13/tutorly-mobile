import {GuestOnlyGuard} from "@/src/features/auth/components/GuestOnly";
import SignUpScreen from "@/src/features/auth/screens/SignUpScreen";
import React from "react";

const SignUp = () => {
  return (
    <GuestOnlyGuard>
      <SignUpScreen />
    </GuestOnlyGuard>
  );
};

export default SignUp;