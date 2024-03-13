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
} from "@nextui-org/react";
import { MdArrowRightAlt, MdOpenInNew } from "react-icons/md";

export default function Card({ data }: any) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");
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
        <CardHeader className="flex-col items-center rounded-xl bg-white">
          <Image
            src={image}
            alt={data.name}
            width="100%"
            className="object-cover h-[140px]"
          />
        </CardHeader>
        <CardBody className="py-4 text-default dark:text-white">
          <a
            href={`#${data.id}`}
            className="font-bold flex items-center justify-between w-full"
            onClick={(e) => {
              e.preventDefault();
              onOpen();
            }}
          >
            <span>{data.name}</span>
            <MdArrowRightAlt />
          </a>
        </CardBody>
      </NextCard>
      <Modal
        backdrop={backdrop as "blur" | "transparent" | "opaque" | undefined}
        isOpen={isOpen}
        onClose={onClose}
        size="4xl"
        placement="top"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-center">
                <Image
                  src={data.icon}
                  alt={data.name}
                  width="100%"
                  className="object-cover h-[140px]"
                />
              </ModalHeader>
              <ModalBody className="flex gap-4 text-default dark:text-white py-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col gap-4">
                    <a
                      href={data.url}
                      target="blank"
                      className="font-bold flex items-center gap-2"
                    >
                      <span>{data.name}</span>
                      <MdOpenInNew />
                    </a>
                    <p>{data.description}</p>
                    <p>
                      <a
                        href={data.url}
                        target="blank"
                        className="font-bold flex items-center gap-2"
                      >
                        <span>Go to website</span> <MdOpenInNew />
                      </a>
                    </p>
                  </div>
                  {/* <div>Ads</div> */}
                </div>
                {/* <div>More</div> */}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
