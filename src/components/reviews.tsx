"use client";
import { DataContext } from "@/app/data-provider";
import { modalSettings } from "@/utils";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Image,
  user,
  Avatar,
} from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import Card from "@/components/card";
import List from "./list";

const reviews = [
  {
    id: 1,
    rating: 4,
    comment: "Great tool",
    user: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/med/men/75.jpg",
    },
  },
  {
    id: 2,
    rating: 3,
    comment: "Good tool",
    user: {
      name: "Jane Doe",
      avatar: "https://randomuser.me/api/portraits/med/women/75.jpg",
    },
  },
  {
    id: 3,
    rating: 5,
    comment: "Excellent tool",
    user: {
      name: "Brian O",
      avatar: "https://randomuser.me/api/portraits/med/men/75.jpg",
    },
  },
];

export default function Reviews() {
  //   const [reviews, setReviews] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const stars = [
    "&#x1F44E;",
    "&#x1F90F;",
    "&#x1F44D;",
    "&#x1F44F;",
    "&#x1F44C;",
  ];

  const starCounts = stars.map((star, index) => {
    const count = reviews.reduce((total, review) => {
      return total + (review.rating === index + 1 ? 1 : 0);
    }, 0);

    const getFontSize = (count: any) => {
      switch (count) {
        case 1:
          return "text-sm";
        case 2:
          return "text-base";
        case 3:
          return "text-lg";
        case 4:
          return "text-xl";
        case 5:
          return "text-2xl";
      }
    };

    return { star, count, fontSize: getFontSize(count) };
  });

  return (
    <ul>
      {reviews?.map((review) => (
        <li
          key={review.id}
          className="flex flex-col gap-3 pb-9 mb-9 border-b-1 last:border-0"
        >
          <div className="flex md:flex-row gap-3 items-center mb-5">
            <div className="flex gap-3 items-center">
              <Avatar radius="full" src={review.user.avatar} showFallback />
              <div>
                <h3>{review.user.name}</h3>
              </div>
            </div>
            <span
              dangerouslySetInnerHTML={{
                __html: String(stars[review?.rating - 1]),
              }}
            />
          </div>
          <p className="ml-[3.25rem]">{review.comment}</p>
        </li>
      ))}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        placement="top"
        className="m-4"
        scrollBehavior={modalSettings.scrollBehavior}
        motionProps={modalSettings.motionProps}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-1 pr-10">
                {/* <Link href="/" className="w-6 h-6">
                <Image
                  src="/logo.svg"
                  alt="Usetuls logo"
                  className="w-6 h-6 rounded-none"
                />
              </Link> */}
                <h2>Add your review</h2>
              </ModalHeader>
              <ModalBody className="mb-8">
                Star
                <br /> Comment
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </ul>
  );
}
