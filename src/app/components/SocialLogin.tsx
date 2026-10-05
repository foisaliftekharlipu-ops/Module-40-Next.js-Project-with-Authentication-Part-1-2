"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";

interface SocialLoginProps {
  callbackURL?: string;
}

export default function SocialLogin({ callbackURL = "/" }: SocialLoginProps) {
  const [loadingProvider, setLoadingProvider] = useState<"google" | "github" | null>(null);

  const handleSocialSignIn = async (provider: "google" | "github") => {
    try {
      setLoadingProvider(provider);
      await signIn.social({
        provider,
        callbackURL,
      });
    } catch (error) {
      console.error(`${provider} সাইন ইন ব্যর্থ হয়েছে:`, error);
      setLoadingProvider(null);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Divider with "OR" text */}
      <div className="relative my-2 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-300" />
        </div>
        <div className="relative bg-white px-3 text-xs uppercase tracking-wider text-neutral-500">
          অথবা
        </div>
      </div>

      {/* Google Sign In Button */}
      <button
        type="button"
        onClick={() => handleSocialSignIn("google")}
        disabled={loadingProvider !== null}
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-neutral-300 bg-white py-2.5 px-4 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer shadow-sm"
      >
        {loadingProvider === "google" ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-neutral-600 border-t-transparent" />
        ) : (
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
            />
          </svg>
        )}
        <span>Google দিয়ে সাইন ইন করুন</span>
      </button>

      {/* GitHub Sign In Button */}
      <button
        type="button"
        onClick={() => handleSocialSignIn("github")}
        disabled={loadingProvider !== null}
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-neutral-800 bg-neutral-900 py-2.5 px-4 text-sm font-medium text-white transition hover:bg-neutral-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer shadow-sm"
      >
        {loadingProvider === "github" ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
            />
          </svg>
        )}
        <span>GitHub দিয়ে সাইন ইন করুন</span>
      </button>
    </div>
  );
}
