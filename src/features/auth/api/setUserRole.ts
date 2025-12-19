import {supabase} from "@/src/utils/supabase";

export const setUserRole = async (role: "student" | "tutor" | "parent") => {
  // Get the currently logged-in user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw authError || new Error("No authenticated user");
  }

  // Update the user's role in the users table
  const { data, error } = await supabase
    .from("users")
    .update({ role })
    .eq("id", user.id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};