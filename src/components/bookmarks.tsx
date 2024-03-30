import { DataContext } from "@/app/data-provider";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Image,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useContext, useEffect } from "react";

export default function Bookmarks() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    state: { showBookmarks },
    dispatch,
  } = useContext(DataContext);

  useEffect(() => {
    onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showBookmarks]);

  useEffect(() => {
    if (!isOpen) {
      dispatch({ type: "HIDE_BOOKMARKS" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!showBookmarks) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="outside"
      size="full"
      placement="top"
      className="m-0"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex gap-1 pr-10">
              <Link href="/" className="w-6 h-6">
                <Image
                  src="/logo.png"
                  alt="Usetuls logo"
                  className="w-6 h-6 rounded-none"
                />
              </Link>
              {/* <span className="hidden md:inline">Usetuls</span> */}
            </ModalHeader>
            <ModalBody className="mb-8">
              <div className="flex flex-col gap-4 place-self-center text-center">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-medium">Bookmarks</h2>
                  <p className="text-sm text-gray-500">
                    You have no bookmarks yet.
                  </p>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
