import Link from "next/link";

interface Navs {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

const NavLinks = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/categories", {
    cache: "no-store",
  });
  const data = await res.json();
  const navs: Navs[] = data.data || [];
  const filteredNavs = navs.filter((n: Navs) => n.scrapable);

  return (
    <nav className="mx-auto max-w-7xl px-4 py-2.5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
      <Link
        href="/"
        className="text-neutral-700 hover:text-red-700 font-medium transition-colors"
      >
        হোম
      </Link>
      {filteredNavs.map((n, i: number) => (
        <Link
          key={i}
          href={n.slug.startsWith("/") ? n.slug : `/${n.slug}`}
          className="text-neutral-700 hover:text-red-700 font-medium transition-colors"
        >
          {n.title}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;