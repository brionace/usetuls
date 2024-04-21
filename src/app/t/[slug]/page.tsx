import React from "react";
import Header from "@/components/header";
import getCategories from "@/utils/getCategories";
import Footer from "@/components/footer";
import getTools from "@/utils/getTools";
import { GetServerSidePropsContext } from "next";

const content = {
  name: "Discover useful digital tools",
  description:
    "Find web tools that help you get things done smarter and quicker",
};

export default async function Webtool({ categories, tools }: any) {
  return (
    <>
      <Header categories={categories} />
      <main className="max-w-7xl mx-auto min-h-screen">The tool page</main>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!context.params) {
    // Handle the case where params is undefined
    return {
      notFound: true,
    };
  }

  const { id } = context.params;
  const idNumber = parseInt(id as string);
  const categories = await getCategories({ hasTools: true });
  const tools = await getTools({ id: idNumber });

  return {
    props: {
      categories,
      tools,
    },
  };
}
