import React from "react";
import List from "@/components/list";
import Header from "@/components/header";
import Banner from "@/components/banner";
import categories from "@/data/categories.json";

export default function Categories({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const category = categories.find((category) => category.id === slug);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto">
        <Banner content={category} />
        <List slug={slug} />
      </main>
    </>
  );
}
