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
    <div className="flex flex-col sticky top-0 z-50 bg-slate-500 dark:bg-black border-b border-slate-500">
      <Navbar maxWidth="full">
        <NavbarBrand>
          <Link href="/" size="sm">
            <span className="font-bold text-inherit">Usetuls</span>
          </Link>
        </NavbarBrand>
        {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent> */}
        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              <MdSearch />
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <nav className="flex items-center w-full px-5 mb-5 whitespace-nowrap overflow-auto">
        <ul className="flex gap-4">
          {categories.map((category: any) => (
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
        </ul>
      </nav>
    </div>
  );
}
