import { generateMetadata as genMeta } from "@/lib/seo/metadata";

export const metadata = genMeta({ title: "Privacy Policy", description: "OncologyIT privacy policy.", path: "/privacy" });

export default function PrivacyPage() {
  return (
    <section className="py-16">
      <div className="container-narrow prose">
        <h1>Privacy Policy</h1>
        <p><em>Last updated: March 2026</em></p>
        <h2>Information We Collect</h2>
        <p>We collect information you provide directly: email address for newsletter subscriptions, account information for course enrollment, and form submissions.</p>
        <h2>How We Use Information</h2>
        <p>Your information is used to deliver newsletter content, track course progress, issue certificates, and improve the platform. We do not sell personal data to third parties.</p>
        <h2>Third-Party Services</h2>
        <p>We use Supabase (authentication/database), Vercel (hosting), Stripe (payments), and Beehiiv (newsletters). Each service has its own privacy policy.</p>
        <h2>Data Security</h2>
        <p>We implement industry-standard security measures including encryption in transit (TLS), secure authentication, and regular security reviews.</p>
        <h2>Contact</h2>
        <p>For privacy inquiries: <a href="mailto:privacy@oncologyit.com">privacy@oncologyit.com</a></p>
      </div>
    </section>
  );
}
