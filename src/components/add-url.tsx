"use client";

import { isValidImage, isValidUrl } from "@/utils";
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
  Select,
  SelectItem,
  Checkbox,
  Radio,
  RadioGroup,
  ModalFooter,
} from "@nextui-org/react";
import { useState, type FormEvent, useEffect, useContext, use } from "react";
import { MdChevronLeft } from "react-icons/md";
import { DataContext } from "@/app/data-provider";

type ErrorType = {
  url?: string;
  description?: string;
  title?: string;
  favicon?: string;
  tags?: string;
};

export default function AddUrl() {
  const [url, setUrl] = useState("");
  const [step, setStep] = useState(1); // [1, 2, 3
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [favicon, setFavicon] = useState("");
  const [error, setError] = useState<ErrorType>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    state: { showAddUrl, showSpinner },
    dispatch,
  } = useContext(DataContext);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [suggestedTag, setSuggestedTag] = useState("");
  const [success, setSuccess] = useState<Record<string, string>>({});
  const [userEmail, setUserEmail] = useState("");

  // TODO: Check performance issues when running this component

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

  // useEffect(() => {
  //   if (url !== "") {
  //     return;
  //   }

  //   const urls = localStorage.getItem("urls");

  //   if (!urls) {
  //     return;
  //   }

  //   const fetchData = async () => {
  //     try {
  //       const fetchResponse = await fetch("/admin/api/add-tools", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ urls }),
  //       });

  //       // const res = await fetchResponse.json();
  //       console.log("Response:", fetchResponse);

  //       localStorage.removeItem("urls");
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchData();
  // }, [url]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTags();
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [url]);

  useEffect(() => {
    if (!success) {
      dispatch({ type: "HIDE_SPINNER" });
      return;
    }

    setFavicon("");
    setTitle("");
    setDescription("");
    setUrl("");
    setSelectedTags([]);
    setSuggestedTag("");
    dispatch({ type: "HIDE_SPINNER" });
  }, [success]);

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

    dispatch({ type: "SHOW_SPINNER" });

    let hasError = false;
    const isRequiredMessage = "Field is required";
    const isInvalidMessage = "Field is invalid";

    if (!title) {
      setError({ ...error, title: isRequiredMessage });
      hasError = true;
    } else if (typeof title === "string") {
      setError({ ...error, title: isInvalidMessage });
      hasError = true;
    } else {
      setError({ ...error, title: "" });
      hasError = false;
    }

    if (!description) {
      setError({ ...error, description: isRequiredMessage });
      hasError = true;
    } else if (typeof description === "string") {
      setError({ ...error, description: isInvalidMessage });
      hasError = true;
    } else {
      setError({ ...error, description: "" });
      hasError = false;
    }

    if (!favicon) {
      setError({ ...error, favicon: isRequiredMessage });
      hasError = true;
    } else if (!isValidImage(favicon)) {
      setError({ ...error, favicon: isInvalidMessage });
      hasError = true;
    } else {
      setError({ ...error, favicon: "" });
      hasError = false;
    }

    if (!url) {
      setError({ ...error, url: isRequiredMessage });
      hasError = true;
    } else if (!isValidUrl(url)) {
      setError({ ...error, url: isInvalidMessage });
      hasError = true;
    } else {
      setError({ ...error, url: "" });
      hasError = false;
    }

    if (!selectedTags.length || suggestedTag.length < 1) {
      setError({ ...error, tags: "Please select a tag or suggest one." });
      hasError = true;
    }

    if (hasError) {
      dispatch({ type: "HIDE_SPINNER" });
      return;
    }

    const insertToDB = async () => {
      try {
        const fetchResponse = await fetch("/api/add-tools", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            favicon,
            url,
            selectedTags,
            suggestedTag,
            userEmail,
          }),
        });

        const res = await fetchResponse.json();

        setSuccess(res);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    insertToDB();
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
                    setSuccess({});
                  }}
                />
              )}
              Suggest a new web tool
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

                    setError({});
                    dispatch({ type: "SHOW_SPINNER" });

                    const response = await fetch("/api/url", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ url }),
                    });
                    const { title, description, favicon } =
                      await response.json();

                    setTitle(title);
                    setDescription(description || "");
                    setFavicon(favicon || "");

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
                    defaultValue={url}
                    errorMessage={error?.url}
                  />
                  <Button type="submit" disabled={showSpinner}>
                    {showSpinner ? <Spinner size="sm" /> : null}
                    Add Url
                  </Button>
                </form>
              ) : null}

              {step == 2 ? (
                <form
                  id="add-url-form"
                  className="flex flex-col gap-3"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <div className="flex gap-3 items-center">
                    <img
                      src={favicon}
                      alt="favicon"
                      className="w-8 h-8 rounded-md"
                    />
                    <div className="flex gap-2">
                      <Input
                        label="Favicon Url"
                        defaultValue={favicon}
                        errorMessage={error?.favicon}
                        onChange={(e) => setFavicon(e.target.value)}
                      />
                      <Input
                        isReadOnly
                        type="url"
                        label="Website Url"
                        // variant="bordered"
                        defaultValue={url}
                        errorMessage={error?.url}
                      />
                    </div>
                  </div>

                  <Textarea
                    label="Name e.g Google Docs"
                    defaultValue={title}
                    errorMessage={error?.title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Textarea
                    label="Description"
                    defaultValue={description}
                    errorMessage={error?.description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div className="flex gap-3">
                    <div>
                      <p className="text-foreground-500 mb-2">Select tags</p>
                      {tags.map((tag: any) => (
                        <div key={tag.id}>
                          <Checkbox
                            required
                            value={tag.id}
                            className="mb-1"
                            onChange={(e) =>
                              setSelectedTags((prevTags) => {
                                if (e.target.checked) {
                                  // If the checkbox is being checked, add the value to the array
                                  return [
                                    ...new Set([
                                      ...prevTags,
                                      Number(e.target.value),
                                    ]),
                                  ];
                                } else {
                                  // If the checkbox is being unchecked, remove the value from the array
                                  return prevTags.filter(
                                    (tag) => tag !== Number(e.target.value)
                                  );
                                }
                              })
                            }
                          >
                            {tag.name}
                          </Checkbox>
                        </div>
                      ))}
                    </div>
                    <Input
                      label="Add new tag"
                      value={suggestedTag}
                      onChange={(e) => {
                        setSuggestedTag(e.target.value);
                      }}
                    />
                  </div>
                </form>
              ) : null}
            </ModalBody>
            {step == 2 ? (
              <ModalFooter className="flex gap-3">
                {success.type === "success" ? (
                  <>
                    <p className="text-sm text-success">{success.message}</p>
                    <Button onClick={() => onOpen()}>Close</Button>
                  </>
                ) : (
                  <>
                    <div className="w-full">
                      {error ? (
                        Object.entries(error).map(([key, value]) => (
                          <p key={key} className="text-sm text-danger">
                            {value}
                          </p>
                        ))
                      ) : (
                        <Input
                          type="email"
                          label="Enter your email (optional)"
                          size="sm"
                          onChange={(e) => setUserEmail(e.target.value)}
                        />
                      )}

                      {/* <Input
                      type="text"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const reader = new FileReader();

                        reader.onload = () => {
                          setFavicon(reader.result as string);
                        };

                        reader.readAsDataURL(file);
                      }} /> */}
                    </div>
                    <Button
                      type="submit"
                      form="add-url-form"
                      disabled={showSpinner}
                    >
                      {showSpinner ? <Spinner size="sm" /> : null}
                      Submit
                    </Button>
                  </>
                )}
              </ModalFooter>
            ) : null}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
