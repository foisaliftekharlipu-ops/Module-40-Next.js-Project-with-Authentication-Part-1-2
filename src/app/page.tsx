import Image from "next/image";
import Link from "next/link";
import Marquee from "./components/Marquee";

interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  firstPublished?: string;
  category?: string;
}

interface Section {
  curationId: string;
  title?: string;
  articles: Article[];
}

export default async function Home() {
  // 1. Fetch all categorized news sections from API
  const sectionsRes = await fetch(
    "https://news-api-v2.vercel.app/api/news/sections",
    { cache: "no-store" }
  );
  const sectionsData = await sectionsRes.json();
  const sections: Section[] = sectionsData.data || [];

  // Separate main lead news from other category sections
  const [mainSection, ...otherSections] = sections;
  const firstMainArticle = mainSection?.articles?.[0];
  const otherMainArticles = mainSection?.articles?.slice(1, 5) || [];

  // Filter sections containing multiple news articles
  const validSections = otherSections.filter(
    (s) => s.articles && s.articles.length > 1
  );

  // 2. Fetch top 10 most-read articles for sidebar
  const mostReadRes = await fetch(
    "https://news-api-v2.vercel.app/api/news?limit=10",
    { cache: "no-store" }
  );
  const mostReadData = await mostReadRes.json();
  const mostReadArticles: Article[] = mostReadData.data || [];

  // Localized date and time formatter
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <main className="min-h-screen bg-[#fafafa] pb-24">

      {/* Main Layout Grid: Left 2fr (News feeds) and Right 1fr (Sidebar) */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr] items-start">
          
          {/* ================= Left Side (2fr) ================= */}
          <div className="space-y-10">
            
            {/* 1. Lead News Section (Large photo card + 4 sub-stories) */}
            <section className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              {firstMainArticle && (
                <Link
                  href={`/article/${firstMainArticle.id}`}
                  className="group block overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm hover:border-red-200 transition"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
                    <Image
                      src={firstMainArticle.imageUrl}
                      alt={firstMainArticle.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-semibold text-red-700">
                      প্রধান খবর
                    </span>
                    <h2 className="mt-1 text-xl font-bold leading-snug text-neutral-900 group-hover:text-red-700 transition cursor-pointer">
                      {firstMainArticle.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm text-neutral-600 leading-relaxed">
                      {firstMainArticle.description}
                    </p>
                    <p className="mt-3 text-xs text-neutral-400">
                      {formatDate(firstMainArticle.firstPublished)}
                    </p>
                  </div>
                </Link>
              )}

              <div className="flex flex-col divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white shadow-sm justify-between">
                {otherMainArticles.map((article, index) => (
                  <Link
                    href={`/article/${article.id}`}
                    key={article.id || index}
                    className="p-3.5 hover:bg-neutral-50 transition cursor-pointer block"
                  >
                    <span className="text-xs font-semibold text-red-700">
                      প্রধান খবর
                    </span>
                    <h3 className="mt-1 font-semibold leading-snug text-neutral-900 hover:text-red-700 text-sm">
                      {article.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>

            {/* 2. Remaining Category Sections */}
            {validSections.map((os) => (
              <section key={os.curationId} className="pt-2">
                {/* Section Heading */}
                <h2 className="mb-4 border-b-2 border-red-700 pb-2 text-lg font-bold text-neutral-900">
                  {os.title}
                </h2>

                {/* Section articles in 3-column responsive grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {os.articles.map((article, index) => (
                    <Link
                      href={`/article/${article.id}`}
                      key={article.id || index}
                      className="group block overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm hover:border-red-200 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        {/* 16:9 Aspect Ratio Featured Image */}
                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
                          <Image
                            src={article.imageUrl}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Article Content */}
                        <div className="p-3">
                          <span className="text-xs font-semibold text-red-700">
                            {os.title}
                          </span>
                          <h3 className="mt-1 font-semibold leading-snug text-neutral-900 group-hover:text-red-700 text-sm line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="mt-1.5 line-clamp-2 text-xs text-neutral-600 leading-relaxed">
                            {article.description}
                          </p>
                        </div>
                      </div>

                      {/* Publication Date */}
                      <div className="p-3 pt-0">
                        <p className="text-[11px] text-neutral-400">
                          {formatDate(article.firstPublished)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}

          </div>

          {/* ================= Right Side: Sidebar (1fr) ================= */}
          {/* Most read articles list ranked 1 to 10 */}
          <aside className="w-full">
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-neutral-900">
                সর্বাধিক পঠিত
              </h2>
              <div className="space-y-4">
                {mostReadArticles.map((item, index) => (
                  <Link
                    href={`/article/${item.id}`}
                    key={item.id || index}
                    className="flex items-start gap-3 group cursor-pointer block"
                  >
                    <span className="text-red-700 font-bold text-base leading-none w-5 shrink-0">
                      {index + 1}
                    </span>
                    <h4 className="text-sm font-medium text-neutral-800 leading-snug group-hover:text-red-700 transition">
                      {item.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}