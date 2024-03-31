import { createClient } from "@/utils/supabase/server";

export default async function getToolsData({
  categoryId,
  isPublished,
  searchTerm,
  id,
}: {
  categoryId?: number;
  isPublished?: boolean;
  searchTerm?: string;
  id?: number;
}) {
  const supabase = createClient();
  let query = supabase
    .from("tools")
    .select(`id, title, favicon, description, url`)
    .eq("is_published", isPublished !== undefined ? isPublished : true);

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  if (searchTerm) {
    query = query.or(
      `title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`
    );
  }

  if (id) {
    query = query.eq("id", id);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}
