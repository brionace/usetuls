"use client";
import { useState, useEffect } from "react";
import Checkbox from "@/components/checkbox";

const tags = ["asc/dec", "rating", "pinned"];

export default function Sort({
  onSelectedSort,
  pricing,
}: {
  onSelectedSort: (sort: string) => void;
  pricing: any;
}) {
  const [selectedSort, setSelectedSort] = useState<string>("");

  useEffect(() => {
    onSelectedSort(selectedSort);
  }, [selectedSort]);

  return (
    <nav className="overflow-y-hidden overflow-x-auto scrollbar-hide">
      <div className="flex gap-x-3">
        <Checkbox
          value={"name"}
          onChange={(value) => setSelectedSort(value.toString())} // Convert value to string
        >
          Name
        </Checkbox>
        {pricing?.map((price: any) => (
          <Checkbox
            key={price.id}
            value={price.name}
            onChange={(value) => setSelectedSort(value.toString())} // Convert value to string
          >
            {price.name}
          </Checkbox>
        ))}
      </div>
    </nav>
  );
}
