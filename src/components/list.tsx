import useData from "@/utils/useData";
import Card from "./card";

export default async function List({ slug }: { slug?: string }) {
  const data = await useData({ slug });

  return (
    <div className="gap-4 grid grid-cols-2 sm:grid-cols-4 px-4">
      {data.map((d) => (
        <Card key={d.id} data={d} />
      ))}
    </div>
  );
}
