import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import SignOutButton from "./SignOutButton";

export default async function ProfilePage() {
  // Fetch session data on the server (Next.js 15 Server Component + Better Auth)
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Server-side redirect if session does not exist
  if (!session?.user) {
    redirect("/signin");
  }

  const { user } = session;

  return (
    <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-12">
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        {/* Profile header banner */}
        <div className="h-32 bg-gradient-to-r from-red-700 via-red-800 to-neutral-900" />

        {/* Main profile content */}
        <div className="relative px-6 pb-8 pt-0 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 sm:-mt-14 mb-6 gap-4">
            {/* User Avatar (Image or Initial Letter) */}
            <div className="flex items-end gap-4">
              {user.image ? (
                <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-white bg-white shadow-md">
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-24 w-24 rounded-full border-4 border-white bg-red-700 text-white flex items-center justify-center font-bold text-3xl uppercase shadow-md">
                  {user.name ? user.name[0] : "U"}
                </div>
              )}

              <div className="pt-2">
                <h1 className="text-2xl font-bold text-neutral-900 leading-tight">
                  {user.name}
                </h1>
                <p className="text-sm text-neutral-500">{user.email}</p>
              </div>
            </div>

            {/* Interactive client sign-out button */}
            <div>
              <SignOutButton />
            </div>
          </div>

          {/* Detailed user account metadata grid */}
          <div className="mt-8 border-t border-neutral-100 pt-6">
            <h2 className="text-lg font-semibold text-neutral-800 mb-4">
              অ্যাকাউন্টের তথ্য
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4">
                <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  পুরো নাম
                </span>
                <p className="mt-1 font-semibold text-neutral-900">
                  {user.name || "প্রযোজ্য নয়"}
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4">
                <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  ইমেইল ঠিকানা
                </span>
                <p className="mt-1 font-semibold text-neutral-900">
                  {user.email}
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4">
                <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  ইউজার আইডি
                </span>
                <p className="mt-1 font-mono text-xs text-neutral-600 break-all">
                  {user.id}
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4">
                <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  যোগদানের তারিখ
                </span>
                <p className="mt-1 font-semibold text-neutral-900">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("bn-BD", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "আজ"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation return link */}
          <div className="mt-8 flex items-center justify-between border-t border-neutral-100 pt-6">
            <Link
              href="/"
              className="text-sm font-semibold text-red-700 hover:underline flex items-center gap-1.5"
            >
              ← হোমপেজে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
