"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import SocialLogin from "../components/SocialLogin";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // State management for loading indicator and submission errors
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    // Extract form input values
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Execute Better Auth credential sign-in method
    const { data, error } = await signIn.email({
      email,
      password,
    });

    if (error) {
      // Display error message if credentials or network fail
      setErrorMessage(
        error.message || "ভুল ইমেইল বা পাসওয়ার্ড। অনুগ্রহ করে আবার চেষ্টা করুন।"
      );
      setLoading(false);
      return;
    }

    // Redirect to destination (callbackUrl or homepage) and refresh cache
    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-16 flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-bold text-red-700">
          সাইন ইন
        </h1>

        {/* Render error alert banner */}
        {errorMessage && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-neutral-700">
              ইমেইল
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="example@mail.com"
              className="rounded-lg border border-neutral-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-red-700 focus:ring-1 focus:ring-red-700"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-neutral-700"
            >
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="rounded-lg border border-neutral-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-red-700 focus:ring-1 focus:ring-red-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-lg bg-red-700 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                সাইন ইন হচ্ছে...
              </>
            ) : (
              "সাইন ইন করুন"
            )}
          </button>
        </form>

        {/* Google & GitHub OAuth Social Sign-In Buttons */}
        <SocialLogin callbackURL={callbackUrl} />

        <p className="mt-5 text-center text-sm text-neutral-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-semibold text-red-700 hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <main className="flex-1 min-h-[60vh] flex items-center justify-center">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-red-700 border-t-transparent" />
        </main>
      }
    >
      <SignInForm />
    </Suspense>
  );
}
