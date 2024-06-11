"use client";

import { DataContext } from "@/app/data-provider";
import { Button, Link } from "@nextui-org/react";
import React, { useContext } from "react";
import { MdAdd, MdArrowRightAlt, MdShare } from "react-icons/md";

export default function Footer() {
  const { dispatch } = useContext(DataContext);
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="col-span-12 md:col-span-6">
        <p>
          <b className="font-bold">Usetuls</b> &mdash; derived from the words
          "useful tools" is the place to discover apps that are fully functional
          on your browser. No need to download or install anything. Bookmark
          your favourite apps for easy access and updates.
        </p>
      </div>
      <div className="col-span-12 md:col-span-6 flex flex-col gap-3 md:border-l-1 border-slate-100 md:pl-4">
        <div className="flex gap-3">
          <Button
            // variant="light"
            size="sm"
            className="rounded-full"
            onPress={() => dispatch({ type: "SHOW_ADDURL" })}
          >
            <span className="hidden sm:inline">Add a app</span>
            <MdAdd />
          </Button>
          {/* <Link
            isExternal
            href="https://www.buymeacoffee.com/brianoryem"
            rel="nofollow"
            underline="hover"
            size="sm"
            className="bg-gradient-to-r from-purple-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text"
          >
            Buy me a coffee
          </Link>
          <MdArrowRightAlt size="15" /> */}
          <Button
            size="sm"
            className="rounded-full"
            onClick={async () => {
              try {
                await navigator.share({
                  title: "Find Useful Web Tools",
                  text: "Check out this website for useful digital tools & utilities",
                  url: "https://usetuls.com",
                });
                console.log("Usetuls shared successfully");
              } catch (err) {
                console.error(`Error: ${err}`);
              }
            }}
          >
            <span className="hidden sm:inline">Share</span>
            <MdShare />
          </Button>
        </div>
        <p>
          Made in {currentYear}, by{" "}
          <Link
            isExternal
            href="https://brianory.me/"
            underline="hover"
            size="sm"
          >
            Brian
          </Link>
        </p>
      </div>
    </>
  );
}
