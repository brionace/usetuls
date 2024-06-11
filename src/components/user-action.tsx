"use client";
import { Button, Link, user } from "@nextui-org/react";
import React, { use, useContext, useEffect, useState } from "react";
import {
  MdMoreVert,
  MdBookmarkAdded,
  MdOutlineBookmarkAdd,
  MdOpenInNew,
} from "react-icons/md";
import { DataContext } from "@/app/data-provider";
import { url } from "inspector";
import error from "next/error";

export function Bookmark({ id }: { id: number | string }) {
  const [bookmarked, setBookmarked] = useState(false);
  const {
    state: { user, bookmarks },
    dispatch,
  } = useContext(DataContext);

  useEffect(() => {
    if (bookmarks.includes(id)) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
    }
  }, [bookmarks]);

  function addToPinned() {
    const pinnedItems = localStorage.getItem("pinned");
    let pinnedArray = [];
    if (pinnedItems) {
      pinnedArray = JSON.parse(pinnedItems);
    }
    if (pinnedArray.includes(id)) {
      pinnedArray = pinnedArray.filter((id: number) => id !== id);
      localStorage.setItem("pinned", JSON.stringify(pinnedArray));
      // cleanup localStorage if there are no pinned items
      if (pinnedArray.length === 0) {
        localStorage.removeItem("pinned");
      }
      return;
    }
    pinnedArray = [...pinnedArray, id];
    localStorage.setItem("pinned", JSON.stringify(pinnedArray));
  }

  const pinItem = async () => {
    const response = await fetch("/api/bookmarks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        toggle: bookmarked ? "remove" : "add",
        user_id: user?.id,
        tool_id: id,
      }),
    });

    if (!response.ok) {
      console.error(error);
      return;
    }

    dispatch({
      type: bookmarked ? "DELETE_BOOKMARK" : "ADD_BOOKMARK",
      payload: id,
    });
  };

  return (
    <Button isIconOnly onPress={() => pinItem()}>
      {bookmarked ? <MdBookmarkAdded /> : <MdOutlineBookmarkAdd />}
    </Button>
  );
}

export function ExternalLink({ url }: { url: string }) {
  return (
    <Button as={Link} href={url} isExternal isIconOnly>
      <MdOpenInNew />
    </Button>
  );
}

export function Expand({ id }: { id: number | string }) {
  const { dispatch } = useContext(DataContext);
  return (
    <Button
      color="default"
      variant="light"
      size="sm"
      isIconOnly
      className="flex flex-column justify-center w-[30px] h-[30px] rounded-full !bg-transparent hover:!bg-default"
      onClick={() => {
        dispatch({
          type: "HIDE_CATEGORIES",
        });
        dispatch({
          type: "SHOW_TOOL",
          payload: id,
        });
      }}
    >
      <MdMoreVert />
      {/* <span>View</span> */}
    </Button>
  );
}
