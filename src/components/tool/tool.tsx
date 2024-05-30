"use client";
import { useContext, useEffect, useState } from "react";
import {
  Card as NextCard,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Link,
  Avatar,
  Button,
} from "@nextui-org/react";
import { DataContext } from "@/app/data-provider";
import { MdOpenInNew, MdBookmark } from "react-icons/md";
import { isImageLink, isSVGFormatImage, modalSettings } from "@/utils";
import { Pin } from "@/components/user-action";
import ToolsHeader from "./header";

type ToolProps = {
  id: number;
  favicon: string;
  title: string;
  description: string;
  url: string;
};

export default function Tool({
  icon,
  id,
  title,
  description,
  url,
  children,
}: {
  id: number;
  title: string;
  description: string;
  url?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}) {
  // async function fetchToolData() {
  //   try {
  //     const response = await fetch("/api/tools/?slug=" + showTool);
  //     const {
  //       data: { tools },
  //     } = await response.json();

  //     setToolData(tools[0]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <div className="w-full max-w-[800px] mx-auto p-4">
      <ToolsHeader icon={icon} id={id} url={url} title={title} />
      <p>{description}</p>
      {children}
    </div>
  );
}
