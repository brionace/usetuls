"use client";
import { DataContext } from "@/app/data-provider";
import React, { useContext } from "react";

export default function LaunchTool({
  slug,
  showTool,
}: {
  slug: string;
  showTool: () => void;
}) {
  const { dispatch } = useContext(DataContext);
  return (
    <button
      onClick={() => {
        // dispatch({ type: "SHOW_TOOL", payload: slug });
        showTool();
      }}
    >
      Launch app
    </button>
  );
}
