import { createClient } from "@/utils/supabase/server";

type Props = {
  isPublished?: boolean;
  id?: number;
  slug?: string;
};

export default async function getCategoriesData({
  isPublished = true,
  id,
  slug,
}: Props) {
  const supabase = createClient();
  let query = supabase.from("categories").select(`id, name, description, slug`);

  query = query.eq("is_published", isPublished  ? true : false);

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

  return data;
}
