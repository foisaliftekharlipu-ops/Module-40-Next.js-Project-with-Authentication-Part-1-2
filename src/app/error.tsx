"use client";

import React, { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log runtime error to console
    console.error("Global runtime error caught:", error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-md text-center flex flex-col items-center">
        {/* Error status icon */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-700">
          <svg
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>

        {/* Error notification message */}
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          কিছু একটা ভুল হয়েছে!
        </h1>
        <p className="text-sm text-neutral-600 mb-6">
          সংবাদ বা ডেটা লোড করার সময় অপ্রত্যাশিত কোনো সমস্যা দেখা দিয়েছে। দয়া করে পুনরায় চেষ্টা করুন।
        </p>

        {/* Action recovery buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => reset()}
            className="rounded-lg bg-red-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-800 active:scale-[0.99] cursor-pointer"
          >
            আবার চেষ্টা করুন
          </button>
          <Link
            href="/"
            className="rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 active:scale-[0.99]"
          >
            হোমপেজে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
