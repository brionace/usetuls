import { createClient } from "@/utils/supabase/server";

export default async function getTools({
  searchTerm,
  slug,
  tag,
  tags,
  pinned,
  page,
}: {
  searchTerm?: string;
  slug?: string;
  tag?: number;
  tags?: number[];
  pinned?: string[];
  page?: number;
}) {
  const supabase = createClient();
  const itemsPerPage = 10;
  const currentPage = Number(page) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage - 1;

  let query = supabase
    .from("tools")
    .select(`id, title, favicon, description, url, slug, tags, tagz`)
    .eq("is_published", true)
    .limit(itemsPerPage)
    .range(startIndex, endIndex);

  // public.et_tools_with_tags(end_index, is_published, items_per_page, start_index, tag, tool_tags)
  // let query = supabase
  //   .rpc("get_tools_with_tags", {
  //     end_index: endIndex,
  //     is_published: isPublished ?? true,
  //     items_per_page: itemsPerPage,
  //     start_index: startIndex,
  //   })
  //   .single();

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
    .flatMap((tool: any) => tool.tags)
    .filter((tag: any) => tag !== null);

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

  const toolTagz = tools?.map((tool: any) => {
    // Replace the tags property of each tool with the corresponding tags from tagz
    tool.tags = tool.tags.map((tagId: any) =>
      tagz.find((tag: any) => tag.id === tagId)
    );
    return tool;
  });

  return {
    tools: toolTagz,
    tags: tagz,
  };
}
