import { useAuthStore } from "@/src/store/AuthStore";
import { Redirect } from "expo-router";
import { ReactNode } from "react";

type AuthGuardProps = {
  children: ReactNode;
};

export const GuestOnlyGuard = ({ children }: AuthGuardProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect href="/(app)/dashboard" />;
  }

  return <>{children}</>;
};
