import { generateMetadata as genMeta } from "@/lib/seo/metadata";
import { NewsletterForm } from "@/components/conversion/newsletter-form";

export const metadata = genMeta({
  title: "Subscribe — Get the Weekly Signal",
  description: "One email per week. The most important developments in oncology informatics, AI, and clinical technology.",
  path: "/subscribe",
});

export default function SubscribePage() {
  return (
    <section className="py-16">
      <div className="container-narrow text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-teal">
          The Weekly Signal
        </p>
        <h1 className="font-serif text-4xl font-bold">
          Stay Ahead of the Curve
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-slate-600">
          One email per week. The most important developments in oncology
          informatics, AI, and clinical technology — distilled by a practicing
          oncologist. No spam, no vendor pitches.
        </p>

        <div className="mt-10">
          <NewsletterForm />
        </div>

        {/* What You Get */}
        <div className="mt-16 grid gap-6 text-left md:grid-cols-3">
          {[
            {
              title: "The Signal Report",
              description: "Weekly curated analysis of the most important developments in oncology tech.",
            },
            {
              title: "Deep Analysis",
              description: "Monthly deep dives into trends, frameworks, and strategic decisions.",
            },
            {
              title: "Builder's Corner",
              description: "Practical insights for teams building or evaluating oncology IT systems.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-6"
            >
              <h3 className="font-serif text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
