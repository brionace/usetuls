"use client";
import { useState, useEffect } from "react";
import Checkbox from "@/components/checkbox";

export default function Fitler({
  tags,
  onSelectedTagsChange,
}: {
  tags: any;
  onSelectedTagsChange: (tags: number[]) => void;
}) {
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  useEffect(() => {
    onSelectedTagsChange(selectedTags);
  }, [selectedTags]);

  function addRemoveSelectedTags(value: number) {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(value)) {
        // If the tag is already in the array, remove it
        return prevTags.filter((t) => t !== value);
      }

      return [...prevTags, value];
    });
  }

  return (
    <nav className="overflow-y-hidden overflow-x-auto scrollbar-hide mb-6">
      <div className="flex gap-x-3">
        {tags?.map((tag: any) => (
          <Checkbox
            key={tag.id}
            value={tag.id}
            onChange={(value) => addRemoveSelectedTags(value)}
          >
            {tag.name}
          </Checkbox>
        ))}
      </div>
    </nav>
  );
}
