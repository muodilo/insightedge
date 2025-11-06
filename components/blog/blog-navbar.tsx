"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { ModeToggle } from "../mode-toggle";
import Logo from "./logo";
import { MenuIcon, XIcon } from "lucide-react";
import SearchBar from "./search-bar";

const BlogNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <div>
      {/* Large screen */}
      <div className="hidden lg:flex justify-between items-center py-5 lg:px-32 md:px-16 px-5 border fixed top-0 left-0 right-0 z-50 bg-background">
        <Logo />
        <ul className="flex space-x-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          )}
        </ul>
        <div className="flex items-center space-x-4">
          <SearchBar />
          <ModeToggle />
          {isAuthenticated && (
            <span className="text-sm">
              Hi, {session?.user?.name || session?.user?.email}
            </span>
          )}
          {isAuthenticated ? (
            <button
              onClick={() => signOut()}
              className="border px-3 py-1 rounded"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="border px-3 py-1 rounded"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Small screen */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 border bg-background ">
        <div className="flex justify-between items-center py-5 px-5">
          <Logo />
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="px-5 pb-4 ">
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
              {isAuthenticated && (
                <li>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>

            <div className="flex items-center mt-4 space-x-2">
              <SearchBar />
              <ModeToggle />
              {isAuthenticated && (
                <span className="text-sm">
                  Hi, {session?.user?.name || session?.user?.email}
                </span>
              )}
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="border px-3 py-1 rounded"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    signIn();
                    setIsOpen(false);
                  }}
                  className="border px-3 py-1 rounded"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogNavbar;
