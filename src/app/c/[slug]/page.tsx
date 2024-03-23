import React from "react";
import List from "@/components/list";
import Header from "@/components/header";
import Banner from "@/components/banner";
import useCategoriesData from "@/utils/useCategoriesData";

export default async function Categories({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const categories = await useCategoriesData();
  const categoryId = Number(slug);
  const category = categories.find((category) => category.id === categoryId);

  return (
    <>
      <Header categories={categories} />
      <main className="max-w-7xl mx-auto">
        <Banner content={category} />
        <List categoryId={categoryId} />
      </main>
    </>
  );
}
