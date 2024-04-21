import { createClient } from "@/utils/supabase/server";

export default async function getTools({
  categoryId,
  isPublished,
  searchTerm,
  id,
  slug,
}: {
  categoryId?: number;
  isPublished?: boolean;
  searchTerm?: string;
  id?: number | [number];
  slug?: string;
}) {
  const supabase = await createClient();
  let query = supabase
    .from("tools")
    .select(`id, title, favicon, description, url, slug, tags`)
    .eq("is_published", isPublished !== undefined ? isPublished : true);

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  if (searchTerm) {
    // query = query.or(
    //   `title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`
    // );
    // query = query.or(`title.ilike.%${searchTerm}%`);
    const { data: tagData, error: tagError } = await supabase
      .from("tags")
      .select("id")
      .ilike("name", `%${searchTerm}%`);

    if (tagError) {
      console.error(tagError);
      return;
    }

    const tagId = `{"${tagData[0].id}"}`;
    console.log(tagId);

    query = query.or(`title.ilike.%${searchTerm}%, tags.cs.${tagId}`);
  }

  if (id) {
    if (typeof id === "number") {
      query = query.eq("id", id);
    }
    if (Array.isArray(id)) {
      query = query.in("id", id);
    }
  }

  if (slug) {
    // query = query.ilike("title", `%${name}%`);
    query = query.eq("slug", slug);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}
