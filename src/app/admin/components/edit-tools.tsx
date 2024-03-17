"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";

export default function EditTools({ data }: { data: any }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("opaque");

  return (
    <>
      <div
        key={data.id}
        onClick={() => {
          onOpen();
        }}
      >
        <img src={data.favicon} alt="" />
        <p>{data.title}</p>
      </div>
      {isOpen ? (
        <Modal
          backdrop={backdrop as "blur" | "transparent" | "opaque" | undefined}
          isOpen={isOpen}
          onClose={onClose}
          placement="center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>
                  <form>
                    <img src={data.favicon} alt="" />
                    <p>
                      <input
                        type="text"
                        id="favicon"
                        placeholder="Favicon"
                        value={data.favicon}
                      />
                    </p>
                    <p>
                      <input
                        type="text"
                        id="title"
                        placeholder="Title"
                        value={data.title}
                      />
                    </p>
                    <p>
                      <input
                        type="text"
                        id="url"
                        placeholder="Url"
                        value={data.url}
                      />
                    </p>
                    <p>
                      <textarea
                        id="description"
                        placeholder="Description"
                        defaultValue={data.description}
                      ></textarea>
                    </p>
                    <div className="flex gap-4">
                      <div>
                        <h2>Tags</h2>
                      </div>
                      <div>
                        <h2>Categories</h2>
                      </div>
                    </div>
                    <button type="submit">Submit</button>
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
