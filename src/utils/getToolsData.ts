import { createClient } from "@/utils/supabase/server";

export default async function getToolsData({
  categoryId,
  isPublished,
  searchTerm,
}: {
  categoryId?: number;
  isPublished?: boolean;
  searchTerm?: string;
}) {
  const supabase = createClient();
  let query = supabase
    .from("tools")
    .select(`id, title, favicon, description, url, category_id, is_published`)
    .eq("is_published", isPublished !== undefined ? isPublished : true);

  if (categoryId) {
    query = query.eq("category_id", categoryId);
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
