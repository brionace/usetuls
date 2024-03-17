import useData from "@/utils/useData";
import EditTools from "./edit-tools";

export default async function List() {
  const data = await useData({ editing: true });

  return (
    <div className="flex gap-4">
      {data.map((d) => (
        <EditTools key={d.id} data={d} />
      ))}
    </div>
  );
}
