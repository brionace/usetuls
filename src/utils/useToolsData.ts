import { createClient } from "@/utils/supabase/server";

export default async function useToolsData({
  slug,
  editing,
}: {
  slug?: string;
  editing?: boolean;
}) {
  const supabase = createClient();
  let query = supabase
    .from("tools")
    .select(`id, title, favicon, description, url, category_id, is_published`);

  if (slug) {
    query = query.contains("tags", [slug]);
  }

  if (editing) {
    query = query.eq("is_published", false);
  } else {
    query = query.eq("is_published", true);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}
