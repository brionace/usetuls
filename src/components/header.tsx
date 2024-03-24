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
} from "react-icons/md";

export default function Header({ categories }: any) {
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
    <div className="sticky top-0 border-b border-slate-100 z-50">
      <Navbar maxWidth="full">
        <NavbarBrand className="flex gap-1">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Usetuls logo"
              className="object-fill w-6 h-6 rounded-none"
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
          {/* <NavbarItem>
          <Button>
            <MdMoreVert />
          </Button>
        </NavbarItem> */}
          <NavbarItem>
            <Button
              variant="light"
              size="sm"
              className="rounded-full min-w-fit"
            >
              <MdSearch /> <span className="hidden sm:inline">Search</span>
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <Navbar className="md:hidden">
        <NavbarContent
          justify="center"
          className="relative whitespace-nowrap overflow-x-scroll scroll scroll-smooth scrollbar-hide"
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
                  >
                    {category.name}
                  </Button>
                </li>
              ))}
            </ul>
          </NavbarItem>
          {/* <MdChevronRight onClick={scrollRight} size="sm" /> */}
        </NavbarContent>
      </Navbar>
    </div>
  );
}
