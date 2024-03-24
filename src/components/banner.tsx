import React from "react";
import { Card, CardBody } from "@nextui-org/react";

type Banner = {
  content?: any;
  direction?: "text-center" | "text-right";
};

export default function Banner({ content, direction }: Banner) {
  return (
    <div className={`max-w-[700px] ${direction} py-6 px-4 text-balance`}>
      <h1 className="font-bold text-large">{content?.name}</h1>
      {content?.description ? <p>{content.description}</p> : null}
    </div>
  );
}
