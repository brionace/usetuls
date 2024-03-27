import { createClient } from "@/utils/supabase/server";

export default async function getTagsData(isPublished?: boolean) {
  const supabase = createClient();
  let query = supabase.from("tags").select(`id, name, slug`);

  if (isPublished) {
    query = query.eq("is_published", isPublished);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}
