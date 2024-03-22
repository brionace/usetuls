import React from "react";
import List from "@/components/list";
import Header from "@/components/header";
import Banner from "@/components/banner";
import useCategoriesData from "@/utils/useCategoriesData";
import useTagsData from "@/utils/useTagsData";

const content = {
  name: "Useful Web-Based Tools",
  description:
    "A hub of powerfully useful and effective digital tools and online utilities for developers, designers, finance experts, project and product managers to make quality projects easily and quickly.",
};

export default async function Home() {
  const categories = await useCategoriesData();
  const tags = await useTagsData();

  return (
    <>
      <Header categories={categories} />
      <main className="max-w-7xl mx-auto">
        <div className="[&>*]:!mx-auto">
          <Banner content={content} direction="text-center" />
        </div>
        <List />
      </main>
    </>
  );
}
