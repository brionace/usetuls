"use client";
import Card from "@/components/card";
import Filter from "@/components/filter";
import { useContext, useEffect, useRef, useState } from "react";
import Sort from "./sort";
import { Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { MdMore } from "react-icons/md";
import { DataContext } from "@/app/data-provider";

export default function List({
  title,
  slug,
  data,
  categoryId,
  showSort,
  category,
}: {
  title?: string;
  slug?: string;
  data?: any;
  categoryId?: number;
  pinned?: number[];
  showSort?: boolean;
  category?: any;
}) {
  const [tools, setTools] = useState(data?.tools);
  const [tags, setTags] = useState(data?.tags);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const lastToolRef = useRef(null);
  const pathname = usePathname();

  const {
    state: { bookmarks, pricing },
  } = useContext(DataContext);

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
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (lastToolRef.current) {
      observer.observe(lastToolRef.current);
    }

    return () => {
      if (lastToolRef.current) {
        observer.unobserve(lastToolRef.current);
      }
    };
  }, [lastToolRef]);

  useEffect(() => {
    if (page <= 1) return;
    (async () => {
      try {
        const fetchResponse = await fetch("/api/tools", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ page, bookmarks, category }),
        });

        const res = await fetchResponse.json();

        setTools((prevTools: any) => {
          if (prevTools) return [...prevTools, ...res.data.tools];
          return res.data.tools;
        });
        setTags((prevTags: any) => {
          if (prevTags) return [...prevTags, ...res.data.tags];
          return res.data.tags;
        });
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  }, [page]);

  useEffect(() => {
    if (selectedTags.length) {
      (async () => {
        try {
          const fetchResponse = await fetch("/api/tools", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tag: categoryId,
              tags: selectedTags,
              category,
            }),
          });

          const res = await fetchResponse.json();
          setFilteredData(res?.data?.tools);
        } catch (error) {
          console.error("Error:", error);
        }
      })();
    } else {
      setFilteredData([]);
    }
  }, [selectedTags]);

  useEffect(() => {
    if (selectedSort) {
      (async () => {
        try {
          const fetchResponse = await fetch("/api/tools", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tag: categoryId,
              sort: selectedSort,
              category,
            }),
          });

          const res = await fetchResponse.json();
          setTools(res?.data?.tools);
        } catch (error) {
          console.error("Error:", error);
        }
      })();
    }
  }, [selectedSort]);

  const list = filteredData?.length ? filteredData : tools;

  return (
    <div className="max-w-[768px]">
      <div className="flex gap-3 justify-between items-center mb-6 pb-6 border-b-1">
        {/* <div className="flex gap-3 items-center">
          {title && <h2 className="text-2xl font-bold">{title}</h2>} &mdash;
          {slug && <Link href={`/browse/${slug}`}>View All</Link>}
        </div> */}
        {title && <h2 className="text-2xl font-bold">{title}</h2>}
        {showSort && (
          <Sort
            onSelectedSort={(sort) => setSelectedSort(sort)}
            pricing={pricing}
          />
        )}
        {slug && (
          <Link href={`/browse/${slug}`}>
            <MdMore />
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-6">
        {list?.map((tool: any) => (
          <Card key={tool.id} data={tool} pinned={bookmarks} />
        ))}
        {pathname !== "/" && (
          <div ref={lastToolRef} id="lastToolRef" className="h-1" />
        )}
      </div>
    </div>
  );
}
