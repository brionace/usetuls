"use client";
import { useContext, useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { DataContext } from "@/app/data-provider";

export default function Search() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const {
    state: { showSearch },
    dispatch,
  } = useContext(DataContext);

  useEffect(() => {
    onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSearch]);

  useEffect(() => {
    if (!isOpen) {
      dispatch({ type: "HIDE_SEARCH" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (search.length > 0) {
      handleFetchSearchResults();
      return;
    }

    setSearchResults([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleFetchSearchResults = async () => {
    const response = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ term: search }),
    });
    const { data } = await response.json();
    setSearchResults(data);
  };

  if (!showSearch) {
    return null;
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
              Search
            </ModalHeader>
            <ModalBody className="mb-8">
              <form className="w-full">
                <Input
                  autoFocus
                  isClearable
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="Find tools"
                  className="bg-transparent w-full focus:outline-none text-smaller"
                  onChange={(e) => setSearch(e.target.value)}
                  startContent={
                    <MdSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                  }
                />
              </form>
              {searchResults.length ? (
                <ul className="flex flex-col gap-2 pb-10">
                  {searchResults?.map((result: any, index) => {
                    //   let title = result.title;
                    //   if (result.title) {
                    //     title = result.name;
                    //   }
                    return (
                      <li key={index}>
                        {result.title ? (
                          <Link href={``}>{result.title}</Link>
                        ) : (
                          <Link href={`/c/${result.slug}`}>{result.name}</Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
