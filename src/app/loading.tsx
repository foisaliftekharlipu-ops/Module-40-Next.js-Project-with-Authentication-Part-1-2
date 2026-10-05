import React from "react";

export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 animate-pulse">
      {/* Main 2-column newspaper layout skeleton (2:1 ratio) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left column: Lead & secondary news skeleton (2 fractions) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Lead news featured card skeleton */}
          <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white p-4">
            <div className="h-72 w-full rounded-lg bg-neutral-200 mb-4" />
            <div className="h-6 w-3/4 rounded bg-neutral-200 mb-2" />
            <div className="h-4 w-full rounded bg-neutral-200 mb-2" />
            <div className="h-4 w-2/3 rounded bg-neutral-200 mb-4" />
            <div className="h-3 w-28 rounded bg-neutral-200" />
          </div>

          {/* Sub-news grid skeleton (2 columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-neutral-200 bg-white p-4 flex flex-col gap-3"
              >
                <div className="h-40 w-full rounded-lg bg-neutral-200" />
                <div className="h-5 w-4/5 rounded bg-neutral-200" />
                <div className="h-3.5 w-full rounded bg-neutral-200" />
                <div className="h-3 w-24 rounded bg-neutral-200" />
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Most read sidebar skeleton (1 fraction) */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            {/* Sidebar heading skeleton */}
            <div className="h-6 w-36 rounded bg-red-100 mb-6" />

            {/* Most read items list skeleton */}
            <div className="flex flex-col divide-y divide-neutral-100">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="py-3 flex items-start gap-3">
                  <div className="h-7 w-7 rounded-full bg-neutral-200 shrink-0" />
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="h-4 w-full rounded bg-neutral-200" />
                    <div className="h-3 w-1/2 rounded bg-neutral-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
