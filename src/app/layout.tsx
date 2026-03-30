import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SearchProvider } from "@/components/search/search-provider";
import { defaultMetadata } from "@/lib/seo/metadata";
import "@/styles/globals.css";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="flex min-h-screen flex-col bg-slate-50 text-navy antialiased">
        <SearchProvider>
          <Header />
          <main className="flex-1 pt-16" id="main-content" role="main">
            {children}
          </main>
          <Footer />
        </SearchProvider>
      </body>
    </html>
  );
}
