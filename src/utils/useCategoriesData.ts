import { createClient } from "@/utils/supabase/server";

export default async function useCategoriesData(isPublished?: boolean) {
  const supabase = createClient();
  let query = supabase.from("categories").select(`id, name, description`);

  if (isPublished) {
    query = query.eq("is_published", isPublished);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}
