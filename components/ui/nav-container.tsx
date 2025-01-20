"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function NavContainer({ children }: Props) {
  return (
    <header>
      <nav className="border-gray-200 px-2 py-2.5 shadow">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between">
          {children}
        </div>
      </nav>
    </header>
  );
}

export default NavContainer;
