"use client";

import React from "react";
import { Link, Button } from "@nextui-org/react";
import categories from "@/data/categories.json";
import { MdMoreHoriz, MdSearch, MdMenu } from "react-icons/md";

export default function Header() {
  const [categoryListOpen, setCategoryListOpen] = React.useState(false);

  const categoryFeatList = categories.map((category) => (
    <li key={category.name}>
      <Link isBlock href={`/tools/${category.id}`}>
        {category.name}
      </Link>
    </li>
  ));
  const categoryList = categories.map((category) => (
    <li key={category.name}>
      <Link isBlock href={`/tools/${category.id}`}>
        {category.name}
      </Link>
    </li>
  ));

  return (
    <div className="flex flex-col sticky top-0 h-auto py-2 px-4 gap-4 align-center z-50 bg-slate-500 dark:bg-black border-b border-slate-500">
      <header className="flex w-full gap-4">
        <Link href="/" size="sm">
          <span className="font-bold text-inherit">Usetuls</span>
        </Link>
        {/* <form className="flex items-center bg-slate-500 rounded-xl px-2">
        <input
          type="text"
          placeholder="Search"
          className="border-0 bg-transparent"
        />
        <button>Go</button>
      </form> */}
        <Button
          startContent={<MdSearch />}
          variant="flat"
          size="sm"
          className="min-w-8"
        >
          <span className="hidden sm:flex">Search</span>
        </Button>
        <nav className="flex items-center  whitespace-nowrap overflow-auto">
          {/* {categoryFeatList && (
            <ul className="hidden sm:flex">{categoryFeatList}</ul>
          )}
          <Button
            variant="bordered"
            size="sm"
            endContent={<MdMenu />}
            onClick={() => setCategoryListOpen(!categoryListOpen)}
          >
            Categories
          </Button> */}
          <ul className="flex gap-4 h-auto">{categoryList}</ul>
        </nav>
      </header>
      {categoryListOpen && (
        <nav className="flex justify-center">
          <ul className="flex gap-4 h-auto whitespace-nowrap overflow-auto">
            {categoryList}
          </ul>
        </nav>
      )}
    </div>
  );
}
