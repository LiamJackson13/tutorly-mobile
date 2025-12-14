import {useAuthStore} from "@/src/features/auth/store/AuthStore";
import {Redirect} from "expo-router";
import {ReactNode} from "react";

type AuthGuardProps = {
    children: ReactNode;
};

export const GuestOnlyGuard = ({children}: AuthGuardProps) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const userRole = useAuthStore((state) => state.user?.role);
    if (isAuthenticated) {

        if (userRole === "student") {
            return <Redirect href={"/(students)"}/>;
        } else if (userRole === "tutor") {
            return <Redirect href={"/(tutors)"}/>;
        } else if (userRole === "parent") {
            return <Redirect href="/(parents)"/>;
        }

    }

    return <>{children}</>;
};