# Module 41-9: Route Protection via Proxy.js / Middleware (স্টাডি ও ইন্টারভিউ নোট)

---

## ১. ক্লাসের মূল উদ্দেশ্য (Key Objectives)
1. **অননুমোদিত অ্যাক্সেস প্রতিরোধ (Route Protection):** আন-অথেনটিকেটেড ইউজার যাতে সরাসরি ইউআরএল টাইপ করে `/profile` বা কোনো ড্যাশবোর্ডে প্রবেশ করতে না পারে তা নিশ্চিত করা।
2. **Next.js 16-এর নতুন `proxy.ts` কনভেনশন বোঝা:** কেন Next.js 16-এ প্রচলিত `middleware.ts`-এর নাম পরিবর্তন করে `proxy.ts` করা হয়েছে এবং এর কার্যপ্রণালী।
3. **দ্বিমুখী সুরক্ষা (Dual-Way Protection):**
   - **ফরওয়ার্ড প্রটেকশন:** লগইন ছাড়া `/profile`-এ যাওয়ার চেষ্টা করলে রিডাইরেক্ট করে `/signin?callbackUrl=/profile`-এ পাঠানো।
   - **রিভার্স প্রটেকশন:** ইতিমধ্যে লগইন থাকা ইউজার যাতে অপ্রয়োজনে `/signin` বা `/signup` পেজে ঢুকতে না পারে, তাকে সরাসরি হোমপেজে (`/`) পাঠিয়ে দেওয়া।
4. **স্মার্ট রিডাইরেক্ট (`callbackUrl`):** সাইন ইন সম্পন্ন হওয়ার পর ব্যবহারকারীকে হোমপেজে না পাঠিয়ে সে যে পেজে যাওয়ার চেষ্টা করছিল (যেমন: `/profile`) সরাসরি সেখানে পাঠিয়ে দেওয়া।

---

## ২. Next.js 16 স্পেশাল কনসেপ্ট: Middleware থেকে Proxy.ts কেন? (Super Important for Interviews!)

> [!IMPORTANT]
> **ইন্টারভিউয়ার যদি জিজ্ঞেস করেন: Next.js 16-এ `proxy.ts` কী এবং কেন?**
> - **ঐতিহাসিক কারণ:** Next.js 16-এর আগে ফাইলটির নাম ছিল `middleware.ts`। কিন্তু ডেভেলপাররা প্রায়ই এতে ভারী ডাটাবেজ কোড লিখে এজ রানটাইমে পারফরম্যান্স নষ্ট করতেন।
> - **উদ্দেশ্য স্পষ্টকরণ:** Next.js টিম এর নাম পরিবর্তন করে `proxy.ts` করেছে এটি বোঝাতে যে এটি মূলত একটি **Network Gateway বা Proxy Layer**। এর কাজ শুধু ইনকামিং রিকোয়েস্ট ইন্টারসেপ্ট করা, রুট রিডাইরেক্ট করা, হেডার/কুকি চেক করা—ভারী বিজনেস লজিক চালানো নয়।
> - Next.js 16 স্পষ্ট নির্দেশনা দেয়: `"Please use ./src/proxy.ts only."`

---

## ৩. কোড ও লাইন-বাই-লাইন বিশ্লেষণ

### ফাইল: `src/proxy.ts`

```typescript
1: import { NextResponse } from "next/server";
2: import type { NextRequest } from "next/server";
```
- **ব্যাখ্যা:**
  - `NextResponse`: সার্ভার থেকে রিডাইরেক্ট (`redirect`) বা রিকোয়েস্ট পরবর্তী ধাপে পাস (`next`) করার জন্য নেক্সট জেএস রেসপন্স হেল্পার।
  - `NextRequest`: ইনকামিং এইচটিটিপি রিকোয়েস্টের টাইপ ডেফিনিশন।

```typescript
4: export function proxy(request: NextRequest) {
5:   const { pathname } = request.nextUrl;
```
- **ব্যাখ্যা:** Next.js 16 কনভেনশন অনুযায়ী ফাংশনের নাম `proxy`। ইউজার কোন ইউআরএলে যাওয়ার চেষ্টা করছে তা `request.nextUrl.pathname` থেকে নেওয়া হয়েছে।

```typescript
8:   const sessionCookie =
9:     request.cookies.get("better-auth.session_token") ||
10:    request.cookies.get("__Secure-better-auth.session_token");
```
- **ব্যাখ্যা (Better Auth সেশন কুকি চেক):**
  - Better Auth লোকাল ডেভেলপমেন্টে (HTTP) `better-auth.session_token` নামে এবং প্রোডাকশনে (HTTPS) `__Secure-better-auth.session_token` নামে সিকিউর কুকি সংরক্ষণ করে।
  - আমরা দুটিই চেক করেছি যাতে লোকাল এবং Vercel প্রোডাকশন উভয়েই ১০০% কাজ করে।

```typescript
13:   // ১. প্রটেক্টেড রুট সুরক্ষা (Forward Protection)
14:   if (!sessionCookie && pathname.startsWith("/profile")) {
15:     const signInUrl = new URL("/signin", request.url);
16:     signInUrl.searchParams.set("callbackUrl", pathname);
17:     return NextResponse.redirect(signInUrl);
18:   }
```
- **ব্যাখ্যা:**
  - ইউজার লগইন না থাকলে এবং `/profile` রুটে ঢুকতে চাইলে তাকে `/signin` পেজে রিডাইরেক্ট করে দেওয়া হয়।
  - ইউআরএলে কুয়েরি প্যারামিটার হিসেবে `?callbackUrl=/profile` যোগ করা হয়, যাতে সাইনইন হওয়ার পর ইউজার সরাসরি প্রোফাইলে ফিরে আসতে পারে।

```typescript
21:   // ২. রিভার্স প্রটেকশন (Reverse Protection)
22:   if (sessionCookie && (pathname === "/signin" || pathname === "/signup")) {
23:     return NextResponse.redirect(new URL("/", request.url));
24:   }
```
- **ব্যাখ্যা:** যে ইউজার ইতিমধ্যে লগইন অবস্থায় আছে, তার পুনরায় সাইনইন বা সাইনআপ ফর্মে যাওয়ার দরকার নেই। সে যাওয়ার চেষ্টা করলেই প্রক্সি তাকে হোমপেজে রিডাইরেক্ট করে দেয়।

```typescript
27:   return NextResponse.next();
28: }
```
- **ব্যাখ্যা:** যদি কোনো সুরক্ষা শর্ত ভঙ্গ না হয়, তবে রিকোয়েস্টটি স্বাভাবিকভাবে পেজে চলে যাবে।

```typescript
31: export const config = {
32:   matcher: ["/profile/:path*", "/signin", "/signup"],
33: };
```
- **ব্যাখ্যা (পারফরম্যান্স অপ্টিমাইজেশন):**
  - `matcher` নির্দেশ দেয় যে প্রক্সি ফাংশনটি শুধু `/profile`, `/signin`, এবং `/signup` রুটেই চলবে। ইমেজ, ফন্ট বা হোমপেজের জন্য অপ্রয়োজনীয়ভাবে রান হবে না।

---

## ৪. SCIC ও টেকনিক্যাল ইন্টারভিউ প্রশ্নাবলী (Interview Q&A)

### প্রশ্ন ১: The "Gatekeeper" Pattern বনাম "Data Boundary" Pattern কী?
> **উত্তর:**
> - **Gatekeeper Pattern (`proxy.ts`):** এটি নেটওয়ার্কের একদম প্রবেশদ্বারে (Edge) দ্রুত চেক করে—কুকি আছে কি নেই। না থাকলে সাথে সাথে রিডাইরেক্ট করে।
> - **Data Boundary Pattern (Server Component):** প্রক্সি শুধু কুকির অস্তিত্ব দেখে, কিন্তু কুকিটি ডাটাবেজে ভ্যালিড কি না বা এক্সপায়ার হয়েছে কি না তা পেজের Server Component-এ (`auth.api.getSession`) ডাটাবেজ ভ্যালিডেশনের মাধ্যমে যাচাই করা হয়। ইন্টারভিউতে উভয় লেয়ারের সুরক্ষা দেখানো সেরা প্র্যাকটিস!

### প্রশ্ন ২: সাইনইন পেজে `useSearchParams` ব্যবহারের সময় কেন `<Suspense>` র‍্যাপার দিতে হয়?
> **উত্তর:** Next.js App Router-এ ক্লায়েন্ট কম্পোনেন্টে `useSearchParams()` ব্যবহার করলে বিল্ড টাইমে পেজটি ক্লায়েন্ট-সাইড ডিঅপ্ট হতে পারে। তাই রিয়্যাক্ট ১৮/১৯ এবং নেক্সট জেএস নিয়ম অনুযায়ী এটিকে `<Suspense>` বাউন্ডারি দিয়ে ঘিরে দিতে হয়, যাতে লোডিং চলাকালীন ফলব্যাক স্কেলিটন দেখানো যায়।

### প্রশ্ন ৩: `callbackUrl` কীভাবে কাজ করে?
> **উত্তর:** প্রক্সি যখন রিডাইরেক্ট করে, তখন ইউআরএলে কাঙ্ক্ষিত পেজের ঠিকানা পাঠিয়ে দেয় (`/signin?callbackUrl=/profile`)। সাইনইন পেজ লগইন সফল হওয়ার পর `router.push(callbackUrl)` কল করে ইউজারকে আগের পেজেই ফেরত পাঠায়।

---

## ৫. সংক্ষেপ চেকলিস্ট

| সুরক্ষা ধরন | অবস্থা | অ্যাকশন |
| :--- | :--- | :--- |
| **লগইন ছাড়া `/profile`** | `!sessionCookie` | `/signin?callbackUrl=/profile`-এ রিডাইরেক্ট |
| **লগইন অবস্থায় `/signin`** | `sessionCookie` | `/` (হোমপেজে) রিডাইরেক্ট |
| **লগইন অবস্থায় `/signup`** | `sessionCookie` | `/` (হোমপেজে) রিডাইরেক্ট |
| **অন্যান্য রুট** | সাধারণ রিকোয়েস্ট | `NextResponse.next()` |
