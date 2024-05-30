import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import getTools from "@/utils/getTools";
import Card from "@/components/card";
import { isImageLink } from "@/utils";
import { Avatar, Button, Link } from "@nextui-org/react";
import { Pin } from "@/components/user-action";
import { MdOpenInNew } from "react-icons/md";

const content = {
  name: "Discover useful digital tools",
  description:
    "Find web tools that help you get things done smarter and quicker",
};

interface Props {
  params: {
    slug: string;
  };
}

export default async function Webtool({ params }: Props) {
  const { slug } = params;
  const tool = await getTools({ slug });
  const { id, favicon, title, description, url } = tool?.tools[0] as any;

  const faviconUrl = `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_FAVICON_URL}/${favicon}`;

  return (
    <>
      <Header />
      <Footer />
    </>
  );
}
