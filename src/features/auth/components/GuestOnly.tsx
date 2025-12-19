import { useAuthStore } from "@/src/features/auth/store/AuthStore";
import { Redirect } from "expo-router";
import { ReactNode } from "react";

type AuthGuardProps = {
  children: ReactNode;
};

export const GuestOnlyGuard = ({ children }: AuthGuardProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.user?.role);
  if (isAuthenticated) {
    return <Redirect href="/(app)/dashboard" />;
  }

  return <>{children}</>;
};
