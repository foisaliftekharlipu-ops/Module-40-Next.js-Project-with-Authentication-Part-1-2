"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";

export default function AuthButtons() {
  const router = useRouter();

  // Better Auth useSession hook - subscribes to active client session data
  const { data: session, isPending } = useSession();

  // Sign out handler: clears session cookies and refreshes server cache
  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  // 1. Loading state placeholder to prevent Cumulative Layout Shift (CLS)
  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <span className="h-8 w-20 animate-pulse rounded bg-neutral-200" />
      </div>
    );
  }

  // 2. Authenticated state: renders user avatar, profile link, and sign-out button
  if (session?.user) {
    const user = session.user;

    return (
      <div className="flex items-center gap-3 text-sm">
        {/* User profile link & avatar */}
        <Link
          href="/profile"
          className="flex items-center gap-2 hover:opacity-80 transition group"
        >
          {user.image ? (
            <div className="relative h-8 w-8 rounded-full overflow-hidden border border-neutral-300">
              <Image
                src={user.image}
                alt={user.name || "User"}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-8 w-8 rounded-full bg-red-700 text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
              {user.name ? user.name[0] : "U"}
            </div>
          )}
          <span className="font-semibold text-neutral-800 group-hover:text-red-700 transition hidden sm:inline">
            {user.name}
          </span>
        </Link>

        {/* Sign out button */}
        <button
          onClick={handleSignOut}
          className="rounded bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-red-50 hover:text-red-700 transition border border-neutral-300 cursor-pointer"
        >
          সাইন আউট
        </button>
      </div>
    );
  }

  // 3. Unauthenticated state: displays sign-in and sign-up action links
  return (
    <div className="flex items-center gap-3 text-sm">
      <Link
        href="/signin"
        className="text-neutral-700 hover:text-red-700 transition font-medium"
      >
        সাইন ইন
      </Link>
      <Link
        href="/signup"
        className="rounded bg-red-700 px-3.5 py-1.5 font-semibold text-white hover:bg-red-800 transition"
      >
        সাইন আপ
      </Link>
    </div>
  );
}
