import { Button } from "@nextui-org/react";
import React, { useContext } from "react";
import { MdBookmark, MdMoreVert } from "react-icons/md";
import { DataContext } from "@/app/data-provider";

export function Pin({ id }: { id: number | string }) {
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

  return (
    <Button
      color="default"
      variant="light"
      size="sm"
      isIconOnly
      className="flex flex-column justify-center w-[30px] h-[30px] rounded-full !bg-transparent hover:!bg-default"
      onPress={addToPinned}
    >
      <MdBookmark />
      {/* <span>Save</span> */}
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
          type: "HIDE_BROWSER",
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
