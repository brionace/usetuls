import { get } from "http";
import AddTools from "./components/add-tools";
import getCategories from "@/utils/getCategories";

export default async function Admin() {
  const categories = await getCategories({});
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <AddTools categories={categories} />
    </div>
  );
}
