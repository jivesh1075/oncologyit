import { getAllToolkitItems } from "@/lib/mdx/content";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";
import { MDXContent } from "@/components/layout/mdx-content";

export const metadata = genMeta({
  title: "Toolkit",
  description: "Curated tools, books, and frameworks for oncology informatics professionals.",
  path: "/toolkit",
});

const CATEGORY_LABELS: Record<string, string> = {
  books: "Essential Reading",
  tools: "Tools & Software",
  education: "Education & Learning",
  frameworks: "Frameworks",
};

export default function ToolkitPage() {
  const items = getAllToolkitItems();
  const categories = [...new Set(items.map((i) => i.category))];

  return (
    <section className="py-16">
      <div className="container-wide">
        <h1 className="font-serif text-4xl font-bold">Toolkit</h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          Curated resources for oncology informatics professionals navigating
          AI and clinical technology.
        </p>

        {/* Category nav pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <a
              key={cat}
              href={`#${cat}`}
              className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600 transition hover:border-teal hover:text-teal"
            >
              {CATEGORY_LABELS[cat] || cat}
            </a>
          ))}
        </div>

        {/* Grouped items */}
        {categories.map((cat) => (
          <div key={cat} id={cat} className="mt-12">
            <h2 className="font-serif text-2xl font-bold">
              {CATEGORY_LABELS[cat] || cat}
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {items
                .filter((i) => i.category === cat)
                .map((item) => (
                  <div
                    key={item.slug}
                    className="rounded-xl border border-slate-200 bg-white p-6"
                  >
                    <h3 className="font-semibold text-navy">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {item.description}
                    </p>
                    <div className="prose mt-4 text-sm">
                      <MDXContent content={item.content} />
                    </div>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block text-sm font-medium text-teal transition hover:text-teal-dark"
                      >
                        Learn more &rarr;
                      </a>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
