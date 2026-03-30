import { generateMetadata as genMeta } from "@/lib/seo/metadata";

export const metadata = genMeta({
  title: "About",
  description: "About Jivesh Sharma, M.D. — Medical Oncologist, CEO of Nexgen Precision, and creator of OncologyIT.",
  path: "/about",
  type: "profile",
});

export default function AboutPage() {
  return (
    <section className="py-16">
      <div className="container-narrow">
        <div className="flex items-start gap-6">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-navy text-3xl font-bold text-teal-light">
            JS
          </div>
          <div>
            <h1 className="font-serif text-3xl font-bold">Jivesh Sharma, M.D.</h1>
            <p className="mt-1 text-lg text-teal">
              Medical Oncologist · CEO, Nexgen Precision
            </p>
          </div>
        </div>

        <div className="prose mt-10">
          <p>
            30+ years of clinical oncology practice. MIT Sloan AI Certificate holder.
            Building at the intersection of cancer medicine and technology.
          </p>
          <p>
            OncologyIT exists because the people making technology decisions in cancer care
            deserve better information. Not vendor press releases. Not hype cycles.
            Actual analysis from someone who has spent three decades treating patients
            and now builds the systems that support that work.
          </p>

          <h2>What This Platform Is</h2>
          <ul>
            <li><strong>Vendor-independent.</strong> No sponsored content, no affiliate-driven recommendations.</li>
            <li><strong>Clinician-first.</strong> Written for oncologists, informaticists, and health system leaders — not investors.</li>
            <li><strong>Practice-grounded.</strong> Every framework and analysis comes from real clinical experience.</li>
          </ul>

          <h2>The OpenClaw Thesis</h2>
          <p>
            Health systems should own their AI infrastructure, not rent it from SaaS vendors
            who control the data flywheel. OncologyIT provides the analysis and education
            to help leaders make that transition.
          </p>

          <h2>Connect</h2>
          <ul>
            <li><a href="https://www.linkedin.com/in/jiveshsharma" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="mailto:jivesh@oncologyit.com">jivesh@oncologyit.com</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
