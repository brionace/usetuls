"use client";
import React, {
  useContext,
  useState,
  useRef,
  use,
  useEffect,
  ReactNode,
} from "react";
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
  MdOpenInFull,
  MdBookmark,
  MdMore,
} from "react-icons/md";
import { isImageLink, isSVGFormatImage, isValidUrl } from "@/utils";
import { DataContext } from "@/app/data-provider";
import { FastAverageColor } from "fast-average-color";

export default function Card({ data }: any) {
  const { dispatch } = useContext(DataContext);
  const container = useRef<HTMLDivElement>(null);
  const fac = new FastAverageColor();

  // useEffect(() => {
  if (container.current) {
    fac
      .getColorAsync(container.current?.querySelector("img"))
      .then((color) => {
        if (container.current) {
          container.current.style.backgroundColor = color.rgba;
          container.current.style.color = color.isDark ? "#fff" : "#000";
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }
  // }, []);

  function truncateString({
    str,
    length = 70,
    ending = "...",
    url,
  }: {
    str: string;
    length?: number;
    ending?: string | ReactNode;
    url: string;
  }) {
    let stringToRender: string | ReactNode = str?.replace(/<[^>]*>?/gm, "");
    if (str?.length > length) {
      const end = `<a href="${url}">${ending}</a>`;
      stringToRender = (
        <span
          dangerouslySetInnerHTML={{
            __html: str?.slice(0, length - (ending as string).length) + end,
          }}
        />
      );
    }
    return stringToRender;
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
      <NextCard
        ref={container}
        className="w-full pb-1 text-xs text-gray-600 tracking-wide font-light"
        shadow="md"
      >
        <CardHeader className="w-full flex items-end justify-between flex-row-reverse gap-3">
          <div className="w-8 h-8">
            {isImageLink(faviconUrl) ? (
              // <Avatar
              //   src={faviconUrl}
              //   radius="lg"
              //   size="sm"
              //   className="bg-transparent"
              //   crossOrigin="anonymous"
              // />
              <Image
                src={faviconUrl}
                crossOrigin="anonymous"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <Avatar
                radius="lg"
                showFallback
                name={data.title.slice(0, 1)}
                className="p-2 bg-blend-normal bg-gradient-to-bl from-[#f6f6f6] to-[#fdfafa]"
              />
            )}
          </div>
          <h4 className="font-medium">{data.title}</h4>
        </CardHeader>
        <CardBody>
          <p>
            {truncateString({
              str: data.description,
              url: data.url,
            })}
          </p>
        </CardBody>
        <CardFooter className="flex gap-2 justify-evenly [&>*]:bg-default backdrop-blur-xl bg-white/10 rounded-t-xl">
          <Button
            as={Link}
            href={data.url}
            color="default"
            variant="light"
            size="sm"
            isExternal
            isIconOnly
            className="flex flex-column justify-center w-[30px] h-[30px] rounded-full !bg-transparent hover:!bg-default"
          >
            <MdOpenInNew />
            {/* <span>Link</span> */}
          </Button>
          <Button
            color="default"
            variant="light"
            size="sm"
            isIconOnly
            className="flex flex-column justify-center w-[30px] h-[30px] rounded-full !bg-transparent hover:!bg-default"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <MdBookmark />
            {/* <span>Save</span> */}
          </Button>
          <Button
            color="default"
            variant="light"
            size="sm"
            isIconOnly
            className="flex flex-column justify-center w-[30px] h-[30px] rounded-full !bg-transparent hover:!bg-default"
            onClick={() => {
              dispatch({
                type: "SHOW_TOOL",
                payload: data.id,
              });
            }}
          >
            <MdOpenInFull />
            {/* <span>View</span> */}
          </Button>
        </CardFooter>
      </NextCard>
    </>
  );
}
