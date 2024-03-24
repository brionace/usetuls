import getToolsData from "@/utils/getToolsData";
import getCategoriesData from "@/utils/getCategoriesData";
import getTagsData from "@/utils/getTagsData";
import getTaggedData from "@/utils/getTaggedData";
import EditTools from "./edit-tools";

export default async function List() {
  const data = await getToolsData({ editing: true });
  const categories = await getCategoriesData({});
  const tags = await getTagsData();
  const tagged = await getTaggedData();

  return (
    <div className="flex flex-wrap gap-4">
      {data.map((d) => {
        const filteredTags = tagged.filter((t: any) => t.tools_id === d.id);
        const mappedTags = filteredTags.map((t: any) => t.tag_id);
        return (
          <EditTools
            key={d.id}
            data={d}
            categories={categories}
            tags={tags}
            tagged={mappedTags}
          />
        );
      })}
    </div>
  );
}
