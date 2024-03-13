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

export default function Card({ data }: any) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");

  return (
    <>
      <NextCard
        className="overflow-visible px-4 bg-transparent rounded-none p-0 shadow-none"
        shadow="sm"
      >
        <CardHeader className="flex-col items-center rounded-xl bg-white">
          <Image
            src={data.icon}
            alt={data.name}
            width="100%"
            className="object-cover h-[140px]"
          />
        </CardHeader>
        <CardBody className="py-4 text-default">
          <a
            href={`#${data.id}`}
            className="font-bold"
            onClick={(e) => {
              e.preventDefault();
              onOpen();
            }}
          >
            {data.name}
          </a>
        </CardBody>
      </NextCard>
      <Modal
        backdrop={backdrop as "blur" | "transparent" | "opaque" | undefined}
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
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
                  className="object-cover h-auto"
                />
              </ModalHeader>
              <ModalBody className="flex gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div>
                    <a href={data.url} target="blank" className="font-bold">
                      {data.name}
                    </a>
                    <p>{data.description}</p>
                  </div>
                  <div>Ads</div>
                </div>
                <div>More</div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
