import Link from "next/link";
import { SITE_CONFIG } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-slate-200 bg-navy text-slate-400"
      role="contentinfo"
    >
      <div className="container-wide py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-xl font-bold text-white">
              <span className="font-serif">Oncology</span>
              <span className="text-teal">IT</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed">
              {SITE_CONFIG.tagline}. Expert analysis for oncology leaders navigating AI, informatics, and clinical technology.
            </p>
          </div>

          {/* Content */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Content
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/writing" className="transition hover:text-white">Writing</Link></li>
              <li><Link href="/podcast" className="transition hover:text-white">Podcast</Link></li>
              <li><Link href="/toolkit" className="transition hover:text-white">Toolkit</Link></li>
              <li><Link href="/news" className="transition hover:text-white">News</Link></li>
            </ul>
          </div>

          {/* Academy */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Academy
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/course" className="transition hover:text-white">Courses</Link></li>
              <li><Link href="/safety-demo" className="transition hover:text-white">Safety Demo</Link></li>
              <li><Link href="/vendors" className="transition hover:text-white">Vendor Directory</Link></li>
              <li><Link href="/resources" className="transition hover:text-white">Resources</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="transition hover:text-white">About</Link></li>
              <li><Link href="/contact" className="transition hover:text-white">Contact</Link></li>
              <li><Link href="/privacy" className="transition hover:text-white">Privacy</Link></li>
              <li><Link href="/terms" className="transition hover:text-white">Terms</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between border-t border-slate-700 pt-6 text-xs md:flex-row">
          <p>&copy; {currentYear} OncologyIT. All rights reserved.</p>
          <div className="mt-2 flex gap-4 md:mt-0">
            <a
              href={SITE_CONFIG.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <Link href="/rss.xml" className="transition hover:text-white">
              RSS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
