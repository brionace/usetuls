import { createClient } from "@/utils/supabase/server";

export default async function useData({ slug }: { slug?: string }) {
  const supabase = createClient();
  let query = supabase.from("tools").select(`id, name, icon, description, url`);

  if (slug) {
    query = query.contains("tags", [slug]);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}
