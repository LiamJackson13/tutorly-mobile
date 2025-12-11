import { supabase } from "@/src/utils/supabase";

export const getUserRole = async () => {
  // Get the currently logged in user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw authError || new Error("No authenticated user");
  }

  // Query the users table for the user's role
  const { data, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};
