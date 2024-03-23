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
} from "@nextui-org/react";
import { MdArrowRightAlt, MdOpenInNew } from "react-icons/md";

export default function Card({ data }: any) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("opaque");
  // const base64regex =
  //   /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  // const image = base64regex.test(data.favicon)
  //   ? `data:image/png;base64,${data.favicon}`
  //   : data.favicon;
  function truncateString(str: string, length = 80, ending = "...") {
    if (str.length > length) {
      return str.slice(0, length - ending.length) + ending;
    }
    return str;
  }

  return (
    <>
      <NextCard className="w-50" shadow="sm">
        <CardHeader className="flex flex-col gap-3 justify-start">
          <div className="flex items-center gap-3">
            <Image
              src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_FAVICON_URL}/${data.favicon}`}
              alt={data.title}
              width="100%"
              className="object-cover w-10"
            />
            <div className="flex gap-2 [&>*]:bg-default">
              <Link
                href={data.url}
                isExternal
                className="flex items-center justify-center w-[30px] h-[30px] rounded-full"
              >
                <MdOpenInNew />
              </Link>
              <Link
                href={`#${data.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onOpen();
                }}
                className="flex items-center justify-center w-[30px] h-[30px] rounded-full"
              >
                <MdArrowRightAlt />
              </Link>
            </div>
          </div>
          <p className="text-sm font-bold">{data.title}</p>
        </CardHeader>
        <CardBody className="text-sm">
          <p>{truncateString(data.description)}</p>
        </CardBody>
      </NextCard>
      <Modal
        backdrop={backdrop as "blur" | "transparent" | "opaque" | undefined}
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-center rounded bg-default gap-4 dark:bg-default">
                <div className="flex gap-4 items-center">
                  <Avatar isBordered src={data.favicon} />
                  <h1 className="font-bold">{data.title}</h1>
                </div>
                <Link href={data.url} target="blank" isBlock showAnchorIcon>
                  <span className="hidden sm:flex">Link</span>
                </Link>
              </ModalHeader>
              <ModalBody className="flex gap-4 text-default dark:text-white py-8">
                <p>{data.description}</p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
