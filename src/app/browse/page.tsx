import React from "react";
import List from "@/components/list";
import Header from "@/components/header";
import Banner from "@/components/banner";
import getTags from "@/utils/getTags";
import Footer from "@/components/footer";
import Tool from "@/components/tool/tool";

const content = {
  name: "Discover useful digital tools",
  description:
    "Find web tools that help you get things done smarter and quicker",
};

export default async function Browse() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto min-h-screen">
        <List />
      </main>
      {/* <Tool /> */}
      <Footer />
    </>
  );
}
