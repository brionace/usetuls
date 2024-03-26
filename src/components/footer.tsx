"use client";

import Link from "next/link";
import React from "react";
import { MdArrowRightAlt } from "react-icons/md";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 mt-8 px-6 text-sm text-slate-500 border-t border-slate-100">
      <div className="flex gap-2 justify-center">
        <p>
          <span className="hidden md:inline">Made with</span> ❤️{" "}
          <span className="hidden md:inline">by</span>{" "}
          <Link
            href="https://brianory.me"
            target="_blank"
            // className="underline underline-offset-4"
          >
            Brian
          </Link>
        </p>
        <span>/</span>
        <p className="flex gap-1 items-center">
          <Link
            href="https://www.buymeacoffee.com/brianoryem"
            target="_blank"
            rel="nofollow"
            className="bg-gradient-to-r from-purple-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text"
          >
            Buy me a coffee
          </Link>
          <MdArrowRightAlt size="20" />
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
      <div className="text-gray-300 text-center text-xs mt-2">
        {currentYear}
      </div>
    </footer>
  );
}
