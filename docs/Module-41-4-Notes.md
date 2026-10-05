# Module 41-4: Showing Logged In User Data & Signout (স্টাডি ও ইন্টারভিউ নোট)

---

## ১. ক্লাসের মূল উদ্দেশ্য (Key Objectives)
1. **লগইন করা ইউজারের ডাটা ডিসপ্লে করা:** Better Auth এর মাধ্যমে ক্লায়েন্ট-সাইডে লগইন থাকা ইউজারের নাম, ইমেইল এবং প্রোফাইল ছবি ডাইনামিক্যালি দেখানো।
2. **সাইনআউট ফাংশনালিটি:** `signOut()` মেথড ব্যবহার করে সেশন কুকি ডিলিট করা এবং ক্যাশ রিফ্রেশ করে হোমপেজে রিডাইরেক্ট করা।
3. **কন্ডিশনাল রেন্ডারিং:** ইউজার লগইন থাকলে (User Profile + Signout Button) দেখাবে, আর লগআউট থাকলে (Signin + Signup Buttons) দেখাবে।
4. **Next.js Best Practices বজায় রাখা:** Server Component এবং Client Component বাউন্ডারি সঠিকভাবে আলাদা রাখা।

---

## ২. আর্কিটেকচার ও ডিজাইন সিদ্ধান্ত (SCIC & Architecture Concepts)

### ক) কেন পুরো `Header.tsx`-কে `"use client"` করা হয়নি?
- আমাদের `Header.tsx`-এর ভেতরে `NavLinks.tsx` রয়েছে, যা একটি **Async Server Component** (সার্ভার থেকে সরাসরি ক্যাটাগরি ডাটা ফেচ করে)।
- Next.js App Router-এর নিয়ম অনুযায়ী: কোনো Client Component-এর ভেতরে সরাসরি Async Server Component রাখা যায় না।
- তাছাড়া হেডার ও নেভিগেশন লিংক সার্ভারে রেন্ডার হলে SEO ও প্রাথমিক পেজ লোড দ্রুত হয়।
- **সমাধান:** আমরা শুধুমাত্র ইন্টারেক্টিভ অংশটুকুকে (সেশন স্টেট ও বাটন) আলাদা করে `AuthButtons.tsx` নামের একটি **Leaf Client Component** বানিয়েছি।

### খ) Cumulative Layout Shift (CLS) প্রতিরোধ:
- ব্রাউজারে সেশন ভেরিফাই হতে কয়েক মিলি-সেকেন্ড সময় লাগে।
- ভেরিফিকেশনের মাঝামাঝি সময়ে বাটন লাফালাফি রোধ করতে `isPending` অবস্থায় হালকা পালস স্কেলিটন (`animate-pulse`) দেখানো হয়েছে।

---

## ৩. গুরুত্বপূর্ণ কোড ও লাইন-বাই-লাইন বিশ্লেষণ

### ফাইল: `src/app/components/AuthButtons.tsx`

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";

export default function AuthButtons() {
  const router = useRouter();

  // ১. সেশন ডাটা ও লোডিং ফ্ল্যাগ ফেচ করা
  const { data: session, isPending } = useSession();

  // ২. সাইন আউট হ্যান্ডলার
  const handleSignOut = async () => {
    await signOut();       // সার্ভার থেকে সেশন কুকি ক্লিয়ার করে
    router.push("/");      // হোমপেজে রিডাইরেক্ট
    router.refresh();      // Next.js App Router-এর সার্ভার ক্যাশ রিফ্রেশ
  };

  // ৩. লোডিং অবস্থা (Layout Shift প্রতিরোধ)
  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <span className="h-8 w-20 animate-pulse rounded bg-neutral-200" />
      </div>
    );
  }

  // ৪. ইউজার লগইন থাকলে (Logged In State)
  if (session?.user) {
    const user = session.user;

    return (
      <div className="flex items-center gap-3 text-sm">
        {/* প্রোফাইল লিংক ও অ্যাভাটার */}
        <Link href="/profile" className="flex items-center gap-2 hover:opacity-80 transition group">
          {user.image ? (
            <div className="relative h-8 w-8 rounded-full overflow-hidden border border-neutral-300">
              <Image src={user.image} alt={user.name || "User"} fill unoptimized className="object-cover" />
            </div>
          ) : (
            // ছবি না থাকলে নামের আদ্যক্ষর দিয়ে রাউন্ডেড ব্যাজ
            <div className="h-8 w-8 rounded-full bg-red-700 text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
              {user.name ? user.name[0] : "U"}
            </div>
          )}
          <span className="font-semibold text-neutral-800 group-hover:text-red-700 transition hidden sm:inline">
            {user.name}
          </span>
        </Link>

        {/* সাইন আউট বাটন */}
        <button
          onClick={handleSignOut}
          className="rounded bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-red-50 hover:text-red-700 transition border border-neutral-300 cursor-pointer"
        >
          সাইন আউট
        </button>
      </div>
    );
  }

  // ৫. ইউজার লগইন না থাকলে (Logged Out State)
  return (
    <div className="flex items-center gap-3 text-sm">
      <Link href="/signin" className="text-neutral-700 hover:text-red-700 transition font-medium">
        সাইন ইন
      </Link>
      <Link href="/signup" className="rounded bg-red-700 px-3.5 py-1.5 font-semibold text-white hover:bg-red-800 transition">
        সাইন আপ
      </Link>
    </div>
  );
}
```

---

## ৪. SCIC ও টেকনিক্যাল ইন্টারভিউ প্রশ্নাবলী (Interview Q&A)

### প্রশ্ন ১: Better Auth-এর `useSession()` কীভাবে কাজ করে?
> **উত্তর:** `useSession()` হুকটি ক্লায়েন্ট সাইডে ব্রাউজারের অথেনটিকেশন সেশনকে রিঅ্যাক্টিভলি ট্র্যাক করে। এটি একটি অবজেক্ট রিটার্ন করে যাতে থাকে `{ data: session, isPending, error }`। যদি সেশন ভ্যালিড হয়, তবে `session.user` এর ভেতর ইউজারের নাম, ইমেইল ইত্যাদি পাওয়া যায়।

### প্রশ্ন ২: সাইন আউটের সময় `router.push("/")`-এর সাথে `router.refresh()` কেন দরকার?
> **উত্তর:** Next.js App Router-এ ক্লায়েন্ট সাইড ক্যাশিং (Router Cache) কাজ করে। `router.push("/")` দিলে শুধু ইউআরএল চেঞ্জ হয়, কিন্তু ব্যাকগ্রাউন্ডে আগের ক্যাশ করা ডেটা থেকে যেতে পারে। `router.refresh()` কল করলে নেক্সট জেএস সার্ভার কম্পোনেন্টগুলোকে রিলোড করে সম্পূর্ণ ফ্রেশ ডাটা নিয়ে আসে।

### প্রশ্ন ৩: `isPending` হ্যান্ডেল করা কেন জরুরি?
> **উত্তর:** পেজ লোড হওয়ার সময় ক্লায়েন্ট যখন সেশন কুকি ভেরিফাই করে, তখন সামান্য সময়ের জন্য আনঅথেনটিকেটেড স্টেট দেখা যেতে পারে। এতে পেজে Layout Shift (FOUC) হয়। `isPending` ব্যবহার করে স্কেলিটন লোডার দেখালে UI স্থিতিশীল থাকে।

### প্রশ্ন ৪: ইউজারের ইমেজ না থাকলে কীভাবে হ্যান্ডেল করবেন?
> **উত্তর:** কন্ডিশনাল রেন্ডারিংয়ের মাধ্যমে: `user.image ? <Image /> : <div className="rounded-full">{user.name[0]}</div>`। অর্থাৎ ছবি থাকলে ইমেজ দেখাবে, না থাকলে নামের প্রথম অক্ষর বড় হাতের অক্ষরে স্টাইলিশ ব্যাজ হিসেবে দেখাবে।

---

## ৫. সংক্ষেপ সামারি (Cheat Sheet)

| অবস্থা | কী দেখাবে | লজিক |
| :--- | :--- | :--- |
| **লোডিং (Pending)** | স্কেলিটন পালস বার | `if (isPending) return <Skeleton />` |
| **লগইন (Logged In)** | প্রোফাইল ছবি/অক্ষর + নাম + সাইন আউট বাটন | `if (session?.user)` |
| **লগআউট (Logged Out)** | সাইন ইন ও সাইন আপ বাটন | ডিফল্ট `return` |
