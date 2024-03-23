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
import { MdMoreHoriz, MdSearch, MdMenu } from "react-icons/md";

export default function Header({ categories }: any) {
  return (
    <Navbar maxWidth="full" className="sticky top-0 border-b border-slate-500">
      <NavbarBrand>
        <Link href="/" size="sm">
          <span className="font-bold text-inherit">Usetuls</span>
        </Link>
      </NavbarBrand>
      <NavbarContent
        justify="center"
        className="whitespace-nowrap overflow-auto"
      >
        <NavbarItem className="flex items-center gap-4">
          {categories?.map((category: any) => (
            <li key={category.name}>
              <Button
                as={Link}
                color="primary"
                href={`/c/${category.id}`}
                variant="flat"
              >
                {category.name}
              </Button>
            </li>
          ))}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            <MdSearch />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
