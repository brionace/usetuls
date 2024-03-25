import React from "react";
import List from "@/components/list";
import Header from "@/components/header";
import Banner from "@/components/banner";
import getCategoriesData from "@/utils/getCategoriesData";
import getTagsData from "@/utils/getTagsData";
import Footer from "@/components/footer";

const content = {
  name: "Find useful digital Tools & Utilities",
  description:
    "Discover digital Tools & online Utilities to get things done smarter, quicker and simplify your life & work.",
};

export default async function Home() {
  const categories = await getCategoriesData({ hasTools: true });
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
