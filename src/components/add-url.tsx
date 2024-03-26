"use client";

import { isValidUrl } from "@/utils";
import {
  Modal,
  ModalContent,
  ModalHeader,
  Input,
  ModalBody,
  useDisclosure,
  Button,
  Textarea,
  Spinner,
} from "@nextui-org/react";
import { useState, type FormEvent, useEffect, useContext } from "react";
import { MdChevronLeft } from "react-icons/md";
import { DataContext } from "@/app/data-provider";
import * as cheerio from "cheerio";

export default function AddUrl() {
  const [url, setUrl] = useState("");
  const [step, setStep] = useState(1); // [1, 2, 3
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [favicon, setFavicon] = useState("");
  const [error, setError] = useState({ url: "" });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    state: { showAddUrl, showSpinner },
    dispatch,
  } = useContext(DataContext);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAddUrl]);

  useEffect(() => {
    if (!isOpen) {
      dispatch({ type: "HIDE_ADDURL" });
      dispatch({ type: "HIDE_SPINNER" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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

  async function fetchCategories() {
    try {
      const response = await fetch("/api/categories");
      const { data } = await response.json();
      // Process the data here
      setCategories(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function fetchTags() {
    try {
      const response = await fetch("/api/tags");
      const { data } = await response.json();
      // Process the data here
      setTags(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

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

  if (!showAddUrl) {
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
            <ModalHeader className="flex gap-2 items-center">
              {step > 1 && (
                <MdChevronLeft
                  onClick={() => {
                    const s = step > 1 ? step - 1 : 1;
                    setStep(s);
                  }}
                />
              )}
              Suggest a new tool
            </ModalHeader>
            <ModalBody className="mb-8">
              {step === 1 ? (
                <form
                  className="flex flex-col gap-3 md:flex-row w-full"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    // const formData = new FormData(e.target as HTMLFormElement);
                    // const url = formData.get("url") as string;

                    if (!isValidUrl(url)) {
                      setError({ url: "Url maybe invalid" });
                      return;
                    }

                    setError({ ...error, url: "" });
                    dispatch({ type: "SHOW_SPINNER" });

                    // const proxyUrl = "https://cors-anywhere.herokuapp.com/";
                    // const rawhtml = await fetch(proxyUrl + url, {
                    //   mode: "no-cors",
                    // })
                    //   .then((res) => {
                    //     console.log("Response:", res);
                    //     return res.json();
                    //   })
                    //   .catch((error) => {
                    //     console.error("Error:", error);
                    //   })
                    //   .finally(() => {
                    //     // dispatch({ type: "HIDE_SPINNER" });
                    //     // setStep(2);
                    //   });
                    // const html = rawhtml.text();
                    const html = await (
                      await fetch(url, { mode: "no-cors" })
                    ).text(); // html as text
                    // const doc = new DOMParser().parseFromString(html, "text/html");
                    const $ = cheerio.load(html);
                    const title = $("title").text();
                    const description = $("meta[name='description']").attr(
                      "content"
                    );
                    const favicon =
                      $("link[rel='icon']").attr("href") ||
                      $("meta[property='og:image']").attr("content");
                    const icon = isValidUrl(favicon as string)
                      ? favicon
                      : url + favicon;

                    setTitle(title);
                    setDescription(description || "");
                    setFavicon(icon || "");

                    // const cats = await fetchCategories();
                    // const tags = await fetchTags();

                    // console.log({ cats, tags });

                    // setCategories(cats);
                    // setTags(tags);

                    dispatch({ type: "HIDE_SPINNER" });
                    setStep(2);

                    // function fetchData() {
                    //   fetch("/admin/api/add-tools", {
                    //     method: "POST",
                    //     headers: {
                    //       "Content-Type": "application/json",
                    //     },
                    //     body: JSON.stringify({ url }),
                    //   })
                    //     .then((res) => {
                    //       console.log("Response:", res);
                    //     })
                    //     .catch((error) => {
                    //       console.error("Error:", error);
                    //     })
                    //     .finally(() => {
                    //       dispatch({ type: "HIDE_SPINNER" });
                    //       setStep(2);
                    //     });
                    // }
                  }}
                >
                  <Input
                    autoFocus
                    autoComplete="off"
                    spellCheck="false"
                    placeholder="Enter url"
                    className="bg-transparent w-full focus:outline-none text-smaller"
                    type="url"
                    onChange={(e) => setUrl(e.target.value)}
                    errorMessage={error["url"]}
                  />
                  <Button type="submit" disabled={showSpinner}>
                    {showSpinner ? <Spinner size="sm" /> : null}
                    Add Url
                  </Button>
                </form>
              ) : null}

              {step == 2 ? (
                <form className="flex flex-col gap-3">
                  <div>
                    <img
                      src={favicon}
                      alt="favicon"
                      className="w-8 h-8 rounded-md"
                    />
                    <Textarea
                      label="Favicon Url"
                      defaultValue={favicon}
                      onChange={(e) => setFavicon(e.target.value)}
                    />
                  </div>
                  <Input
                    isReadOnly
                    type="url"
                    label="Url"
                    // variant="bordered"
                    defaultValue={url}
                  />
                  <Textarea
                    label="Site name"
                    defaultValue={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Textarea
                    label="Description"
                    defaultValue={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Button
                    onClick={() => {
                      console.log("Submit form");
                    }}
                    type="submit"
                  >
                    Submit
                  </Button>
                </form>
              ) : null}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
