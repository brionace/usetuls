"use client";
import React, { useState } from "react";
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

export default function Card({ data }: any) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("opaque");

  function truncateString(str: string, length = 80, ending = "...") {
    if (str.length > length) {
      return str.slice(0, length - ending.length) + ending;
    }
    return str;
  }

  const imgUrl = `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_FAVICON_URL}/${data.favicon}`;
  const SVGImage = () => {
    if (!isSVGFormatImage(imgUrl)) {
      return null;
    }
    return imgUrl;
  };

  return (
    <>
      <NextCard className="w-full pb-3" shadow="sm">
        <CardHeader className="w-full flex gap-2 items-center justify-between flex-row-reverse bg-slate-50">
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
          <div className="w-7 h-7">
            <Image
              src={imgUrl}
              alt={data.title}
              width="100%"
              className="object-cover w-7 h-7"
            />
          </div>
          <h4 className="text-sm font-medium">{data.title}</h4>
        </CardHeader>
        <CardBody className="hidden sm:flex text-xs bg-slate-50">
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
            as={Link}
            href={`#${data.id}`}
            color="default"
            variant="light"
            size="sm"
            isExternal
            isIconOnly
            className="justify-center w-[30px] h-[30px] rounded-full !bg-transparent hover:!bg-default"
            onClick={(e) => {
              e.preventDefault();
              onOpen();
            }}
          >
            <MdMoreVert />
          </Button>
        </CardFooter>
      </NextCard>
      <Modal
        backdrop={backdrop as "blur" | "transparent" | "opaque" | undefined}
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
      >
        <ModalContent className="pb-3">
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-center rounded">
                <div className="flex gap-4 items-center">
                  <Avatar isBordered src={data.favicon} />
                  <h1 className="font-bold">{data.title}</h1>
                </div>
                <Link href={data.url} target="blank" isBlock showAnchorIcon>
                  <span className="hidden sm:flex">Link</span>
                </Link>
              </ModalHeader>
              <ModalBody>
                <p>{data.description}</p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
