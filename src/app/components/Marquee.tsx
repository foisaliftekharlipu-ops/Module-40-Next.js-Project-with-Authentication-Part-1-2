import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Headline {
  id: string;
  title: string;
}

interface NewsResponse {
  data: Headline[];
}

const Marquee = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10", {
    cache: "no-store",
  });
  const data: NewsResponse = await res.json();
  const headlines: Headline[] = data.data || [];

  return (
    <div className="overflow-hidden sticky top-0 z-50 bg-[#c10007] text-white shadow-sm">
      <div className="flex items-stretch max-w-7xl mx-auto">
        <div className="bg-[#9f0712] text-white font-bold py-2 px-4 text-sm shrink-0 flex items-center">
          সর্বশেষ
        </div>
        <div className="flex-1 py-1 overflow-hidden">
          <MarqueeText direction="right" duration={18} pauseOnHover={true}>
            {headlines.map((h: Headline, index: number) => (
              <span key={h.id || index} className="inline-flex items-center text-sm py-1">
                <Link
                  href={`/article/${h.id}`}
                  className="hover:underline cursor-pointer transition text-white"
                >
                  {h.title}
                </Link>
                <span className="mx-4 text-white/60">•</span>
              </span>
            ))}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
