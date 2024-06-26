import { createClient } from "@/utils/supabase/server";

export default async function getTags({
  id,
}: {
  id?: number | string[];
}) {
  const supabase = createClient();
  let query = supabase
    .from("tags")
    .select(`id, name, slug`)
    .eq("is_published", true);

  if (typeof id === "number") {
    query = query.eq("id", id);
  }

  if (Array.isArray(id)) {
    query = query.in("id", id);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}
