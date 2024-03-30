import getToolsData from "@/utils/getToolsData";
import getCategoriesData from "@/utils/getCategoriesData";
import getTagsData from "@/utils/getTagsData";
import getTaggedData from "@/utils/getTaggedData";
import EditTools from "./edit-tools";

export default async function List() {
  const data = await getToolsData({ isPublished: true });
  const tags = await getTagsData();

  return (
    <div className="flex flex-wrap gap-4">
      {data.map((d) => {
        return <EditTools key={d.id} data={d} tags={tags} />;
      })}
    </div>
  );
}
