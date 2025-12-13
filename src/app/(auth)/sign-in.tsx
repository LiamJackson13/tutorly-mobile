import {GuestOnlyGuard} from "@/src/features/auth/components/GuestOnly";
import SignInScreen from "@/src/features/auth/screens/SignInScreen";
import React from "react";

const SignIn = () => {
    return (
        <GuestOnlyGuard>
            <SignInScreen/>
        </GuestOnlyGuard>
    );
};

export default SignIn;

