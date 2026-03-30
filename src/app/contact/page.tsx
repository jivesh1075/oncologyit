import { generateMetadata as genMeta } from "@/lib/seo/metadata";
import { Mail, Building2, Handshake, MessageSquare } from "lucide-react";

export const metadata = genMeta({
  title: "Contact",
  description: "Get in touch with the OncologyIT team.",
  path: "/contact",
});

export default function ContactPage() {
  const contacts = [
    { icon: Mail, title: "General Inquiries", description: "Questions about the platform or content.", email: "hello@oncologyit.com" },
    { icon: Building2, title: "Vendor Information", description: "Vendor directory submissions and updates.", email: "vendors@oncologyit.com" },
    { icon: Handshake, title: "Partnerships", description: "Speaking engagements and collaborations.", email: "partnerships@oncologyit.com" },
    { icon: MessageSquare, title: "Feedback", description: "Platform feedback and suggestions.", email: "feedback@oncologyit.com" },
  ];

  return (
    <section className="py-16">
      <div className="container-wide">
        <h1 className="font-serif text-4xl font-bold">Contact</h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          Have a question, partnership proposal, or feedback? Reach out.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {contacts.map((c) => (
            <div key={c.title} className="rounded-xl border border-slate-200 bg-white p-6">
              <c.icon className="h-8 w-8 text-teal" aria-hidden="true" />
              <h2 className="mt-3 font-serif text-lg font-bold">{c.title}</h2>
              <p className="mt-1 text-sm text-slate-600">{c.description}</p>
              <a href={`mailto:${c.email}`} className="mt-3 inline-block text-sm font-medium text-teal hover:text-teal-dark">
                {c.email}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
