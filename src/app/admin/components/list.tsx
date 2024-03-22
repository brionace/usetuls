import useToolsData from "@/utils/useToolsData";
import useCategoriesData from "@/utils/useCategoriesData";
import useTagsData from "@/utils/useTagsData";
import useTaggedData from "@/utils/useTaggedData";
import EditTools from "./edit-tools";

export default async function List() {
  const data = await useToolsData({ editing: true });
  const categories = await useCategoriesData();
  const tags = await useTagsData();
  const tagged = await useTaggedData();

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
