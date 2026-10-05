import Image from "next/image";

interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category?: string;
  firstPublished?: string;
}

interface NewsSectionProps {
  title: string;
  articles: Article[];
}

const NewsSection = ({ title, articles }: NewsSectionProps) => {
  if (!articles || articles.length === 0) return null;

  // Localized Bengali date & time formatter
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
    <section className="mt-12">
      {/* Section Heading with red accent border */}
      <div className="flex items-center justify-between border-b-2 border-[#c10007] pb-2 mb-6">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>

      {/* 3-Column Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div
            key={article.id || index}
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:border-red-200 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Image (16:9 aspect ratio with hover zoom effect) */}
              <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Article content and metadata */}
              <div className="p-4">
                <span className="text-[#c10007] text-xs font-semibold block mb-1">
                  {article.category || title}
                </span>

                <h3 className="text-base font-bold text-gray-900 group-hover:text-[#c10007] transition-colors leading-snug line-clamp-2 mb-2">
                  {article.title}
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                  {article.description}
                </p>
              </div>
            </div>

            {/* Publication timestamp */}
            <div className="px-4 pb-4 pt-1">
              <p className="text-[11px] text-gray-400">
                {formatDate(article.firstPublished)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;