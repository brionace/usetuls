import React from "react";
import List from "@/components/list";
import Header from "@/components/header";
import Banner from "@/components/banner";
import Footer from "@/components/footer";
import { Metadata, ResolvingMetadata } from "next/types";
import { usetulsTitleSuffix, usetulsTitleDivider } from "@/utils";
import Tool from "@/components/tool/tool";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;
  const categories: any = await getCategories({ slug });
  const category = categories[0];

  return {
    title: `${category.name}${usetulsTitleDivider}${usetulsTitleSuffix}`,
    description: category.description,
    // openGraph: {
    //   images: ["/some-specific-page-image.jpg", ...previousImages],
    // },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = params;

  const category: any = categories?.filter(
    (category: any) => category.slug === slug
  )[0];

  if (!category) {
    return notFound();
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto min-h-screen">
        <Banner content={category} />
        <List categoryId={category?.id} />
      </main>
      {/* <Tool /> */}
      <Footer />
    </>
  );
}
