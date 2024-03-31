"use client";
import { useContext, useEffect, useState } from "react";
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
import { DataContext } from "@/app/data-provider";
import { MdOpenInNew, MdBookmark } from "react-icons/md";
import { isSVGFormatImage } from "@/utils";

type ToolProps = {
  id: number;
  favicon: string;
  title: string;
  description: string;
  url: string;
};

export default function Tool() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("opaque");
  const [toolData, setToolData] = useState<ToolProps | null>(null);
  const {
    state: { showTool },
    dispatch,
  } = useContext(DataContext);

  useEffect(() => {
    if (showTool === null) {
      onClose();
      return;
    }

    fetchToolData();
    onOpen();
  }, [showTool]);

  useEffect(() => {
    if (!isOpen) {
      setToolData(null);
      dispatch({ type: "HIDE_TOOL" });
    }
  }, [isOpen]);

  async function fetchToolData() {
    try {
      const response = await fetch("/api/tool/?id=" + showTool);
      const { data } = await response.json();

      setToolData(data[0]);
    } catch (error) {
      console.error(error);
    }
  }

  if (!toolData) return null;

  const { favicon, title, description, url } = toolData;

  const faviconUrl = `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_FAVICON_URL}/${favicon}`;
  const SVGImage = () => {
    if (!isSVGFormatImage(faviconUrl)) {
      return null;
    }
    return faviconUrl;
  };

  return (
    <Modal
      backdrop={backdrop as "blur" | "transparent" | "opaque" | undefined}
      isOpen={isOpen}
      onClose={onClose}
      placement="top"
    >
      <ModalContent className="pb-3">
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center">
              <Avatar
                src={faviconUrl}
                radius="md"
                size="md"
                color="default"
                showFallback
                name={title.slice(0, 1)}
                className="p-2 bg-blend-normal bg-gradient-to-bl from-[#f6f6f6] to-[#fdfafa]"
              />
              <h4 className="font-medium ml-3">{title}</h4>
            </ModalHeader>
            <ModalBody>
              <p>{description}</p>
            </ModalBody>
            <ModalFooter className="flex gap-2 justify-evenly [&>*]:bg-default">
              <Button
                as={Link}
                href={url}
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
                <MdBookmark />
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}