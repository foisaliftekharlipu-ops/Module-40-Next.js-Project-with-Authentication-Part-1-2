# Module 41-10: Loading States, Not-Found Page, Global Error & Deployment (স্টাডি ও ইন্টারভিউ নোট)

---

## ১. ক্লাসের মূল উদ্দেশ্য (Key Objectives)
1. **প্রফেশনাল ফুটার (`Footer.tsx`):** ব্র্যান্ড লোগো, ক্যাটাগরি কুইক লিংক, সম্পাদকীয় তথ্য, সোশ্যাল মিডিয়া ও কপিরাইট সম্বলিত প্রফেশনাল নিউজ পোর্টাল ফুটার তৈরি।
2. **গ্লোবাল লোডিং স্কেলিটন (`loading.tsx`):** Next.js App Router-এর অন্তর্নির্মিত React Suspense মেকানিজম ব্যবহার করে ডাটা ফেচিংয়ের সময় অ্যানিমেটেড কন্টেন্ট স্কেলিটন দেখানো।
3. **কাস্টম ৪০৪ পেজ (`not-found.tsx`):** ভুল বা অস্তিত্বহীন খবরের লিংকে গেলে ব্যবহারকারীকে দৃষ্টিনন্দন বাংলায় 404 মেসেজ ও হোমপেজে ফেরার লিংক প্রদর্শন করা।
4. **গ্লোবাল এরর বাউন্ডারি (`error.tsx`):** কোনো এপিআই ডাউন হলে বা রানটাইম এরর ঘটলে সাইট ক্র্যাশ হওয়া ঠেকানো এবং "আবার চেষ্টা করুন" (`reset()`) বাটন দেওয়া।
5. **প্রোডাকশন বিল্ড ও ডিপ্লয়মেন্ট:** `npm run build` সফলভাবে সম্পন্ন করা এবং Vercel-এ ডিপ্লয়মেন্টের জন্য প্রয়োজনীয় এনভায়রনমেন্ট ভ্যারিয়েবল প্রস্তুত করা।

---

## ২. ফাইলসমূহ ও কোডের বিস্তারিত বিশ্লেষণ

### ক) `src/app/loading.tsx` (Skeleton UI)
```tsx
export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 animate-pulse">
      {/* ২:১ গ্রিড স্কেলিটন */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* বাম কলাম: বড় লিড নিউজ ও সাব-নিউজ স্কেলিটন */}
        <div className="lg:col-span-2">...</div>
        {/* ডান কলাম: সর্বাধিক পঠিত ১-৬ স্কেলিটন */}
        <div className="lg:col-span-1">...</div>
      </div>
    </main>
  );
}
```
- **ইন্টারভিউ নোট:** `loading.tsx` হলো Next.js-এর একটি স্পেশাল ফাইল কনভেনশন। এটি স্বয়ংক্রিয়ভাবে সংশ্লিষ্ট ফোল্ডারের `page.tsx`-কে একটি `<Suspense fallback={<Loading />}>`-এর ভেতরে মুড়িয়ে দেয়। ফলে ডেভলপারকে ম্যানুয়ালি কোনো `useState(loading)` লিখতে হয় না।

---

### খ) `src/app/not-found.tsx` (Custom 404 Page)
```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center">
      <h1>কাঙ্ক্ষিত পাতাটি খুঁজে পাওয়া যায়নি</h1>
      <Link href="/">← হোমপেজে ফিরে যান</Link>
    </main>
  );
}
```
- **ইন্টারভিউ নোট:** যখন কোনো সার্ভার কম্পোনেন্টে `notFound()` মেথড কল করা হয় (যেমন: অস্তিত্বহীন কোনো আর্টিকেল আইডি `/article/xyz`), নেক্সট জেএস স্বয়ংক্রিয়ভাবে এই `not-found.tsx` রেন্ডার করে।

---

### গ) `src/app/error.tsx` (Error Boundary)
```tsx
"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <h1>কিছু একটা ভুল হয়েছে!</h1>
      <button onClick={() => reset()}>আবার চেষ্টা করুন</button>
    </main>
  );
}
```
- **ইন্টারভিউ নোট:** `error.tsx` অবশ্যই `"use client"` হতে হবে। কারণ এটি ব্রাউজার সাইডে রানটাইম এরর ক্যাপচার করে এবং এতে `reset()` ফাংশন থাকে যা ব্যবহারকারীর রি-ট্রাই ক্লিকে রিরেন্ডার ট্রিগার করে।

---

## ৩. Vercel Deployment Checklist (ডিপ্লয়মেন্ট প্রস্তুতি)

প্রজেক্টটি Vercel-এ ডিপ্লয় করার সময় Vercel ড্যাশবোর্ডের **Settings > Environment Variables**-এ নিচের ভ্যারিয়েবলগুলো অবশ্যই যোগ করতে হবে:

| Variable Name | Value / বিবরণ |
| :--- | :--- |
| `BETTER_AUTH_DB_URL` | আপনার MongoDB Atlas কানেকশন স্ট্রিং |
| `BETTER_AUTH_SECRET` | র্যান্ডম সিক্রেট কী (লোকালের মতো বা নতুন ৩২-বাইটের স্ট্রিং) |
| `BETTER_AUTH_URL` | আপনার লাইভ Vercel ডোমেইন (যেমন: `https://your-app.vercel.app`) |
| `BETTER_AUTH_GOOGLE_CLIENT_ID` | গুগল ক্লাউড কনসোলের ক্লায়েন্ট আইডি |
| `BETTER_AUTH_GOOGLE_SECRET` | গুগল ক্লাউড কনসোলের ক্লায়েন্ট সিক্রেট |
| `BETTER_AUTH_GITHUB_CLIENT_ID` | গিটহাব ডেভেলপার সেটিংসের ক্লায়েন্ট আইডি |
| `BETTER_AUTH_GITHUB_SECRET` | গিটহাব ডেভেলপার সেটিংসের ক্লায়েন্ট সিক্রেট |

> [!TIP]
> **গুগল ও গিটহাব রিডাইরেক্ট ইউআরএল আপডেট:**  
> ডিপ্লয় করার পর Google Console ও GitHub OAuth App সেটিংসে Authorized Redirect URIs-তে আপনার লাইভ লিঙ্ক যোগ করতে হবে:  
> `https://your-app.vercel.app/api/auth/callback/google`  
> `https://your-app.vercel.app/api/auth/callback/github`

---

## ৪. SCIC ও টেকনিক্যাল ইন্টারভিউ প্রশ্নাবলী (Interview Q&A)

### প্রশ্ন ১: `loading.tsx` এবং `not-found.tsx` কীভাবে নেক্সট জেএস অ্যাপ রাউটারে কাজ করে?
> **উত্তর:** এগুলো Next.js App Router-এর বিল্ট-ইন ফাইল কনভেনশন। `loading.tsx` পেজ লোড হওয়ার সময় স্বয়ংক্রিয়ভাবে React Suspense-এর ফলব্যাক হিসেবে কাজ করে। আর `not-found.tsx` কোনো রুটে `notFound()` কল হলে বা ইউআরএল না মিললে সার্ভার থেকে সরাসরি কাস্টম ৪০৪ রেন্ডার করে।

### প্রশ্ন ২: `error.tsx`-এ `"use client"` কেন বাধ্যতামূলক?
> **উত্তর:** কারণ Error Boundary রিয়্যাক্টের ক্লায়েন্ট-সাইড লাইফসাইকেল মেকানিজমের ওপর ভিত্তি করে তৈরি। সার্ভার কম্পোনেন্টে এরর ধরা পড়লে ক্লায়েন্ট যেন সম্পূর্ণ ক্র্যাশ না হয়ে রিকভার করতে পারে, সেজন্য এটি ক্লায়েন্ট কম্পোনেন্ট হিসেবে চলে এবং `reset()` মেথড প্রোভাইড করে।

### প্রশ্ন ৩: `npm run build` পাস হওয়া কেন একটি প্রজেক্টের চূড়ান্ত কোয়ালিটি সার্টিফিকেট?
> **উত্তর:** `npm run build` চালানোর সময় Next.js সমস্ত টাইপস্ক্রিপ্ট ফাইল টাইপ-চেক করে, এসিনক্রোনাস ফাংশন ভ্যালিডেট করে, স্ট্যাটিক ও ডাইনামিক রুট আলাদা করে এবং বান্ডেল অপ্টিমাইজেশন সম্পন্ন করে। এটি পাস করার অর্থ হলো কোডে কোনো কম্পাইলেশন বা সিনট্যাক্স এরর নেই এবং প্রজেক্টটি প্রোডাকশন-রেডি।
