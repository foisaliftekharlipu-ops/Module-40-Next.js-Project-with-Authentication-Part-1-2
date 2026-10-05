import Image from "next/image";

interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  firstPublished?: string;
}

const MainNews = ({ newsData }: { newsData: Article[] }) => {
  if (!newsData || newsData.length === 0) return null;

  const firstArticle = newsData[0];
  const otherArticles = newsData.slice(1, 5); // Next 4 articles

  // Format date to localized Bengali representation
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
    <>
      {/* Column 1: Lead story (Featured large card) */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex flex-col justify-between">
        <div>
          {/* Article featured image */}
          <div className="relative h-64 w-full rounded-xl overflow-hidden mb-4">
            <Image
              src={firstArticle.imageUrl}
              alt={firstArticle.title}
              fill
              className="object-cover"
            />
          </div>

          <span className="text-[#c10007] text-xs font-bold block mb-1">
            প্রধান খবর
          </span>

          <h2 className="text-xl font-bold text-gray-900 leading-snug hover:text-[#c10007] cursor-pointer mb-2">
            {firstArticle.title}
          </h2>

          <p className="text-sm text-gray-600 leading-relaxed">
            {firstArticle.description}
          </p>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          {formatDate(firstArticle.firstPublished)}
        </p>
      </div>

      {/* Column 2: List of 4 sub-stories with dividers */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm divide-y divide-gray-200 flex flex-col justify-between">
        {otherArticles.map((article, index) => (
          <div key={article.id || index} className="py-3 first:pt-0 last:pb-0">
            <span className="text-[#c10007] text-xs font-bold block mb-1">
              প্রধান খবর
            </span>
            <h3 className="font-bold text-gray-900 text-[15px] leading-snug hover:text-[#c10007] cursor-pointer">
              {article.title}
            </h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default MainNews;