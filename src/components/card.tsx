"use client";
import React, { useContext, useState } from "react";
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
import {
  MdArrowRightAlt,
  MdOpenInNew,
  MdFavorite,
  MdMoreVert,
  MdBookmark,
} from "react-icons/md";
import { isSVGFormatImage } from "@/utils";
import { DataContext } from "@/app/data-provider";

export default function Card({ data }: any) {
  const { dispatch } = useContext(DataContext);
  function truncateString(str: string, length = 45, ending = "...") {
    if (str?.length > length) {
      return str?.slice(0, length - ending.length) + ending;
    }
    return str;
  }

  const faviconUrl = `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_FAVICON_URL}/${data.favicon}`;
  const SVGImage = () => {
    if (!isSVGFormatImage(faviconUrl)) {
      return null;
    }
    return faviconUrl;
  };

  return (
    <>
      <NextCard className="w-full pb-1" shadow="sm">
        <CardHeader className="w-full flex items-center">
          {/* {isSVGFormatImage(imgUrl) ? (
            <SVGImage />
          ) : (
            <Image
              src={imgUrl}
              alt={data.title}
              width="100%"
              fill
              className="object-cover w-10 h-10"
            />
          )} */}
          <Avatar
            src={faviconUrl}
            radius="md"
            size="md"
            color="default"
            showFallback
            name={data.title.slice(0, 1)}
            className="p-2 bg-blend-normal bg-gradient-to-bl from-[#f6f6f6] to-[#fdfafa]"
          />
          <h4 className="text-xs font-medium ml-3">{data.title}</h4>
        </CardHeader>
        <CardBody className="text-xs border-b-1 border-slate-50 text-gray-600 tracking-wide font-light">
          <p>{truncateString(data.description)}</p>
        </CardBody>
        <CardFooter className="flex gap-2 justify-evenly [&>*]:bg-default">
          <Button
            as={Link}
            href={data.url}
            color="default"
            variant="light"
            size="sm"
            isExternal
            isIconOnly
            className="justify-center w-[30px] h-[30px] rounded-full !bg-transparent hover:!bg-default"
          >
            <MdOpenInNew />
          </Button>
          <Button
            color="default"
            variant="light"
            size="sm"
            isIconOnly
            className="justify-center w-[30px] h-[30px] rounded-full !bg-transparent hover:!bg-default"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <MdBookmark />
          </Button>
          <Button
            color="default"
            variant="light"
            size="sm"
            isIconOnly
            className="justify-center w-[30px] h-[30px] rounded-full !bg-transparent hover:!bg-default"
            onClick={() => {
              dispatch({
                type: "SHOW_TOOL",
                payload: data.id,
              });
            }}
          >
            <MdMoreVert />
          </Button>
        </CardFooter>
      </NextCard>
    </>
  );
}
