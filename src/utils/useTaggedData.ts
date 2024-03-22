import { createClient } from "@/utils/supabase/server";

export default async function useTaggedData(toolsId?: number) {
  const supabase = createClient();
  let query = supabase.from("tagged").select(`tools_id, tag_id`);

  if (toolsId) {
    query = query.eq("tools_id", toolsId);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}
