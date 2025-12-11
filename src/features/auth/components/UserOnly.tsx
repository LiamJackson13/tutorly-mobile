import { useAuthStore } from "@/src/store/AuthStore";
import { Redirect } from "expo-router";
import { ReactNode } from "react";

type AuthGuardProps = {
  children: ReactNode;
};

export const UserOnlyGuard = ({ children }: AuthGuardProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return <>{children}</>;
};
