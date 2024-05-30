"use client";
import LaunchTool from "@/components/launchTool";
import REfillTank from "@/components/refill-tank";
import Tool from "@/components/tool/tool";
import React, { useState } from "react";

export default function ClientComponent({
  id,
  slug,
  title,
  description,
  icon,
}: {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}) {
  const [showTool, setShowTool] = useState(false);

  return (
    <>
      <p>{description}</p>
      {/* <LaunchTool slug={slug} showTool={() => setShowTool(true)} /> */}
      <button onClick={() => setShowTool(true)}>Show app</button>
      <Tool id={id} icon={icon} title={title} description={description}>
        <REfillTank />
      </Tool>
    </>
  );
}
