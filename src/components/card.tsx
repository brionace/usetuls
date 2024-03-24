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
import { MdArrowRightAlt, MdOpenInNew, MdFavorite } from "react-icons/md";

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
      <NextCard className="w-full py-3" shadow="sm">
        <CardHeader className="w-full flex gap-3">
          <Image
            src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_FAVICON_URL}/${data.favicon}`}
            alt={data.title}
            width="100%"
            className="object-cover w-10 h-10"
          />
          <h4 className="text-sm font-medium text-balance">{data.title}</h4>
        </CardHeader>
        <CardBody className="hidden sm:flex text-sm text-balance">
          <p>{truncateString(data.description)}</p>
        </CardBody>
        <CardFooter className="flex gap-2 justify-center [&>*]:bg-default">
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
            <MdFavorite />
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
            <MdArrowRightAlt />
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
