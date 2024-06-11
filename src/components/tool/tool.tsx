"use client";
import { MdOpenInNew } from "react-icons/md";
import { Bookmark, ExternalLink } from "@/components/user-action";
import { Button, Link } from "@nextui-org/react";
import Reviews from "../reviews";

type ToolProps = {
  icon?: React.ReactNode;
  data: any;
  children?: React.ReactNode;
  pinned?: number[];
};

export default function Tool({ icon, data, pinned }: ToolProps) {
  const { id, title, description, url } = data;
  // async function fetchToolData() {
  //   try {
  //     const response = await fetch("/api/tools/?slug=" + showTool);
  //     const {
  //       data: { tools },
  //     } = await response.json();

  //     setToolData(tools[0]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <div className="w-full max-w-[800px] mx-auto px-6">
      <div className="sticky top-0 mb-6">
        <div className="flex flex-col gap-3">
          <div className="mt-12">{icon}</div>
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between my-3">
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="flex gap-3">
              <Bookmark id={id} />
              <ExternalLink url={url} />
            </div>
          </div>
          {/* {onClose && (
          <button onClick={onClose}>
            <MdArrowBack />
          </button>
        )} */}
        </div>
      </div>
      <div className="mb-16">
        <p className="mb-12">{description}</p>

        <h2 className="font-bold mb-7">Reviews</h2>
        <div className="bg-gray-50 mb-12 px-4 py-6 text-center rounded-md">
          <p className="mb-3 text-gray-400">{`Have you used ${title} before? How would you rate it?`}</p>
          <Button color="primary">{`Rate ${title}`}</Button>
        </div>
        <Reviews />
      </div>
    </div>
  );
}
