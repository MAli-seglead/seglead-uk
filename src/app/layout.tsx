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
  metadataBase: new URL("https://www.seglead.com"),
  title: {
    default: "SEGLEAD | Web Architecture & AI Automation Studio (UK)",
    template: "%s | SEGLEAD",
  },
  description:
    "Seglead engineers high-performance Next.js 16 web architectures and intelligent AI workflow automation systems for startups and scaling brands in the UK.",
  keywords: [
    "Seglead",
    "Next.js agency UK",
    "AI workflow automation UK",
    "startup web engineering London",
    "n8n automation studio",
    "Claude AI integration",
  ],
  alternates: {
    canonical: "https://www.seglead.com",
  },
  openGraph: {
    title: "SEGLEAD | Web Architecture & AI Automation Studio",
    description:
      "High-converting Next.js 16 websites and practical AI workflow automation engineered for scaling brands.",
    url: "https://www.seglead.com",
    siteName: "SEGLEAD",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEGLEAD | Web Engineering & AI Automation Studio",
    description:
      "Next.js 16 web architecture and intelligent AI systems built to scale.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SEGLEAD",
  url: "https://www.seglead.com",
  email: "info@seglead.com",
  description:
    "Next.js 16 web development and AI workflow automation studio serving UK startups and scaling brands.",
  areaServed: {
    "@type": "Country",
    name: "United Kingdom",
  },
  knowsAbout: [
    "Next.js 16 Web Development",
    "AI Workflow Automation",
    "n8n & Zapier Integration",
    "Claude & OpenAI Custom Agents",
    "Technical SEO & Conversion Architecture",
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
