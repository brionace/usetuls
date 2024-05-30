import { createClient } from "@/utils/supabase/server";

export default async function getTags({
  isPublished,
  id,
}: {
  isPublished?: boolean;
  id?: number | string[];
}) {
  const supabase = await createClient();
  let query = supabase
    .from("tags")
    .select(`id, name, slug`)
    .eq("is_published", isPublished !== undefined ? isPublished : true);

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
