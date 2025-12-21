import { useAuthStore } from "@/src/features/auth/store/AuthStore";
import { useState } from "react";
import { createParent } from "../api/createParent";
import { createStudent } from "../api/createStudent";
import { createTutor } from "../api/createTutor";
import { setUserRole } from "../api/setUserRole";
import { signUp } from "../api/signUp";
import { setUserName } from "@/src/features/auth/api/setUserName";

export const useSignUp = () => {
  const [data, setData] = useState<any>(null);
  const [signUpError, setSignUpError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const loginUser = useAuthStore((state) => state.login);

  const handleSignUp = async (
    email: string,
    password: string,
    role: "student" | "tutor" | "parent",
    first_name: string,
    last_name: string,
  ) => {
    setIsLoading(true);
    setSignUpError(null);
    try {
      const result = await signUp(email, password);

      if (!result.user) {
        throw new Error("Sign Up failed - no user returned");
      }

      await setUserRole(role);
      await setUserName(first_name, last_name);
      if (role === "student") {
        await createStudent();
      } else if (role === "tutor") {
        await createTutor();
      } else if (role === "parent") {
        await createParent();
      }

      loginUser({
        id: result.user.id,
        email: email,
        role: role,
        first_name: first_name,
        last_name: last_name,
      });

      setData(result);
      return result;
    } catch (error: any) {
      setSignUpError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSignUp, data, signUpError, isLoading };
};
