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
  MdMoreVert,
} from "react-icons/md";
import {
  isImageLink,
  isSVGFormatImage,
  isValidUrl,
  modalSettings,
} from "@/utils";
import { DataContext } from "@/app/data-provider";
import { FastAverageColor } from "fast-average-color";
import { Expand, Pin } from "@/components/user-action";
import Tool from "@/components/tool/tool";

export default function Card({ data, location }: any) {
  const [showFooter, setShowFooter] = useState(false);
  const { dispatch } = useContext(DataContext);
  const container = useRef<HTMLDivElement>(null);
  const fac = new FastAverageColor();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // useEffect(() => {
  //   if (container.current) {
  //     fac
  //       .getColorAsync(container.current?.querySelector("img"))
  //       .then((color) => {
  //         if (container.current) {
  //           container.current.style.backgroundColor = color.rgba;
  //           container.current.style.color = color.isDark ? "#fff" : "#000";
  //         }
  //       })
  //       .catch((e) => {
  //         console.error(e);
  //       });
  //   }
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

  const renderedIcon = () => {
    return isImageLink(faviconUrl) ? (
      <Image
        src={faviconUrl}
        crossOrigin="anonymous"
        className="w-full h-full"
      />
    ) : (
      <Avatar
        radius="lg"
        showFallback
        name={data.title.slice(0, 1)}
        className="w-full h-full"
      />
    );
  };

  return (
    <>
      <div
        ref={container}
        className="group flex gap-3 justify-between cursor-pointer "
        // onClick={() => dispatch({ type: "SHOW_TOOL", payload: data.slug })}
        onClick={() => onOpen()}
      >
        <div className="flex gap-3">
          <div className="max-w-[48px] max-h-[48px] w-full h-full">
            {renderedIcon()}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-gray-400 text-xs">
              <span className="text-black font-bold">{data.title}</span>&mdash;
              {data.description}
              {/* {truncateString({
              str: data.description,
              url: data.url,
            })} */}
            </p>
            <div className="flex items-center transform translate-y-0 transition-transform duration-500 ease-in-out">
              <Button
                as={Link}
                href={data.url}
                color="default"
                variant="light"
                size="sm"
                isExternal
                isIconOnly
                className="flex items-center justify-center rounded-full !bg-transparent hover:!bg-default"
              >
                <MdOpenInNew />
              </Button>
              <Pin id={data.id} />
              <Expand id={data.id} />
            </div>
          </div>
        </div>
      </div>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onClose={onClose}
        placement="top"
        closeButton={false}
        size="5xl"
        motionProps={modalSettings.motionProps}
        classNames={{
          // body: "m-4",
          // backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "m-4",
          // header: "border-b-[1px] border-[#292f46]",
          // footer: "border-t-[1px] border-[#292f46]",
          // closeButton: "hidden",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <Tool
              icon={renderedIcon()}
              id={data.id}
              title={data.title}
              description={data.description}
              url={data.url}
            >
              Tags: {data.tags}
            </Tool>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
