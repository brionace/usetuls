"use client";
import { useEffect, useState } from "react";
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

export default function Search({
  showSearch,
  hideSearch,
}: {
  showSearch?: boolean;
  hideSearch?: () => void;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    onOpen();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSearch]);

  useEffect(() => {
    hideSearch && hideSearch();
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
              <form className="flex gap-3 items-center rounded-full bg-slate-300 py-1 px-2 w-full">
                <MdSearch />
                <input
                  autoFocus
                  type="search"
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="Find tools"
                  className="bg-transparent w-full focus:outline-none text-smaller"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
            </ModalHeader>
            <ModalBody>
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
