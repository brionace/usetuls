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
} from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import Card from "@/components/card";
import List from "./list";

export default function Bookmarks() {
  const [tools, setTools] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const [pinned, setPinned] = useState([]);
  const {
    state: { showBookmarks, bookmarks },
    dispatch,
  } = useContext(DataContext);

  // useEffect(() => {
  //   onOpen();
  //   const pinned = JSON.parse(
  //     (localStorage.getItem("pinned") as string) || "[]"
  //   );
  //   setPinned(pinned);
  //   handleFetchSearchResults();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [showBookmarks === true]);

  useEffect(() => {
    if (!isOpen) {
      dispatch({ type: "HIDE_BOOKMARKS" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleFetchSearchResults = async () => {
    const pinned = JSON.parse(
      (localStorage.getItem("pinned") as string) || "[]"
    );

    if (!pinned) {
      return;
    }

    try {
      const response = await fetch("/api/tools", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pinned }),
      });
      const { data } = await response.json();
      setTools(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!showBookmarks) {
    return null;
  }

  return (
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
              <h2>Your Pinned Tools</h2>
            </ModalHeader>
            <ModalBody className="mb-8">
              <List data={tools} pinned={bookmarks} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
