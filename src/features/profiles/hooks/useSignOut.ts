import {useState} from "react";
import {signOut} from "@/src/features/profiles/api/signOut";
import {useAuthStore} from "@/src/features/auth/store/AuthStore";


export const useSignOut = () => {
    const [signOutError, setSignOutError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const logout = useAuthStore((state) => state.logout);


    const handleSignOut = async () => {
        setIsLoading(true);
        setSignOutError(null);
        try {
            await signOut();
            logout()
            console.log("User signed out");

        } catch (error: any) {
            setSignOutError(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };
    return {handleSignOut, signOutError, isLoading};

};