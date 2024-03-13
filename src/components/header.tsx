import React from "react";
import { Link } from "@nextui-org/react";
import categories from "@/data/categories.json";

export default function Header() {
  const categoryList = categories.map((category) => (
    <li key={category.name}>
      <Link isBlock href={`/tools/${category.id}`}>
        {category.name}
      </Link>
    </li>
  ));
  return (
    <header className="sticky top-0 flex w-full h-auto p-4 gap-4 align-center z-50 bg-slate-100">
      <Link href="/">
        <span className="font-bold text-inherit">Usetuls</span>
      </Link>
      <form className="flex items-center bg-slate-500 rounded-xl px-2">
        <input
          type="text"
          placeholder="Search"
          className="border-0 bg-transparent"
        />
        <button>Go</button>
      </form>
      <nav className="flex items-center">
        <span>{`Browse${categoryList && ":"}`}</span>
        {categoryList && <ul className="hidden sm:flex">{categoryList}</ul>}
        <button>More</button>
      </nav>
    </header>
  );
}
