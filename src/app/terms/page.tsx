import { generateMetadata as genMeta } from "@/lib/seo/metadata";

export const metadata = genMeta({ title: "Terms of Use", description: "OncologyIT terms of use.", path: "/terms" });

export default function TermsPage() {
  return (
    <section className="py-16">
      <div className="container-narrow prose">
        <h1>Terms of Use</h1>
        <p><em>Effective: March 2026</em></p>
        <h2>Acceptance</h2>
        <p>By accessing OncologyIT, you agree to these terms. If you do not agree, please do not use the platform.</p>
        <h2>Content Disclaimer</h2>
        <p>Content on OncologyIT is for educational and informational purposes only. It does not constitute medical advice, diagnosis, or treatment. The Safety Demo is demonstration software — NOT approved for clinical use.</p>
        <h2>Intellectual Property</h2>
        <p>All content, including articles, courses, and software, is owned by OncologyIT. You may not reproduce or distribute content without permission.</p>
        <h2>Course Purchases</h2>
        <p>Course purchases are non-refundable after certificate issuance. Contact us within 14 days of purchase for refund requests on uncompleted courses.</p>
        <h2>Limitation of Liability</h2>
        <p>OncologyIT is not liable for any clinical decisions made based on platform content. Always consult qualified healthcare professionals for patient care decisions.</p>
      </div>
    </section>
  );
}
