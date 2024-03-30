import { createClient } from "@/utils/supabase/server";

export default async function getTagsData({
  isPublished,
}: {
  isPublished?: boolean;
}) {
  const supabase = createClient();
  let query = supabase
    .from("tags")
    .select(`id, name, slug`)
    .eq("is_published", isPublished !== undefined ? isPublished : true);

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}
