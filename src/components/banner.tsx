import React from "react";
import { Card, CardBody } from "@nextui-org/react";

type Banner = {
  content?: { id?: string; name: string; description?: string };
  direction?: "text-center" | "text-right";
};

export default function Banner({ content, direction }: Banner) {
  return (
    <div className={`max-w-[700px] p-4 ${direction}`}>
      <h1 className="font-bold text-large">{content?.name}</h1>
      {content?.description ? <p>{content.description}</p> : null}
    </div>
  );
}