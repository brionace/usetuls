import Link from "next/link";
import React from "react";
import { MdArrowRightAlt } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="flex gap-2 py-6 mt-8 px-6 justify-center text-sm text-slate-500 border-t border-slate-100">
      <p>
        <span className="hidden md:inline">Made with</span> ❤️{" "}
        <span className="hidden md:inline">by</span>{" "}
        <Link
          href="https://brianory.me"
          target="_blank"
          className="underline underline-offset-4"
        >
          Brian
        </Link>
      </p>
      <span>/</span>
      <p className="flex gap-1 items-center">
        <Link
          href="https://www.buymeacoffee.com/brianoryem"
          target="_blank"
          className="bg-gradient-to-r from-purple-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text"
        >
          Buy me a coffee
        </Link>
        <MdArrowRightAlt size="20" />
      </p>
    </footer>
  );
}
