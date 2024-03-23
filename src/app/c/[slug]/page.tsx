import React from "react";
import List from "@/components/list";
import Header from "@/components/header";
import Banner from "@/components/banner";
import getCategoriesData from "@/utils/getCategoriesData";
import Footer from "@/components/footer";
import { Metadata, ResolvingMetadata } from "next/types";
import { usetulsTitleSuffix, usetulsTitleDivider } from "@/utils";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;
  const categories = await getCategoriesData({ slug });
  const category = categories[0];

  return {
    title: `${category.name}${usetulsTitleDivider}${usetulsTitleSuffix}`,
    description: category.description,
    // openGraph: {
    //   images: ["/some-specific-page-image.jpg", ...previousImages],
    // },
  };
}

export default async function Categories({ params }: Props) {
  const { slug } = params;
  const categories = await getCategoriesData({});

  const category = categories?.filter(
    (category: { slug: string }) => category.slug === slug
  )[0];

  return (
    <>
      <Header categories={categories} />
      <main className="max-w-7xl mx-auto min-h-screen">
        <Banner content={category} />
        <List categoryId={category.id} />
      </main>
      <Footer />
    </>
  );
}
