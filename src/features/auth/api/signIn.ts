import {supabase} from "@/src/utils/supabase";

export const signIn = async (email: string, password: string) => {
    const {data, error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        throw error;
    }
    console.log('🔑 Access Token:', data.session?.access_token);
    return data;
};