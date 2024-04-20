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
  }, [showBookmarks === true]);

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
      size="lg"
      placement="top"
      className="m-4"
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
              <div className="flex flex-col gap-4 place-self-center text-center">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-gray-500">
                    You have no pinned tools yet.
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
