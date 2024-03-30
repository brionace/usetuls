"use client";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";

export default function EditTools({
  data,
  tags,
}: {
  data: any;
  categories?: any;
  tags?: any;
  tagged?: any;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("opaque");
  const [inputContent, setInputContent] = useState({
    id: data.id,
    favicon: data.favicon,
    title: data.title,
    url: data.url,
    description: data.description,
    tags: data.tags,
    is_published: data.is_published,
  });
  const tagsAsIntegers = data.tags?.map((tag: string) => parseInt(tag, 10));
  const [selectedTags, setSelectedTags] = useState<number[]>(tagsAsIntegers);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Extract and upload image if url is remote url
    const response = await fetch("/admin/api/edit-tools", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputContent, selectedTags }),
    });
    const data = await response.json();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // This should appear before the next condition as its a type:checkbox
    if (event.target.id === "is_published") {
      setInputContent({
        ...inputContent,
        ["is_published"]: !inputContent.is_published,
      });
      return;
    }

    if (event.target.type === "checkbox") {
      updateSelectedTags(Number(event.target.value));
      return;
    }

    setInputContent({
      ...inputContent,
      [event.target.id]: event.target.value,
    });
  };

  function updateSelectedTags(newItem: number) {
    // Check if the item already exists in the array
    const itemExists = selectedTags.some((item) => item === newItem);

    if (itemExists) {
      // If the item exists, create a new array without the item
      setSelectedTags(selectedTags.filter((item) => item !== newItem));
    } else {
      // If the item doesn't exist, add it to the array
      setSelectedTags(selectedTags.concat(newItem));
    }
  }

  return (
    <>
      <div
        key={data.id}
        onClick={() => {
          onOpen();
        }}
        className="w-40"
      >
        <img src={data.favicon} alt="" />
        <p>{data.title}</p>
      </div>
      {isOpen ? (
        <Modal
          backdrop={backdrop as "blur" | "transparent" | "opaque" | undefined}
          isOpen={isOpen}
          onClose={onClose}
          placement="top"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>
                  <form onSubmit={handleSubmit}>
                    <img src={data.favicon} alt="" />
                    <label>
                      Favicon
                      <br />
                      <input
                        type="text"
                        id="favicon"
                        placeholder="Favicon"
                        value={inputContent.favicon}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </label>
                    <label>
                      Title
                      <br />
                      <input
                        type="text"
                        id="title"
                        placeholder="Title"
                        value={inputContent.title}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </label>
                    <label>
                      Url
                      <br />
                      <input
                        type="text"
                        id="url"
                        placeholder="Url"
                        value={inputContent.url}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </label>
                    <label>
                      Description
                      <br />
                      <textarea
                        id="description"
                        placeholder="Description"
                        value={inputContent.description}
                        onChange={handleChange}
                        className="w-full"
                      ></textarea>
                    </label>
                    <div className="flex flex-col gap-4">
                      <p>Tags</p>
                      {tags?.map((tag: any) => {
                        const id = `tag-${tag.id}`;
                        return (
                          <div key={id}>
                            <input
                              type="checkbox"
                              id={id}
                              name={id}
                              value={tag.id}
                              checked={selectedTags?.includes(tag.id)}
                              onChange={handleChange}
                            />
                            <label htmlFor={id}>{tag.name}</label>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-end gap-4">
                      <div className="flex gap-1">
                        <input
                          type="checkbox"
                          id="is_published"
                          checked={inputContent.is_published}
                          onChange={handleChange}
                        />
                        <label htmlFor="is_published">PUBLISHED</label>
                      </div>
                      <button>Submit</button>
                    </div>
                  </form>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      ) : null}
    </>
  );
}
