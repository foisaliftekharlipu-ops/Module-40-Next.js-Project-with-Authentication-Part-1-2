import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category?: string;
  firstPublished?: string;
}

interface PageProps {
  params: Promise<{ category: string }>;
}

const categoryTitles: Record<string, string> = {
  politics: "রাজনীতি",
  world: "বিশ্ব",
  economy: "অর্থনীতি",
  health: "স্বাস্থ্য",
  sports: "খেলা",
  technology: "প্রযুক্তি",
  video: "দেখুন",
};

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;

  // Fetch news articles for specified category from API
  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${category}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    notFound();
  }

  const json = await res.json();
  const articles: Article[] = json.data || [];

  const categoryName = categoryTitles[category] || category;

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
    <main className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumbs navigation */}
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-6">
          <Link href="/" className="hover:text-red-700 transition">
            হোম
          </Link>
          <span>/</span>
          <span className="text-red-700 font-semibold">{categoryName}</span>
        </div>

        {/* Category header section */}
        <div className="border-b-2 border-red-700 pb-3 mb-8 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900">
            {categoryName} সংবাদ
          </h1>
          <span className="text-xs md:text-sm text-neutral-500">
            মোট খবর: {articles.length} টি
          </span>
        </div>

        {/* News article grid */}
        {articles.length === 0 ? (
          <div className="text-center py-20 text-neutral-500">
            এই ক্যাটাগরিতে বর্তমানে কোনো সংবাদ পাওয়া যায়নি।
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
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

                  {/* Article Title and Excerpt */}
                  <div className="p-4">
                    <span className="text-xs font-semibold text-red-700 block mb-1">
                      {article.category || categoryName}
                    </span>
                    <h2 className="text-base font-bold text-neutral-900 group-hover:text-red-700 transition leading-snug line-clamp-2 mb-2">
                      {article.title}
                    </h2>
                    <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                      {article.description}
                    </p>
                  </div>
                </div>

                {/* Publication Date */}
                <div className="p-4 pt-0">
                  <p className="text-[11px] text-neutral-400">
                    {formatDate(article.firstPublished)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
