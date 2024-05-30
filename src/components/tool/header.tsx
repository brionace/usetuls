import { Button, Link } from "@nextui-org/react";
import { url } from "inspector";
import React from "react";
import { MdArrowBack, MdOpenInNew } from "react-icons/md";
import { Pin } from "../user-action";

export default function ToolHeader({
  icon,
  title,
  url,
  id,
  onClose,
}: {
  icon?: React.ReactNode;
  title: string;
  onClose?: () => void;
  url?: string;
  id: number;
}) {
  return (
    <nav className="sticky top-0 mb-4">
      <div className="flex flex-col gap-3">
        <div>{icon}</div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex flex-col md:flex-row gap-4 justify-between border-y my-3">
          <span>Likes</span>
          <div className="flex gap-3">
            <Pin id={id} />
            <Button
              as={Link}
              href={url}
              // size="sm"
              isExternal
              // color="default"
              // variant="light"
              isIconOnly
              className="flex flex-column justify-center w-[30px] h-[30px] rounded-full !bg-transparent hover:!bg-default"
            >
              <MdOpenInNew />
            </Button>
          </div>
        </div>
        {/* {onClose && (
          <button onClick={onClose}>
            <MdArrowBack />
          </button>
        )} */}
      </div>
    </nav>
  );
}
