import React from "react";
import Header from "@/components/header";
import getCategories from "@/utils/getCategories";
import Footer from "@/components/footer";
import getTools from "@/utils/getTools";
import { useRouter } from "next/router";

const content = {
  name: "Discover useful digital tools",
  description:
    "Find web tools that help you get things done smarter and quicker",
};

export default async function Webtool() {
  // in nextjs how do i get the ir from the route?
  const router = useRouter();
  const { id } = router.query;
  const idNumber = parseInt(id as string);
  const categories = await getCategories({ hasTools: true });
  const tools = await getTools({ id: idNumber });

  console.log({ tools });
  return (
    <>
      <Header categories={categories} />
      <main className="max-w-7xl mx-auto min-h-screen">The tool page</main>
      <Footer />
    </>
  );
}
