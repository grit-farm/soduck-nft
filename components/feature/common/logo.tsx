"use client";

import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <h1 className="font-maruBuri self-center whitespace-nowrap text-xl font-semibold">
          Soduck
      </h1>
    </Link>
  );
}

export default Logo;
