import useToolsData from "@/utils/useToolsData";
import Card from "./card";

export default async function List({ categoryId }: { categoryId?: number }) {
  const data = await useToolsData({ categoryId });

  return (
    <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 px-4">
      {data.map((d) => (
        <Card key={d.id} data={d} />
      ))}
    </div>
  );
}
