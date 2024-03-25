"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { usePathname } from "next/navigation";

type Banner = {
  content?: any;
  direction?: "text-center" | "text-right";
};

export default function Banner({ content, direction }: Banner) {
  const pathname = usePathname();
  return (
    <div className={`max-w-[700px] ${direction} py-6 px-4 text-balance`}>
      <h1
        className={`font-bold text-large ${
          pathname === "/"
            ? `bg-gradient-to-r from-purple-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text`
            : ``
        }`}
      >
        {content?.name}
      </h1>
      {content?.description ? <p>{content.description}</p> : null}
    </div>
  );
}
