import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-lg text-center flex flex-col items-center">
        {/* 404 Visual Badge */}
        <div className="relative mb-6">
          <span className="text-8xl font-black tracking-widest text-neutral-200 select-none">
            ৪০৪
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-4xl font-extrabold text-red-700">
            404
          </span>
        </div>

        {/* Headline and description */}
        <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-3">
          কাঙ্ক্ষিত পাতাটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-sm leading-relaxed text-neutral-600 mb-8 max-w-md">
          দুঃখিত, আপনি যে সংবাদ বা পাতাটিতে প্রবেশ করতে চেয়েছেন তা সম্ভবত সরিয়ে নেওয়া হয়েছে অথবা ইউআরএল লিংকটি সঠিক নয়।
        </p>

        {/* Navigation action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-red-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-800 active:scale-[0.99]"
          >
            ← হোমপেজে ফিরে যান
          </Link>
          <Link
            href="/bangladesh"
            className="rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 active:scale-[0.99]"
          >
            জাতীয় সংবাদ পড়ুন
          </Link>
        </div>
      </div>
    </main>
  );
}
