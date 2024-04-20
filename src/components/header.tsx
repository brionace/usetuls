"use client";
import React, { useContext, useState } from "react";
import {
  Link,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Image,
} from "@nextui-org/react";
import {
  MdMoreHoriz,
  MdSearch,
  MdMenu,
  MdChevronLeft,
  MdChevronRight,
  MdMoreVert,
  MdAdd,
  MdBookmarks,
  MdExpandMore,
  MdExpandLess,
} from "react-icons/md";
import Search from "./search";
import { DataContext } from "@/app/data-provider";
import AddUrl from "@/components/add-url";
import Bookmarks from "./bookmarks";

export default function Header({ categories }: any) {
  const [showNav, setShowNav] = useState(false);
  const {
    state: { showAddUrl, showBookmarks, showSearch },
    dispatch,
  } = useContext(DataContext);

  const scrollLeft = () => {
    const el = document.querySelector(".scroll");
    if (el) {
      el.scrollLeft -= 100;
    }
  };

  const scrollRight = () => {
    const el = document.querySelector(".scroll");
    if (el) {
      el.scrollLeft += 100;
    }
  };

  return (
    <>
      <Search />
      <AddUrl />
      <Bookmarks />
      {/* <Search showSearch={showSearch} hideSearch={() => setShowSearch(false)} /> */}
      <div className="sticky top-0 z-50 shadow-small">
        <Navbar maxWidth="full" className="bg-inherit">
          <NavbarBrand className="flex gap-1 text-sm w-auto">
            <Link href="/" className="w-6 h-6">
              <img
                src="/logo.svg"
                alt="Usetuls logo"
                className="w-6 h-6 rounded-none"
              />
            </Link>
            <span className="hidden md:inline">Usetuls</span>
          </NavbarBrand>
          <NavbarContent
            justify="center"
            // className="relative whitespace-nowrap overflow-x-scroll scroll scroll-smooth scrollbar-hide hidden md:flex"
          >
            {/* <MdChevronLeft onClick={scrollLeft} size="sm" width={20} /> */}
            {/* <NavbarItem className="w-full">
            <ul className="flex items-start gap-4">
              {categories?.map((category: any) => (
                <li key={category.name}>
                  <Button
                    as={Link}
                    href={`/c/${category.slug}`}
                    variant="flat"
                    size="sm"
                    className="text-smaller"
                  >
                    {category.name}
                  </Button>
                </li>
              ))}
            </ul>
          </NavbarItem> */}
            {/* <MdChevronRight onClick={scrollRight} size="sm" /> */}
            <NavbarItem className="flex gap-3 p-1 rounded-full bg-slate-200">
              <Button
                // variant="light"
                size="sm"
                className="min-w-fit bg-transparent py-0"
                onPress={() => dispatch({ type: "SHOW_SEARCH" })}
              >
                <MdSearch />
                <span className="hidden sm:inline">Search for a tool</span>
              </Button>
              <span className="w-0.5 bg-slate-300 my-1"></span>
              <Button
                // variant="light"
                size="sm"
                className="flex min-w-fit bg-transparent py-0"
                onPress={() => setShowNav(!showNav)}
              >
                <span className="hidden sm:inline">Browse</span>
                <MdMoreVert />
                {/* {!showNav ? <MdExpandMore /> : <MdExpandLess />} */}
              </Button>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem>
              <Button
                // variant="light"
                size="sm"
                className="rounded-full min-w-fit"
                onPress={() => dispatch({ type: "SHOW_ADDURL" })}
              >
                <span className="hidden sm:inline">Add</span>
                <MdAdd />
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                // variant="light"
                size="sm"
                className="rounded-full min-w-fit"
                onPress={() => dispatch({ type: "SHOW_BOOKMARKS" })}
              >
                <span className="hidden sm:inline">Pin</span>
                <MdBookmarks />
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>

        {showNav ? (
          <nav className="backdrop-blur-xl backdrop-saturate-150 bg-inherit">
            <div className="flex justify-center whitespace-nowrap overflow-x-scroll scroll scroll-smooth scrollbar-hide border-t border-separate">
              {/* <MdChevronLeft onClick={scrollLeft} size="sm" width={20} /> */}
              <ul className="flex">
                {categories?.map((category: any) => (
                  <li key={category.name} className="m-3">
                    <Button
                      as={Link}
                      href={`/c/${category.slug}`}
                      variant="flat"
                      size="sm"
                      className="text-smaller"
                    >
                      {category.name}
                    </Button>
                  </li>
                ))}
              </ul>
              {/* <MdChevronRight onClick={scrollRight} size="sm" /> */}
            </div>
          </nav>
        ) : null}
      </div>
    </>
  );
}
