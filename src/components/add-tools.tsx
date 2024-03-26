"use client";

import { isValidUrl } from "@/utils";
import {
  Modal,
  ModalContent,
  ModalHeader,
  Input,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { useState, type FormEvent, useEffect } from "react";
import { MdSearch } from "react-icons/md";

export default function AddTools() {
  const [url, setUrl] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (url !== "") {
      return;
    }

    const urls = localStorage.getItem("urls");

    if (!urls) {
      return;
    }

    const fetchData = async () => {
      try {
        const fetchResponse = await fetch("/admin/api/add-tools", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ urls }),
        });

        // const res = await fetchResponse.json();
        console.log("Response:", fetchResponse);

        localStorage.removeItem("urls");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [url]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleaneadContent = url.split(",");
    const validUrls = cleaneadContent.filter((url) => isValidUrl(url));

    localStorage.setItem("urls", JSON.stringify(validUrls));
    setUrl(""); // Clear the content
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setUrl(event.target.value);
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top"
      scrollBehavior="inside"
      className="m-4"
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
            <ModalHeader className="flex flex-col gap-1 pr-10">
              {""}
            </ModalHeader>
            <ModalBody>
              <form className="w-full">
                <Input
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="Enter url"
                  className="bg-transparent w-full focus:outline-none text-smaller"
                  onChange={(e) => setUrl(e.target.value)}
                  startContent={
                    <MdSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                  }
                />
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
