import React from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "জাতীয়", slug: "bangladesh" },
  { name: "রাজনীতি", slug: "politics" },
  { name: "আন্তর্জাতিক", slug: "world" },
  { name: "অর্থনীতি", slug: "economy" },
  { name: "খেলা", slug: "sports" },
  { name: "বিনোদন", slug: "entertainment" },
  { name: "প্রযুক্তি", slug: "tech" },
  { name: "মতামত", slug: "opinion" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-neutral-300 bg-neutral-900 text-neutral-300">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 sm:grid-cols-2">
          {/* Column 1: Brand identity and mission */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logo.webp"
                alt="Bangla News 24 Logo"
                width={36}
                height={36}
                className="w-9 h-9 object-contain brightness-110"
              />
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-red-500 transition">
                Bangla News 24
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-neutral-400">
              সত্য ও বস্তুনিষ্ঠ তথ্যের প্রতিশ্রুতি নিয়ে প্রতিদিন ২৪ ঘণ্টা আপনার পাশে। নির্ভরযোগ্য সংবাদের অন্যতম বিশ্বস্ত মাধ্যম।
            </p>
            <div className="flex items-center gap-3 text-sm text-neutral-400">
              <span className="inline-block h-2 w-2 rounded-full bg-red-600 animate-pulse" />
              <span>লাইভ আপডেট ২৪/৭</span>
            </div>
          </div>

          {/* Column 2: Key news categories */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white border-l-2 border-red-600 pl-2">
              প্রধান বিভাগ
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}`}
                    className="text-neutral-400 hover:text-white hover:underline transition"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Editorial and contact desk */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white border-l-2 border-red-600 pl-2">
              সম্পাদকীয় ও তথ্য
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-neutral-400">
              <li>
                <span className="text-neutral-500">ভারপ্রাপ্ত সম্পাদক:</span>{" "}
                <span className="text-neutral-200">আবু নাঈম ফয়সাল</span>
              </li>
              <li>
                <span className="text-neutral-500">বার্তা কার্যালয়:</span>{" "}
                <span>কাওরান বাজার, ঢাকা-১২১৫</span>
              </li>
              <li>
                <span className="text-neutral-500">ইমেইল:</span>{" "}
                <a
                  href="mailto:contact@banglanews24.com"
                  className="hover:text-red-400 transition"
                >
                  contact@banglanews24.com
                </a>
              </li>
              <li>
                <span className="text-neutral-500">হটলাইন:</span>{" "}
                <span>+৮৮০ ১৮০০-০০০০০০</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social channels & community */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white border-l-2 border-red-600 pl-2">
              আমাদের সাথে থাকুন
            </h3>
            <p className="text-sm text-neutral-400 mb-4">
              সোশ্যাল মিডিয়ায় সর্বশেষ সংবাদের ভিডিও এবং বিশেষ প্রতিবেদন দেখতে আমাদের ফলো করুন।
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-neutral-300 hover:bg-red-700 hover:text-white transition"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-neutral-300 hover:bg-red-700 hover:text-white transition"
                aria-label="YouTube"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-neutral-300 hover:bg-red-700 hover:text-white transition"
                aria-label="X (Twitter)"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar: Copyright & legal notices */}
      <div className="border-t border-neutral-800 bg-neutral-950 py-5">
        <div className="mx-auto max-w-7xl px-4 flex flex-col items-center justify-between gap-3 text-xs text-neutral-500 sm:flex-row">
          <p>© {currentYear} Bangla News 24। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-400 cursor-pointer">গোপনীয়তা নীতি</span>
            <span>•</span>
            <span className="hover:text-neutral-400 cursor-pointer">ব্যবহারের শর্তাবলি</span>
            <span>•</span>
            <span className="hover:text-neutral-400 cursor-pointer">বিজ্ঞাপন নীতিমালা</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
