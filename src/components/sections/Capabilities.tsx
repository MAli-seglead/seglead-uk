// src/components/sections/Capabilities.tsx
"use client";

import React, { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ArrowUpRight, Check } from "lucide-react";

interface CapabilityItem {
  id: string;
  num: string;
  title: string;
  tag: string;
  price: string;
  pitch: string;
  deliverables: [string, string, string];
  stack: string[];
  metricVal: string;
  metricLabel: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: "web",
    num: "01",
    title: "Next.js 16 Web Engineering",
    tag: "SPEED & CONVERSION",
    price: "£500 – £1,200",
    pitch:
      "Bespoke, sub-second websites engineered from scratch to rank on Google UK and turn visitors into booked calls—without bloated agency templates.",
    deliverables: [
      "Custom Next.js 16 & GSAP motion architecture",
      "Technical Google SEO & JSON-LD schema setup",
      "Conversion-focused copy & instant lead capture",
    ],
    stack: ["NEXT.JS 16", "TYPESCRIPT", "TAILWIND", "GSAP"],
    metricVal: "0.28s",
    metricLabel: "AVERAGE PAGE LOAD",
  },
  {
    id: "automation",
    num: "02",
    title: "n8n & Zapier Workflow Pipelines",
    tag: "ZERO MANUAL ADMIN",
    price: "£1,200 – £2,000",
    pitch:
      "We connect your website, CRM, Slack, WhatsApp, and Stripe so inbound enquiries and client onboarding run automatically behind the scenes.",
    deliverables: [
      "Instant lead routing to HubSpot, Notion, or Pipedrive",
      "Automated WhatsApp & Slack team deal alerts",
      "1-click client onboarding, contracts & Stripe invoicing",
    ],
    stack: ["N8N", "ZAPIER", "WEBHOOKS", "HUBSPOT", "SLACK"],
    metricVal: "20+ hrs",
    metricLabel: "ADMIN SAVED WEEKLY",
  },
  {
    id: "agents",
    num: "03",
    title: "Custom Claude & OpenAI Agents",
    tag: "24/7 AI QUALIFICATION",
    price: "£1,500 – £2,400",
    pitch:
      "Intelligent AI assistants trained on your exact pricing, case studies, and services that answer buyer questions and book qualified calls 24/7.",
    deliverables: [
      "Custom AI agent grounded in your company knowledge",
      "Live budget & scope qualification before booking",
      "Direct Cal.com / Calendly & WhatsApp handoff",
    ],
    stack: ["CLAUDE 3.7", "OPENAI API", "VECTOR RAG", "CAL.COM"],
    metricVal: "92%",
    metricLabel: "FASTER LEAD RESPONSE",
  },
  {
    id: "portals",
    num: "04",
    title: "Custom Web Apps & Client Portals",
    tag: "FULL DIGITAL SCALING",
    price: "£2,200 – £3,000",
    pitch:
      "Full-stack dashboards, internal operations tools, and secure client portals built to scale your business delivery without adding extra headcount.",
    deliverables: [
      "Secure client login portals & live project trackers",
      "Supabase / Postgres database & custom APIs",
      "Real-time revenue & operations telemetry dashboards",
    ],
    stack: ["FULL-STACK NEXT.JS", "SUPABASE", "POSTGRES", "STRIPE UK"],
    metricVal: "3x",
    metricLabel: "FASTER DELIVERY",
  },
];

const TECH_TICKER = [
  "NEXT.JS 16",
  "REACT 19",
  "TYPESCRIPT",
  "GSAP MOTION",
  "CLAUDE 3.7 AI",
  "OPENAI API",
  "N8N WORKFLOWS",
  "ZAPIER",
  "SUPABASE",
  "TAILWIND CSS",
  "STRIPE UK",
  "VERCEL EDGE",
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const splitGridRef = useRef<HTMLDivElement>(null);
  const rightConsoleRef = useRef<HTMLDivElement>(null);
  const articleRefs = useRef<(HTMLElement | null)[]>([]);

  const [activeIdx, setActiveIdx] = useState<number>(0);

  const activeItem = CAPABILITIES[activeIdx];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // 1. DESKTOP: Pin the Right Console via GSAP ScrollTrigger (Never gets stuck at top!)
      mm.add("(min-width: 1024px)", () => {
        const lastArticle = articleRefs.current[CAPABILITIES.length - 1];
        if (rightConsoleRef.current && splitGridRef.current && lastArticle) {
          ScrollTrigger.create({
            trigger: splitGridRef.current,
            start: "top 110px",
            endTrigger: lastArticle,
            end: "top 110px",
            pin: rightConsoleRef.current,
            pinSpacing: false,
            invalidateOnRefresh: true,
          });
        }
      });

      // 2. Track which Left-Column capability article is in the viewport center
      articleRefs.current.forEach((article, idx) => {
        if (!article) return;

        ScrollTrigger.create({
          trigger: article,
          start: "top 58%",
          end: "bottom 42%",
          onEnter: () => setActiveIdx(idx),
          onEnterBack: () => setActiveIdx(idx),
        });
      });

      // 3. Continuous SVG Schematic Animations inside the Pinned Right Console
      gsap.to(".cap-pulse-line", {
        strokeDashoffset: -120,
        duration: 2.5,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".cap-spin-slow", {
        rotation: 360,
        transformOrigin: "50% 50%",
        duration: 18,
        repeat: -1,
        ease: "none",
      });

      // 4. Smooth Infinite Tech Ticker at the bottom
      gsap.to(".tech-marquee-track", {
        xPercent: -50,
        duration: 26,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: sectionRef }
  );

  // Subtle crossfade when the pinned right console switches schematics
  useGSAP(
    () => {
      gsap.fromTo(
        ".console-swap",
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    },
    { scope: sectionRef, dependencies: [activeIdx] }
  );

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="relative w-full py-24 md:py-36 px-6 md:px-12 bg-transparent text-[#ECDFCC] border-t border-[#3C3D37]/60"
    >
      <div className="max-w-7xl mx-auto">
        {/* ===============================================================
            SECTION HEADER
        =============================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#3C3D37]/60">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#697565]">.03</span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ECDFCC]/80">
                CAPABILITIES &amp; SCOPE
              </span>
            </div>
            <h2
              id="capabilities-heading"
              className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#ECDFCC] leading-[1.06]"
            >
              Four core systems.{" "}
              <span className="text-[#697565]">Zero agency bloat.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#ECDFCC]/70 max-w-md leading-relaxed">
            Scroll calmly through our four engineering pillars below. Every
            system is scoped transparently between{" "}
            <span className="text-[#ECDFCC] font-semibold">£500 and £3,000</span>.
          </p>
        </div>

        {/* ===============================================================
            FLIPPED SPLIT-SCROLL LAYOUT
            Left Column (7 Cols): Open, Calmly Scrollable Chapters (/01 -> /04)
            Right Column (5 Cols): GSAP-Pinned Live Blueprint Console (Desktop)
        =============================================================== */}
        <div
          ref={splitGridRef}
          className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* LEFT COLUMN (7 Cols): Scrollable Capability Articles */}
          <div className="lg:col-span-7 space-y-24 md:space-y-36">
            {CAPABILITIES.map((item, idx) => {
              const isActive = activeIdx === idx;

              return (
                <article
                  key={item.id}
                  ref={(el) => {
                    articleRefs.current[idx] = el;
                  }}
                  className={`transition-opacity duration-500 border-t border-[#3C3D37] pt-8 md:pt-12 ${
                    isActive ? "opacity-100" : "lg:opacity-35 opacity-100"
                  }`}
                >
                  {/* Top Meta Row: Number, Tag & Price Pill */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#ECDFCC] text-[#0D0E0D]">
                        /{item.num}
                      </span>
                      <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#697565]">
                        {item.tag}
                      </span>
                    </div>

                    <span className="font-mono text-xs font-semibold text-[#ECDFCC] px-3 py-1 border border-[#3C3D37] bg-[#0D0E0D]">
                      {item.price}
                    </span>
                  </div>

                  {/* Capability Title */}
                  <h3 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-[1.12] text-[#ECDFCC]">
                    {item.title}
                  </h3>

                  {/* Clear Pitch Paragraph */}
                  <p className="mt-4 text-base sm:text-lg text-[#ECDFCC]/75 leading-relaxed">
                    {item.pitch}
                  </p>

                  {/* 3 Concrete Deliverables */}
                  <ul className="mt-7 space-y-3 border-t border-[#3C3D37]/60 pt-6">
                    {item.deliverables.map((deliv, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm sm:text-base text-[#ECDFCC]/90"
                      >
                        <span className="mt-1 w-4 h-4 bg-[#ECDFCC]/10 border border-[#697565] flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-[#ECDFCC]" />
                        </span>
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom Tech Pills + Direct CTA */}
                  <div className="mt-8 pt-6 border-t border-[#3C3D37]/60 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {item.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 bg-[#0D0E0D] border border-[#3C3D37] text-[#ECDFCC]/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#investment"
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#ECDFCC] hover:text-[#697565] transition-colors"
                    >
                      <span>Configure Scope</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          {/* RIGHT COLUMN (5 Cols): GSAP-Pinned Live Blueprint Console */}
          <div className="hidden lg:block lg:col-span-5">
            <div
              ref={rightConsoleRef}
              className="border border-[#3C3D37] bg-[#0D0E0D] p-6 xl:p-8 space-y-6"
            >
              {/* Top Console Status Strip */}
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#3C3D37]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ECDFCC] animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#697565]">
                    ACTIVE SYSTEM // 0{activeIdx + 1}
                  </span>
                </div>
                <span className="console-swap font-mono text-xs font-semibold px-2.5 py-0.5 bg-[#ECDFCC] text-[#0D0E0D]">
                  {activeItem.price}
                </span>
              </div>

              {/* Active Title Inside Right Console */}
              <div className="console-swap">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#697565]">
                  /{activeItem.num} — {activeItem.tag}
                </span>
                <h4 className="text-xl font-semibold text-[#ECDFCC] mt-1">
                  {activeItem.title}
                </h4>
              </div>

              {/* Live Animated SVG Schematic Window */}
              <div className="console-swap h-[200px] bg-[#0D0E0D] border border-[#3C3D37]/80 flex items-center justify-center p-4 relative overflow-hidden">
                <span className="absolute top-2.5 left-3 font-mono text-[9px] uppercase tracking-widest text-[#697565]">
                  BLUEPRINT // {activeItem.tag}
                </span>

                {/* SCHEMATIC 01: Next.js Speed Curve */}
                {activeIdx === 0 && (
                  <svg viewBox="0 0 360 170" className="w-full h-full">
                    <rect
                      x="24"
                      y="32"
                      width="312"
                      height="110"
                      fill="none"
                      stroke="#3C3D37"
                    />
                    <path
                      d="M 38 118 Q 105 45, 165 110 T 280 95 L 320 52"
                      fill="none"
                      stroke="#ECDFCC"
                      strokeWidth="2"
                      strokeDasharray="10 18"
                      className="cap-pulse-line"
                    />
                    <circle cx="320" cy="52" r="5" fill="#ECDFCC" />
                    <text
                      x="180"
                      y="92"
                      textAnchor="middle"
                      fill="#ECDFCC"
                      fontSize="22"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      100 / 100 SEO
                    </text>
                  </svg>
                )}

                {/* SCHEMATIC 02: n8n Automated Router */}
                {activeIdx === 1 && (
                  <svg viewBox="0 0 360 170" className="w-full h-full">
                    <line
                      x1="65"
                      y1="88"
                      x2="295"
                      y2="88"
                      stroke="#3C3D37"
                      strokeWidth="2"
                    />
                    <line
                      x1="65"
                      y1="88"
                      x2="295"
                      y2="88"
                      stroke="#ECDFCC"
                      strokeWidth="2.5"
                      strokeDasharray="10 20"
                      className="cap-pulse-line"
                    />
                    {[
                      { x: 65, label: "WEB FORM" },
                      { x: 180, label: "N8N ROUTER" },
                      { x: 295, label: "CRM + SLACK" },
                    ].map((node, i) => (
                      <g key={i} transform={`translate(${node.x}, 88)`}>
                        <rect
                          x="-42"
                          y="-22"
                          width="84"
                          height="44"
                          fill="#0D0E0D"
                          stroke="#ECDFCC"
                          strokeWidth="1.2"
                        />
                        <text
                          x="0"
                          y="4"
                          textAnchor="middle"
                          fill="#ECDFCC"
                          fontSize="8.5"
                          fontFamily="monospace"
                        >
                          {node.label}
                        </text>
                      </g>
                    ))}
                  </svg>
                )}

                {/* SCHEMATIC 03: AI Agent Hub */}
                {activeIdx === 2 && (
                  <svg viewBox="0 0 360 170" className="w-full h-full">
                    <circle
                      cx="180"
                      cy="88"
                      r="56"
                      fill="none"
                      stroke="#697565"
                      strokeDasharray="6 6"
                      className="cap-spin-slow"
                    />
                    <circle
                      cx="180"
                      cy="88"
                      r="32"
                      fill="#0D0E0D"
                      stroke="#ECDFCC"
                      strokeWidth="1.5"
                    />
                    <text
                      x="180"
                      y="92"
                      textAnchor="middle"
                      fill="#ECDFCC"
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      CLAUDE AI
                    </text>
                  </svg>
                )}

                {/* SCHEMATIC 04: Client Portal Modules */}
                {activeIdx === 3 && (
                  <svg viewBox="0 0 360 170" className="w-full h-full">
                    {[0, 1, 2].map((col) => (
                      <rect
                        key={col}
                        x={38 + col * 98}
                        y="42"
                        width="88"
                        height="92"
                        fill="#0D0E0D"
                        stroke="#ECDFCC"
                        strokeWidth="1.2"
                      />
                    ))}
                    <line
                      x1="38"
                      y1="66"
                      x2="322"
                      y2="66"
                      stroke="#ECDFCC"
                      strokeWidth="1.5"
                      strokeDasharray="10 20"
                      className="cap-pulse-line"
                    />
                  </svg>
                )}
              </div>

              {/* Console Metric & Quick Jump Indicator */}
              <div className="console-swap pt-4 flex items-end justify-between border-t border-[#3C3D37]">
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-[#697565]">
                    EXPECTED IMPACT //
                  </span>
                  <div className="flex items-baseline gap-2.5 mt-1">
                    <span className="text-4xl font-bold tracking-tight text-[#ECDFCC] tabular-nums">
                      {activeItem.metricVal}
                    </span>
                    <span className="font-mono text-xs text-[#697565]">
                      {activeItem.metricLabel}
                    </span>
                  </div>
                </div>

                {/* 01 - 04 Progress Indicator */}
                <div className="flex items-center gap-1.5 pb-1">
                  {CAPABILITIES.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 transition-all duration-300 ${
                        activeIdx === i
                          ? "w-7 bg-[#ECDFCC]"
                          : "w-2 bg-[#3C3D37]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===============================================================
            BOTTOM INFINITE TECH STACK MARQUEE
        =============================================================== */}
        <div className="mt-24 py-3.5 border border-[#3C3D37] bg-[#0D0E0D] overflow-hidden flex items-center">
          <div className="tech-marquee-track flex items-center gap-10 whitespace-nowrap w-max">
            {[...TECH_TICKER, ...TECH_TICKER].map((tech, i) => (
              <div key={i} className="flex items-center gap-10">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ECDFCC]/80">
                  {tech}
                </span>
                <span className="font-mono text-xs text-[#697565]">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}