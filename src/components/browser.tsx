import { DataContext } from "@/app/data-provider";
import { modalSettings } from "@/utils";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Image,
  Button,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useContext, useEffect } from "react";

export default function Browser({ categories }: { categories: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    state: { showBrowser },
    dispatch,
  } = useContext(DataContext);

  useEffect(() => {
    onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showBrowser === true]);

  useEffect(() => {
    if (!isOpen) {
      dispatch({ type: "HIDE_BROWSER" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const scrollLeft = () => {
    const el = document.querySelector(".scroll");
    if (el) {
      el.scrollLeft -= 100;
    }
  };

  const scrollRight = () => {
    const el = document.querySelector(".scroll");
    if (el) {
      el.scrollLeft += 100;
    }
  };

  if (!showBrowser) {
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
              <h2>Browse web tools</h2>
            </ModalHeader>
            <ModalBody className="mb-8">
              <div>
                {/* <MdChevronLeft onClick={scrollLeft} size="sm" width={20} /> */}
                {/* <ul className="flex justify-center whitespace-nowrap overflow-x-scroll scroll scroll-smooth scrollbar-hide border-t border-separate">
                  {categories?.map((category: any) => (
                    <li key={category.name} className="m-3">
                      <Button
                        as={Link}
                        href={`/c/${category.slug}`}
                        variant="flat"
                        size="sm"
                        className="text-smaller"
                      >
                        {category.name}
                      </Button>
                    </li>
                  ))}
                </ul> */}
                {/* <MdChevronRight onClick={scrollRight} size="sm" /> */}
              </div>
              <nav>
                <ul className="flex flex-wrap gap-3">
                  {categories?.map((category: any) => (
                    <li key={category.name}>
                      <Button
                        as={Link}
                        href={`/c/${category.slug}`}
                        variant="flat"
                        size="sm"
                        className="text-smaller"
                      >
                        {category.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              </nav>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
