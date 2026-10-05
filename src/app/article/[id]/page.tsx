import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BylineItem {
  name: string;
  role?: string | null;
}

interface ArticleDetail {
  id: string;
  title: string;
  description?: any;
  firstPublished?: string;
  lastPublished?: string;
  byline?: BylineItem[] | BylineItem | string | null;
  imageUrl: string;
  text?: string;
  source?: string;
  sourceUrl?: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;

  // Fetch individual article data from API
  const res = await fetch(`https://news-api-v2.vercel.app/api/article/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const json = await res.json();
  const article: ArticleDetail = json.data;

  if (!article) {
    notFound();
  }

  // Format date to localized Bengali string
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

  // Determine journalist byline or author name
  let authorName: string | null = null;
  if (Array.isArray(article.byline)) {
    authorName = article.byline.map((b) => b?.name).filter(Boolean).join(", ");
  } else if (
    article.byline &&
    typeof article.byline === "object" &&
    "name" in article.byline
  ) {
    authorName = (article.byline as BylineItem).name || null;
  } else if (typeof article.byline === "string") {
    authorName = article.byline;
  }

  // Extract description text (safely handling string vs nested block objects)
  let descriptionText = "";
  if (typeof article.description === "string") {
    descriptionText = article.description;
  } else if (
    article.description &&
    typeof article.description === "object" &&
    article.description.blocks
  ) {
    descriptionText =
      article.description.blocks?.[0]?.model?.blocks?.[0]?.model?.text || "";
  }

  // Split raw article text into paragraphs
  const rawText = typeof article.text === "string" ? article.text : "";
  const paragraphs = rawText
    ? rawText.split("\n\n").filter(Boolean)
    : descriptionText
    ? [descriptionText]
    : [];

  return (
    <article className="min-h-screen bg-neutral-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back to Homepage button */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-red-700 hover:text-red-800 mb-6 group transition"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">
            ←
          </span>
          <span>হোমপেজে ফিরে যান</span>
        </Link>

        {/* Main Article Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-10 shadow-sm">
          {/* Article Headline */}
          <h1 className="text-2xl md:text-4xl font-extrabold text-neutral-900 leading-tight mb-4">
            {article.title}
          </h1>

          {/* Byline and publication timestamp */}
          <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-neutral-500 pb-6 mb-6 border-b border-neutral-100">
            {article.source && (
              <span className="font-semibold text-red-700 bg-red-50 px-2.5 py-1 rounded">
                {article.source}
              </span>
            )}
            {authorName && <span>প্রতিবেদক: {authorName}</span>}
            {article.firstPublished && (
              <span suppressHydrationWarning>
                প্রকাশ: {formatDate(article.firstPublished)}
              </span>
            )}
          </div>

          {/* Lead featured image */}
          {article.imageUrl && (
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-8 bg-neutral-100 shadow-inner">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}

          {/* Standfirst / Lead intro paragraph */}
          {descriptionText && (
            <p className="text-lg md:text-xl font-medium text-neutral-700 leading-relaxed mb-6 bg-neutral-50 p-4 rounded-xl border-l-4 border-red-700">
              {descriptionText}
            </p>
          )}

          {/* Article body paragraphs */}
          <div className="space-y-4 text-neutral-800 text-base md:text-lg leading-relaxed pt-2">
            {paragraphs.map((p, idx) => (
              <p key={idx} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
