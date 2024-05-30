import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import getTools from "@/utils/getTools";
import REfillTank from "@/components/refill-tank";
import FuelPump from "@/components/refill-tank/components/fuelPump";
import { Pin } from "@/components/user-action";
import Tool from "@/components/tool/tool";
import LaunchTool from "@/components/launchTool";
import { isImageLink } from "@/utils";
import { Avatar, Image } from "@nextui-org/react";
import ClientComponent from "./clientComponent";

const content = {
  name: "Discover useful digital tools",
  description:
    "Find web tools that help you get things done smarter and quicker",
};

export default async function Page() {
  const tool = await getTools({ slug: "refill" });

  // const faviconUrl = `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_FAVICON_URL}/${tool?.tools[0].favicon}`;

  // const renderedIcon = () => {
  //   return isImageLink(faviconUrl) ? (
  //     <Image
  //       src={faviconUrl}
  //       crossOrigin="anonymous"
  //       className="w-[48px] h-[48px]"
  //     />
  //   ) : (
  //     <Avatar
  //       radius="lg"
  //       showFallback
  //       name="Refill"
  //       className="w-[48px] h-[48px]"
  //     />
  //   );
  // };

  return (
    <>
      <Header />
      <Footer />
    </>
  );
}
