import { createClient } from "@/utils/supabase/server";

export default async function getPricing({ slug }: { slug?: string }) {
  const supabase = createClient();
  let query = supabase
    .from("pricing")
    .select(`id, name, slug`)
    .eq("is_published", true);

  if (slug) {
    query = query.eq("slug", slug);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}
