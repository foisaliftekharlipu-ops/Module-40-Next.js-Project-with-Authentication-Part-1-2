"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import SocialLogin from "../components/SocialLogin";

export default function SignUpPage() {
  const router = useRouter();

  // State management for loading indicator and submission errors
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    // Extract form input data
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const image = (formData.get("image") as string) || undefined;

    // Execute Better Auth signUp.email method
    const { data, error } = await signUp.email({
      name,
      email,
      password,
      image,
    });

    if (error) {
      // Display error message (e.g. email already exists or password too short)
      setErrorMessage(error.message || "সাইন আপ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
      setLoading(false);
      return;
    }

    // On success, redirect to homepage and refresh router cache
    router.push("/");
    router.refresh();
  };

  return (
    <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-16 flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-bold text-red-700">
          সাইন আপ
        </h1>

        {/* Render error alert banner */}
        {errorMessage && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-neutral-700">
              নাম
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              placeholder="আপনার পুরো নাম"
              className="rounded-lg border border-neutral-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-red-700 focus:ring-1 focus:ring-red-700"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="image" className="text-sm font-medium text-neutral-700">
              ছবির লিংক (Image URL - ঐচ্ছিক)
            </label>
            <input
              id="image"
              type="url"
              name="image"
              placeholder="https://example.com/photo.jpg"
              className="rounded-lg border border-neutral-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-red-700 focus:ring-1 focus:ring-red-700"
            />
          </div>

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
              minLength={8}
              placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড"
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
                অ্যাকাউন্ট তৈরি হচ্ছে...
              </>
            ) : (
              "সাইন আপ করুন"
            )}
          </button>
        </form>

        {/* Google & GitHub OAuth Social Sign-In Buttons */}
        <SocialLogin />

        <p className="mt-5 text-center text-sm text-neutral-600">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-red-700 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </main>
  );
}
