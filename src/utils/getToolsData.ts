import { createClient } from "@/utils/supabase/server";

export default async function getToolsData({
  categoryId,
  editing,
  searchTerm,
}: {
  categoryId?: number;
  editing?: boolean;
  searchTerm?: string;
}) {
  const supabase = createClient();
  let query = supabase
    .from("tools")
    .select(`id, title, favicon, description, url, category_id, is_published`);

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  if (editing) {
    query = query.eq("is_published", false);
  } else {
    query = query.eq("is_published", true);
  }

  if (searchTerm) {
    query = query.or(
      `title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}
