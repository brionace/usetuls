"use client";
import Card from "@/components/card";
import Filter from "@/components/filter";
import { useEffect, useState } from "react";

export default function List({
  data,
  categoryId,
}: {
  data?: any;
  categoryId?: number;
}) {
  const [tools, setTools] = useState(data.tools);
  const [tags, setTags] = useState(data.tags);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [filteredData, setFilteredData] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const fetchResponse = await fetch("/api/tools", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ tag: categoryId }),
  //       });

  //       const res = await fetchResponse.json();
  //       setTools(res.data.tools);
  //       setTags(res.data.tags);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    if (selectedTags.length) {
      (async () => {
        try {
          const fetchResponse = await fetch("/api/tools", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tag: categoryId, tags: selectedTags }),
          });

          const res = await fetchResponse.json();
          setFilteredData(res.data.tools);
        } catch (error) {
          console.error("Error:", error);
        }
      })();
    } else {
      setFilteredData([]);
    }
  }, [selectedTags]);

  const list = filteredData?.length ? filteredData : tools;

  return (
    <div className="max-w-[768px]">
      <div className="flex">
        <span>Filter:</span>
        <Filter
          tags={tags}
          onSelectedTagsChange={(tags) => setSelectedTags(tags)}
        />
      </div>
      <div className="flex flex-col gap-4">
        {list?.map((d: any) => (
          <Card key={d.id} data={d} />
        ))}
      </div>
    </div>
  );
}
