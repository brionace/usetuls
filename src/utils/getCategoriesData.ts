import { createClient } from "@/utils/supabase/server";

type Props = {
  isPublished?: boolean;
  id?: number;
  slug?: string;
  hasTools?: boolean;
};

export default async function getCategoriesData({
  isPublished = true,
  id,
  slug,
  hasTools,
}: Props) {
  const supabase = createClient();
  let query = supabase
    .from("categories")
    .select(`id, name, description, slug${hasTools ? `, tools(*)` : ""}`)
    .eq("is_published", isPublished);

  if (id !== undefined) {
    query = query.eq("id", id);
  }

  if (slug) {
    query = query.eq("slug", slug);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  if (hasTools) {
    const categoriesWithTools = data.filter(
      (category) => category.tools.length > 0
    );
    return categoriesWithTools;
  }

  return data;
}
