import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Marquee from "./components/Marquee";
import Footer from "./components/Footer";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
  variable: "--font-noto-bengali",
});

export const metadata: Metadata = {
  title: "Bangla News 24",
  description: "বাংলা সংবাদ, এক জায়গায়।",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.variable} h-full antialiased`}
    >
      <body
        className={`${notoSerifBengali.className} min-h-full flex flex-col`}
      >
        <Header />
        <Marquee />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
