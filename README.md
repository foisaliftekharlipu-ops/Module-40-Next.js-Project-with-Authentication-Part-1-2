# 📰 Bangla News 24

A modern, full-stack Bengali news portal web application built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS**, **DaisyUI**, **Better Auth**, and **MongoDB**.

[![Next.js](https://img.shields.io/badge/Next.js-16.3.8-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.7.7-orange?style=for-the-badge)](https://www.better-auth.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## 🌟 Key Features

### 🗞️ News & Editorial Platform
- **Bengali Typography**: Custom integration with Google Font `Noto Serif Bengali` for a publication-grade reading experience.
- **Header & Navigation**:
  - Live localized Bengali date and weekday formatting (`toLocaleDateString('bn-BD')`).
  - Centered brand identity and category navbar dynamically fetched from API.
  - Interactive authentication state (user avatar, display name, profile link, and signout button).
- **Sticky Breaking News Marquee**: Interactive scrolling ticker displaying breaking headlines with pause-on-hover and direct links to full articles.
- **2-Column Newspaper Layout**:
  - Main lead news with large photography and typography.
  - Dynamic categorization for Politics, World, Economy, Sports, Tech, etc.
  - Sidebar for "সর্বাধিক পঠিত" (Most Read News) ranked 1–10.
- **Full Article Reader (`/article/[id]`)**:
  - Structured content renderer for nested block elements.
  - Journalist byline, publication timestamps, high-resolution imagery, and sources.
- **Dynamic Category Archives (`/[category]`)**:
  - Dedicated pages for individual categories with active article counts and breadcrumbs.
- **Professional Footer**:
  - Newspaper branding, editorial desk details, quick category links, social media handles, and localized copyright notices.

### 🔐 Authentication & Security (Better Auth + MongoDB)
- **Email & Password Authentication**:
  - Secure credential registration (`/signup`) with client validation, password hashing, and duplicate detection.
  - Credential login (`/signin`) with interactive loading spinners and error alert banners.
- **Social OAuth Integration**:
  - **Google OAuth 2.0** login with brand-standard icons and callback handling.
  - **GitHub OAuth** authentication with seamless account linking.
- **User Profile Dashboard (`/profile`)**:
  - Server Component architecture utilizing `auth.api.getSession({ headers: await headers() })`.
  - Displays user profile avatar (or dynamic initial badge), name, email, database ID, and account creation date.
- **Next.js 16 Edge Route Protection (`proxy.ts`)**:
  - **Forward Protection**: Unauthenticated users attempting to access `/profile` are redirected to `/signin?callbackUrl=/profile`.
  - **Smart Return**: Upon successful authentication, users are redirected straight back to their intended destination.
  - **Reverse Protection**: Logged-in users attempting to visit `/signin` or `/signup` are automatically redirected to the homepage (`/`).

### ⚡ User Experience & Resiliency
- **Skeleton Loading UI (`loading.tsx`)**: Automated React Suspense boundaries displaying newspaper layout skeletons to prevent Cumulative Layout Shift (CLS).
- **Custom 404 Page (`not-found.tsx`)**: Polished bilingual 404 page with direct action buttons.
- **Global Error Boundary (`error.tsx`)**: Client error capture with a retry mechanism (`reset()`) to handle unexpected API downtime.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (Turbopack, App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Icons & Ticker**: Native SVG icons & [react-marquee-text](https://www.npmjs.com/package/react-marquee-text)
- **Type Safety**: [TypeScript 5](https://www.typescriptlang.org/)

---

## 📁 Project Structure

```text
bangla-news-24/
├── public/                 # Static assets (logo, favicon)
├── docs/                   # Module study guides and interview notes
│   ├── Module-41-4-Notes.md
│   ├── Module-41-5-Notes.md
│   ├── Module-41-6-Notes.md
│   ├── Module-41-8-Notes.md
│   ├── Module-41-9-Notes.md
│   └── Module-41-10-Notes.md
├── src/
│   ├── app/
│   │   ├── [category]/     # Category news pages
│   │   ├── api/
│   │   │   └── auth/       # Better Auth API catch-all route ([...all])
│   │   ├── article/[id]/   # Full article reading route
│   │   ├── components/     # UI components
│   │   │   ├── AuthButtons.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── MainNews.tsx
│   │   │   ├── Marquee.tsx
│   │   │   ├── NavLinks.tsx
│   │   │   ├── NewsSection.tsx
│   │   │   └── SocialLogin.tsx
│   │   ├── profile/        # Authenticated user profile dashboard
│   │   ├── signin/         # Credential & OAuth sign in
│   │   ├── signup/         # Account registration
│   │   ├── error.tsx       # Global runtime error boundary
│   │   ├── globals.css     # Global styles & Tailwind CSS
│   │   ├── icon.png        # Favicon metadata
│   │   ├── layout.tsx      # Root layout
│   │   ├── loading.tsx     # Global newspaper loading skeleton
│   │   ├── not-found.tsx   # Custom 404 page
│   │   └── page.tsx        # Homepage (2-column newspaper layout)
│   ├── lib/
│   │   ├── auth.ts         # Server-side Better Auth & MongoDB adapter configuration
│   │   └── auth-client.ts  # Client-side Better Auth instance & hooks
│   └── proxy.ts            # Next.js 16 route protection gateway
├── .env.local              # Local environment variables
├── next.config.ts          # Next.js configuration (Remote image domains)
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/bangla-news-24.git
cd bangla-news-24
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
BETTER_AUTH_DB_URL=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/?appName=Cluster0

# Better Auth Configuration
BETTER_AUTH_SECRET=your_super_secret_32_byte_string
BETTER_AUTH_URL=http://localhost:3000

# Social Providers (OAuth 2.0)
BETTER_AUTH_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
BETTER_AUTH_GOOGLE_SECRET=your_google_client_secret

BETTER_AUTH_GITHUB_CLIENT_ID=your_github_client_id
BETTER_AUTH_GITHUB_SECRET=your_github_client_secret
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 5. Build for Production
```bash
npm run build
npm start
```

---

## 🌐 OAuth Callback URLs

When configuring OAuth in developer consoles, set the following Redirect / Callback URIs:

- **Google Cloud Console**:
  - `http://localhost:3000/api/auth/callback/google` (Development)
  - `https://your-production-domain.vercel.app/api/auth/callback/google` (Production)
- **GitHub Developer Settings**:
  - `http://localhost:3000/api/auth/callback/github` (Development)
  - `https://your-production-domain.vercel.app/api/auth/callback/github` (Production)

---

## 📄 License

This project was developed for educational and portfolio demonstration purposes as part of the Programming Hero Full-Stack Development program.
