"use client";

import React from "react";
import {
  Link,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import {
  MdMoreHoriz,
  MdSearch,
  MdMenu,
  MdChevronLeft,
  MdChevronRight,
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
    <Navbar maxWidth="full" className="sticky top-0 border-b border-slate-500">
      <NavbarBrand>
        <Link href="/" size="sm">
          <span className="font-bold text-inherit">Usetuls</span>
        </Link>
      </NavbarBrand>
      <NavbarContent
        justify="center"
        className="whitespace-nowrap overflow-x-scroll scroll scroll-smooth scrollbar-hide"
      >
        <MdChevronLeft onClick={scrollLeft} size="sm" />
        <NavbarItem className="w-full">
          <ul className="flex items-start gap-4">
            {categories?.map((category: any) => (
              <li key={category.name}>
                <Button
                  as={Link}
                  href={`/c/${category.id}`}
                  variant="flat"
                  size="sm"
                >
                  {category.name}
                </Button>
              </li>
            ))}
          </ul>
        </NavbarItem>
        <MdChevronRight onClick={scrollRight} size="sm" />
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button>
            <MdSearch />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
