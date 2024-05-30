import { createClient } from "@/utils/supabase/server";

export default async function getTools({
  isPublished,
  searchTerm,
  slug,
  tag,
  tags,
  pinned,
  limit,
}: {
  isPublished?: boolean;
  searchTerm?: string;
  slug?: string;
  tag?: number;
  tags?: number[];
  pinned?: string[];
  limit?: number;
}) {
  const supabase = await createClient();
  let query = supabase
    .from("tools")
    .select(`id, title, favicon, description, url, slug, tags`)
    .eq("is_published", isPublished ?? true)
    .limit(limit || 20);

  if (tag) {
    query = query.contains("tags", [tag]);

    if (tags?.length) {
      query = query.overlaps("tags", tags);
    }
  }

  if (tags?.length) {
    // if contains all tags
    // query = query.containedBy("tags", tags);
    // if contains any of the tags
    query = query.overlaps("tags", tags);
    // query = query.filter("tags", "cs", `{${tags.join(",")}}`);
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

    query = query.or(`title.ilike.%${searchTerm}%, tags.cs.${tagId}`);
  }

  if (slug) {
    // query = query.ilike("title", `%${name}%`);
    query = query.eq("slug", slug);
  }

  if (pinned?.length) {
    query = query.in("id", pinned);
  }

  const { data: tools, error: toolsError } = await query;

  if (toolsError) {
    console.error(toolsError);
    return;
  }

  let tagIds: any = tools
    .flatMap((tool) => tool.tags)
    .filter((tag) => tag !== null);

  tagIds = new Set(tagIds);

  const { data: tagz, error: tagzError } = await supabase
    .from("tags")
    .select("id, name, slug")
    .eq("is_published", true)
    .in("id", tagIds);

  if (tagzError) {
    console.error(tagzError);
    return;
  }

  return {
    tools,
    tags: tagz,
  };
}
