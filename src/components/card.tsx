"use client";
import React, { useState } from "react";
import {
  Card as NextCard,
  CardHeader,
  CardBody,
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
  const base64regex =
    /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  const image = base64regex.test(data.icon)
    ? `data:image/png;base64,${data.icon}`
    : data.icon;
  return (
    <>
      <NextCard
        className="overflow-visible px-4 bg-transparent rounded-none p-0 shadow-none"
        shadow="sm"
      >
        <CardHeader className="flex-col items-center rounded-xl bg-default dark:bg-default">
          <Image
            src={image}
            alt={data.name}
            width="100%"
            className="object-cover h-[140px]"
          />
        </CardHeader>
        <CardBody className="font-bold flex flex-col sm:flex-row gap-4 sm:justify-between py-4 text-default dark:text-white">
          <Link
            href={`#${data.id}`}
            onClick={(e) => {
              e.preventDefault();
              onOpen();
            }}
          >
            {data.name}
          </Link>
          <Link href={data.url} target="_blank">
            <MdOpenInNew />
          </Link>
        </CardBody>
      </NextCard>
      <Modal
        backdrop={backdrop as "blur" | "transparent" | "opaque" | undefined}
        isOpen={isOpen}
        onClose={onClose}
        placement="top"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-center rounded bg-default gap-4 dark:bg-default">
                <div className="flex gap-4 items-center">
                  <Avatar isBordered src={data.icon} />
                  <h1 className="font-bold">{data.name}</h1>
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
