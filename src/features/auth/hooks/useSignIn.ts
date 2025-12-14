import {useAuthStore} from "@/src/features/auth/store/AuthStore";
import {useState} from "react";
import {getUserRole} from "../api/getUserRole";
import {signIn} from "../api/signIn";

export const useSignIn = () => {
  const [data, setData] = useState<any>(null);
  const [signInError, setSignInError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const loginUser = useAuthStore((state) => state.login);

  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    setSignInError(null);
    try {
      const result = await signIn(email, password);
      console.log("Signin success");
      setData(result);

      // Get the user's role from the database
      const userRole = await getUserRole();

      loginUser({ id: result.user.id, email: email, role: userRole.role });
      return result;
    } catch (error: any) {
      setSignInError(error);
      console.log(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSignIn, data, signInError, isLoading };
};