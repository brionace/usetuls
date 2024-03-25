"use client";

import React from "react";
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
} from "react-icons/md";
import Search from "./search";

export default function Header({ categories }: any) {
  const [showSearch, setShowSearch] = React.useState(false);
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
    <div className="sticky top-0 border-b border-slate-100 z-50 bg-white">
      <Search showSearch={showSearch} hideSearch={() => setShowSearch(false)} />
      <Navbar maxWidth="full">
        <NavbarBrand className="flex gap-1 text-sm w-auto">
          <Link href="/" className="w-6 h-6">
            <Image
              src="/logo.png"
              alt="Usetuls logo"
              className="w-6 h-6 rounded-none"
            />
          </Link>
          <span>Usetuls</span>
        </NavbarBrand>
        <NavbarContent
          justify="center"
          className="relative whitespace-nowrap overflow-x-scroll scroll scroll-smooth scrollbar-hide hidden md:flex"
        >
          {/* <MdChevronLeft onClick={scrollLeft} size="sm" width={20} /> */}
          <NavbarItem className="w-full">
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
          </NavbarItem>
          {/* <MdChevronRight onClick={scrollRight} size="sm" /> */}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              variant="light"
              size="sm"
              className="rounded-full min-w-fit"
              onPress={() => setShowSearch(!showSearch)}
            >
              <MdSearch /> <span className="hidden sm:inline">Search</span>
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              variant="light"
              size="sm"
              className="rounded-full min-w-fit"
            >
              <MdAdd />
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              variant="light"
              size="sm"
              className="rounded-full min-w-fit"
            >
              <MdBookmarks />
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <nav className="md:hidden w-full px-6 pb-4 relative whitespace-nowrap overflow-x-scroll scroll scroll-smooth scrollbar-hide justify-center">
        {/* <MdChevronLeft onClick={scrollLeft} size="sm" width={20} /> */}
        <ul className="flex gap-3 [&>li:last-child]:pr-6">
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
        {/* <MdChevronRight onClick={scrollRight} size="sm" /> */}
      </nav>
    </div>
  );
}
