import getTools from "@/utils/getTools";
import getCategories from "@/utils/getCategories";
import getTags from "@/utils/getTags";
import EditTools from "./edit-tools";

export default async function List() {
  const data = await getTools({ isPublished: false });
  const tags = await getTags({});

  return (
    <div className="flex flex-wrap gap-4">
      {data?.map((d) => {
        return <EditTools key={d.id} data={d} tags={tags} />;
      })}
    </div>
  );
}
