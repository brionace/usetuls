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
    "Discover web Tools & online Utilities help you get things done smarter and quicker",
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
