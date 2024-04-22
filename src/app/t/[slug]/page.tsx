import React from "react";
import Header from "@/components/header";
import getCategories from "@/utils/getCategories";
import Footer from "@/components/footer";
import getTools from "@/utils/getTools";

const content = {
  name: "Discover useful digital tools",
  description:
    "Find web tools that help you get things done smarter and quicker",
};

interface Props {
  params: {
    id: string;
  };
}

export default async function Webtool({ params }: Props) {
  const { id } = params;
  const idNumber = parseInt(id);
  const categories = await getCategories({ hasTools: true });
  const tools = await getTools({ id: idNumber });

  return (
    <>
      <Header categories={categories} />
      <main className="max-w-7xl mx-auto min-h-screen">The tool page</main>
      <Footer />
    </>
  );
}
