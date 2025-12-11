import { supabase } from "@/src/utils/supabase";

export const createTutor = async () => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw authError || new Error("No authenticated user");
  }

  const { data, error } = await supabase
    .from("tutors")
    .insert({ id: user.id }, )
    .select()
    .single();

  if (error) throw error;
  return data;
};
