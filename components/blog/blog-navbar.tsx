"use client";

import { useState } from "react";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import Logo from "./logo";
import { MenuIcon, XIcon } from "lucide-react";
import SearchBar from "./search-bar";

const BlogNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Large screen */}
      <div className="hidden lg:flex justify-between items-center py-5 lg:px-32 md:px-16 px-5 border fixed top-0 left-0 right-0  z-50">
        <Logo />
        <ul className="flex space-x-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          <SearchBar/>
          <ModeToggle />
        </div>
      </div>

      {/* Small screen */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 border ">
        <div className="flex justify-between items-center py-5 px-5">
          <Logo />

          <div className="flex items-center space-x-4">
            <button onClick={() => setIsOpen(!isOpen)} >
              {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu links */}
        {isOpen && (
          <div className="px-5 pb-4">
            <ul className="flex flex-col space-y-2">
              <li>
                <Link href="/" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={() => setIsOpen(false)}>
                  About
                </Link>
              </li>
            </ul>

            <div className="flex items-center mt-4 space-x-2">
              <SearchBar/>
              <ModeToggle />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogNavbar;
