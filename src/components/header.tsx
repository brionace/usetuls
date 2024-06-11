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
import Search from "@/components/search";
import { DataContext } from "@/app/data-provider";
import AddUrl from "@/components/add-url";
import Bookmarks from "@/components/bookmarks";
import { LoginForm } from "./auth-components";

export default function Header() {
  const { dispatch } = useContext(DataContext);

  return (
    <>
      <Search />
      <AddUrl />
      {/* <Search showSearch={showSearch} hideSearch={() => setShowSearch(false)} /> */}
      <Navbar maxWidth="full">
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
              onPress={() => dispatch({ type: "SHOW_CATEGORIES" })}
            >
              <span className="hidden sm:inline">Categories</span>
              <MdMoreVert />
              {/* {!showNav ? <MdExpandMore /> : <MdExpandLess />} */}
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <LoginForm />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}
