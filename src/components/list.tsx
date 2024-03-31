import getToolsData from "@/utils/getToolsData";
import Card from "./card";

export default async function List({ categoryId }: { categoryId?: number }) {
  const data = await getToolsData({ categoryId });

  return (
    <div className="gap-3 grid min-[320px]:grid-cols-2 min-[600px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 px-4">
      {data?.map((d) => (
        <Card key={d.id} data={d} />
      ))}
    </div>
  );
}
