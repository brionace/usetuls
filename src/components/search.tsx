"use client";
import { use, useContext, useEffect, useState } from "react";
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
  const [searchResultsTools, setSearchResultsTools] = useState([]);
  const [searchResultsTags, setSearchResultsTags] = useState([]);
  const {
    state: { showSearch, showTool },
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

    setSearchResultsTools([]);
    setSearchResultsTags([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    if (showTool !== null) {
      dispatch({
        type: "HIDE_SEARCH",
      });
    }
  }, [showTool]);

  const handleFetchSearchResults = async () => {
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ term: search }),
      });
      const { data } = await response.json();
      setSearchResultsTools(data.tools);
      setSearchResultsTags(data.tags);
    } catch (error) {
      console.error(error);
    }
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
              Find a web tool
            </ModalHeader>
            <ModalBody className="mb-8">
              <form className="w-full">
                <Input
                  autoFocus
                  isClearable
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="Type to search"
                  defaultValue={search}
                  className="bg-transparent w-full focus:outline-none text-smaller"
                  onChange={(e) => setSearch(e.target.value)}
                  startContent={
                    <MdSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                  }
                />
              </form>
              <div className="flex gap-1 justify-around">
                {search && searchResultsTools.length > 0 ? (
                  <div>
                    <h3 className="my-3">Tools</h3>
                    <ul className="flex flex-col gap-2 pb-10">
                      {searchResultsTools?.map((result: any, index) => {
                        //   let title = result.title;
                        //   if (result.title) {
                        //     title = result.name;
                        //   }
                        return (
                          <li key={index}>
                            <Button
                              onClick={() => {
                                dispatch({
                                  type: "SHOW_TOOL",
                                  payload: result.id,
                                });
                              }}
                            >
                              {result.title}
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}
                {search && searchResultsTags.length > 0 ? (
                  <div>
                    <h3 className="my-3">Tags</h3>
                    <ul className="flex flex-col gap-2 pb-10">
                      {searchResultsTags?.map((result: any, index) => {
                        //   let title = result.title;
                        //   if (result.title) {
                        //     title = result.name;
                        //   }
                        return (
                          <li key={index}>
                            <Button as="a" href={`/c/${result.slug}`}>
                              {result.name}
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
