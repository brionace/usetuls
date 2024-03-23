import React from "react";
import List from "@/components/list";
import Header from "@/components/header";
import Banner from "@/components/banner";
import getCategoriesData from "@/utils/getCategoriesData";
import getTagsData from "@/utils/getTagsData";
import Footer from "@/components/footer";

const content = {
  name: "Useful Web-Based Tools",
  description:
    "A hub of powerfully useful and effective digital tools and online utilities for developers, designers, finance experts, project and product managers to make quality projects easily and quickly.",
};

export default async function Home() {
  const categories = await getCategoriesData({});
  const tags = await getTagsData();

  return (
    <>
      <Header categories={categories} />
      <main className="max-w-7xl mx-auto min-h-screen">
        <div className="[&>*]:!mx-auto">
          <Banner content={content} direction="text-center" />
        </div>
        <List />
      </main>
      <Footer />
    </>
  );
}
