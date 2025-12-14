import {supabase} from "@/src/utils/supabase";

export const signOut = async () => {
    const {error} = await supabase.auth.signOut();
    // console.log("User signed out");
    if (error) {
        console.log("Error signing out:");
        throw error;
    }
};