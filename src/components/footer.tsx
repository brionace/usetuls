import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="py-4 text-center text-sm text-slate-500">
      <p>
        Made with ❤️ by{" "}
        <Link href="https://brianory.me" target="_blank">
          Brian
        </Link>
      </p>
    </footer>
  );
}
