import { useState } from "react";
import { setUserRole } from "../api/setUserRole";

export const useSetUserRole = () => {
  const [data, setData] = useState<any>(null);
  const [setRoleError, setSetRoleError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSetUserRole = async (role: "student" | "tutor" | "parent") => {
    setIsLoading(true);
    setSetRoleError(null);
    try {
      const result = await setUserRole(role);
      setData(result);
      return result;
    } catch (error: any) {
      setSetRoleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSetUserRole, data, setRoleError, isLoading };
};
