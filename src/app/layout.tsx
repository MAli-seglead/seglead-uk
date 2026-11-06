// src/app/layout.tsx
import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.seglead.co.uk"),
  title: {
    default: "SEGLEAD | Next.js Web Development & AI Automation Agency UK",
    template: "%s | SEGLEAD UK",
  },
  description:
    "UK web engineering and practical AI workflow automation studio for startups and growing brands. High-converting Next.js 16 websites, Claude AI agents, and n8n/Zapier automation from £500 to £3,000.",
  keywords: [
    "Next.js agency UK",
    "AI workflow automation UK",
    "startup web design London",
    "n8n automation consultant UK",
    "Claude AI integration",
    "high converting startup websites",
    "Seglead",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SEGLEAD | Websites & Intelligent AI Systems That Scale",
    description:
      "High-converting Next.js websites and practical AI workflow automation for UK startups. Fixed sprints from £500 to £3,000.",
    url: "https://www.seglead.co.uk",
    siteName: "SEGLEAD",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEGLEAD | Web Engineering & AI Automation Studio (UK)",
    description:
      "Next.js 16 web architecture and AI workflow automation for growing UK brands. Fixed pricing £500–£3,000.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD Structured Data for Google Rich Results (UK Agency + Pricing Range)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SEGLEAD",
  url: "https://www.seglead.co.uk",
  description:
    "Next.js 16 web development and AI workflow automation studio serving UK startups and growing businesses.",
  areaServed: {
    "@type": "Country",
    name: "United Kingdom",
  },
  priceRange: "£500 - £3,000",
  knowsAbout: [
    "Next.js 16 Web Development",
    "AI Workflow Automation",
    "n8n & Zapier Integration",
    "Claude & OpenAI Custom Agents",
    "Technical SEO & Conversion Rate Optimization",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 return (
    <html
      lang="en-GB"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[#0D0E0D] text-[#ECDFCC] font-sans antialiased selection:bg-[#ECDFCC] selection:text-[#0D0E0D] overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}