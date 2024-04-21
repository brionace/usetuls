import { createClient } from "@/utils/supabase/server";

type Props = {
  isPublished?: boolean;
  id?: number;
  slug?: string;
  hasTools?: boolean;
  searchTerm?: string;
};

export default async function getCategories({
  isPublished = true,
  id,
  slug,
  hasTools,
  searchTerm,
}: Props) {
  const supabase = await createClient();
  let query = supabase
    .from("categories")
    .select(
      `id, name, description, slug${hasTools ? `, tools(category_id)` : ``}`
    )
    .eq("is_published", isPublished !== undefined ? isPublished : true);

  if (id !== undefined) {
    query = query.eq("id", id);
  }

  if (slug) {
    query = query.eq("slug", slug);
  }

  if (searchTerm) {
    // query = query.or(
    //   `name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`
    // );
    // query = query.textSearch("name", searchTerm);
    query = query.or(`name.ilike.%${searchTerm}%`);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  if (hasTools) {
    const categoriesWithTools = data.filter(
      (category: any) => category.tools.length > 0
    );
    return categoriesWithTools;
  }

  return data;
}