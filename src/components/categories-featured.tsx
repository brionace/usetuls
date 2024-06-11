"use client";
import { DataContext } from "@/app/data-provider";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React, { useContext } from "react";

export default function FeaturedCategories() {
  const {
    state: { categories },
  } = useContext(DataContext);
  return (
    <ul>
      {categories?.map((category: any) => (
        <li key={category.name} className="mb-4">
          <Button
            as={Link}
            href={`/browse/${category.slug}`}
            variant="flat"
            size="sm"
            className="text-smaller"
          >
            {category.name}
          </Button>
        </li>
      ))}
    </ul>
  );
}
