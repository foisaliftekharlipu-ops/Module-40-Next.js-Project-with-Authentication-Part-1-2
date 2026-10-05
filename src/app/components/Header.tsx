import React from "react";
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="border-b border-neutral-200 bg-white">
      {/* Top row: Centered brand logo & date, right-aligned auth actions */}
      <div className="relative mx-auto max-w-7xl px-4 py-4 flex flex-col items-center justify-center gap-1">
        
        {/* Right authentication state (shows user info/sign-out or sign-in/sign-up) */}
        <div className="absolute right-4 top-4 flex items-center gap-3 text-sm">
          <AuthButtons />
        </div>

        {/* Center brand logo and Bengali calendar date */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            alt="Bangla News 24 Logo"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
            src="/logo.webp"
          />
          <div className="flex flex-col text-left">
            <span className="text-2xl font-bold text-red-700 tracking-tight leading-tight">
              Bangla News 24
            </span>
            <span
              suppressHydrationWarning
              className="text-xs text-neutral-500 leading-tight"
            >
              {date}
            </span>
          </div>
        </Link>
      </div>

      {/* Category navigation links bar */}
      <div className="border-t border-neutral-100">
        <NavLinks />
      </div>
    </header>
  );
};

export default Header;