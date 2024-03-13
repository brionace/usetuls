import React from "react";
import List from "@/components/list";
import Header from "@/components/header";
import Banner from "@/components/banner";

const content = {
  name: "Useful Web-Based Tools",
  description:
    "A hub of powerfully useful and effective digital tools and online utilities for developers, designers, finance experts, project and product managers to make quality projects easily and quickly.",
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto">
        <div className="[&>*]:!mx-auto">
          <Banner content={content} direction="text-center" />
        </div>
        <List />
      </main>
    </>
  );
}
