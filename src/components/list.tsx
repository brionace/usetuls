import getTools from "@/utils/getTools";
import Card from "./card";

export default async function List({ categoryId }: { categoryId?: number }) {
  const data = await getTools({ categoryId });

  return (
    <div className="gap-5 grid min-[320px]:grid-cols-1 min-[375px]:grid-cols-2 min-[500px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-4">
      {data?.map((d) => (
        <Card key={d.id} data={d} />
      ))}
    </div>
  );
}
