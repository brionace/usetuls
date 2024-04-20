"use client";

import { Link } from "@nextui-org/react";
import React from "react";
import { MdArrowRightAlt } from "react-icons/md";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 mt-8 px-6 text-sm text-slate-500 border-t border-slate-100">
      <div className="flex gap-2 items-center justify-center text-sm">
        <p>
          <span className="hidden md:inline">Made with</span> ❤️{" "}
          <span className="hidden md:inline">by</span>{" "}
          <Link
            isExternal
            href="https://brianory.me/"
            underline="hover"
            size="sm"
          >
            Brian
          </Link>
        </p>
        <span className="text-gray-300">{currentYear}</span>
        <p className="flex gap-1 items-center">
          <Link
            isExternal
            href="https://www.buymeacoffee.com/brianoryem"
            rel="nofollow"
            underline="hover"
            size="sm"
            className="bg-gradient-to-r from-purple-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text"
          >
            Buy me a coffee
          </Link>
          <MdArrowRightAlt size="15" />
          {/* <button
          onClick={async () => {
            try {
              await navigator.share({
                title: "Find Useful Web Tools",
                text: "Check out this website for useful digital tools & utilities",
                url: "https://usetuls.com",
              });
              console.log("Shared successfully");
            } catch (err) {
              console.error("Error sharing: ", err?.message);
            }
          }}
        >
          sd
        </button> */}
        </p>
      </div>
    </footer>
  );
}
