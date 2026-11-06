// src/components/layout/Navbar.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ArrowUpRight, Check, Copy } from "lucide-react";

const NAV_CHAPTERS = [
  {
    index: "01",
    label: "Why Seglead",
    tag: "ARCHITECTURE & STRATEGY",
    desc: "How we replace slow templates and manual admin with one cohesive growth system.",
    href: "#friction",
  },
  {
    index: "02",
    label: "Live Systems",
    tag: "INTERACTIVE SANDBOX",
    desc: "Explore our n8n workflow pipelines, Next.js 16 speed telemetry, and AI lead triage.",
    href: "#sandbox",
  },
  {
    index: "03",
    label: "Capabilities",
    tag: "CORE ENGINEERING",
    desc: "Four specialized engineering pillars built for speed, organic SEO, and automation.",
    href: "#capabilities",
  },
  {
    index: "04",
    label: "Initiate Project",
    tag: "DIRECT DISPATCH",
    desc: "Select your system modules and send a brief directly to our UK engineering team.",
    href: "#contact",
  },
];

export default function Navbar() {
  const rootRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [activeChapterNum, setActiveChapterNum] = useState<string>("01");

  // Lock body scroll & handle Escape key when Curtain Menu is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // 1. Live Page Scroll Progress Bar + Active Chapter Counter in Menu Button
  useGSAP(
    () => {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (progressBarRef.current) {
            gsap.set(progressBarRef.current, { scaleX: self.progress });
          }
        },
      });

      NAV_CHAPTERS.forEach((chap) => {
        ScrollTrigger.create({
          trigger: chap.href,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setActiveChapterNum(chap.index),
          onEnterBack: () => setActiveChapterNum(chap.index),
        });
      });
    },
    { scope: rootRef }
  );

  // 2. Full-Screen Architectural Curtain Animation
  useGSAP(
    () => {
      const curtain = curtainRef.current;
      if (!curtain) return;

      if (isOpen) {
        gsap.set(curtain, { display: "flex" });

        const tl = gsap.timeline();
        tl.fromTo(
          curtain,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.65,
            ease: "expo.inOut",
          }
        )
          .fromTo(
            ".curtain-row",
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.07,
              duration: 0.55,
              ease: "power3.out",
            },
            "-=0.25"
          )
          .fromTo(
            ".curtain-meta",
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.06,
              duration: 0.45,
              ease: "power2.out",
            },
            "-=0.4"
          );
      } else {
        gsap.to(curtain, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.5,
          ease: "expo.inOut",
          onComplete: () => {
            gsap.set(curtain, { display: "none" });
          },
        });
      }
    },
    { dependencies: [isOpen], scope: rootRef }
  );

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@seglead.co.uk");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div ref={rootRef}>
      {/* ===============================================================
          MINIMAL TOP ARCHITECTURAL FRAME (Always Visible Above Curtain)
      =============================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-[#0D0E0D]/90 backdrop-blur-xl border-b border-[#262825] px-4 sm:px-8 md:px-12 flex items-center justify-between">
        {/* LEFT: Wordmark + Live Studio Status */}
        <div className="flex items-center gap-5">
          <a
            href="#"
            onClick={() => setIsOpen(false)}
            className="text-lg sm:text-xl font-bold tracking-tighter text-[#ECDFCC] flex items-center gap-1 group"
          >
            <span>SEGLEAD</span>
            <span className="text-[#ECDFCC]/40 group-hover:translate-x-0.5 transition-transform">
              .
            </span>
          </a>

          <div className="hidden md:flex items-center gap-2 pl-5 border-l border-[#262825] font-mono text-[10px] uppercase tracking-[0.2em] text-[#ECDFCC]/55">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ECDFCC] animate-pulse" />
            <span>UK STUDIO // ONLINE</span>
          </div>
        </div>

        {/* RIGHT: Direct Action Button + Curtain Menu Trigger */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-[#ECDFCC] text-[#0D0E0D] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#ECDFCC]/90 transition-colors group"
          >
            <span>Start Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-label="Toggle Navigation Curtain"
            className={`px-4 py-2.5 border font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-3 cursor-pointer ${
              isOpen
                ? "bg-[#ECDFCC] text-[#0D0E0D] border-[#ECDFCC] font-bold"
                : "bg-[#121312] text-[#ECDFCC] border-[#262825] hover:border-[#ECDFCC]/60"
            }`}
          >
            <span>{isOpen ? "CLOSE" : "MENU"}</span>
            <span
              className={`text-[10px] ${
                isOpen ? "text-[#0D0E0D]/70" : "text-[#ECDFCC]/45"
              }`}
            >
              // {isOpen ? "✕" : activeChapterNum}
            </span>
          </button>
        </div>

        {/* 1PX SCROLL PROGRESS HAIRLINE */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-transparent overflow-hidden pointer-events-none">
          <div
            ref={progressBarRef}
            className="h-full bg-[#ECDFCC] origin-left scale-x-0"
          />
        </div>
      </header>

      {/* ===============================================================
          FULL-SCREEN ARCHITECTURAL CURTAIN MENU (#0D0E0D CARBON)
      =============================================================== */}
      <div
        ref={curtainRef}
        style={{ display: "none" }}
        className="fixed inset-0 z-40 bg-[#0D0E0D] text-[#ECDFCC] pt-[72px] flex-col justify-between overflow-y-auto"
      >
        <div className="max-w-7xl w-full mx-auto px-6 md:px-12 my-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT COLUMN (4 Cols on Desktop): Live Chapter Preview & Direct Studio Dispatch */}
          <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col justify-between space-y-8 border-t lg:border-t-0 lg:border-r border-[#262825] pt-8 lg:pt-2 lg:pr-10">
            {/* Dynamic Hover Telemetry Box */}
            <div className="curtain-meta hidden lg:block p-6 border border-[#262825] bg-[#121312] space-y-3">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#ECDFCC]/45">
                <span>PREVIEW // .{NAV_CHAPTERS[hoveredIdx]?.index}</span>
                <span>{NAV_CHAPTERS[hoveredIdx]?.tag}</span>
              </div>
              <p className="text-sm text-[#ECDFCC]/80 leading-relaxed">
                {NAV_CHAPTERS[hoveredIdx]?.desc}
              </p>
            </div>

            {/* Direct Click-to-Copy Email */}
            <div className="curtain-meta space-y-3">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-[#ECDFCC]/45">
                DIRECT DISPATCH // CLICK TO COPY
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full p-4 border border-[#262825] bg-[#121312] hover:border-[#ECDFCC]/60 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span className="font-mono text-sm text-[#ECDFCC]">
                  info@seglead.com
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 bg-[#0D0E0D] border border-[#262825] text-[#ECDFCC]">
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>COPY</span>
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Studio Specs */}
            <div className="curtain-meta grid grid-cols-2 gap-4 pt-2 font-mono text-xs">
              <div>
                <span className="block text-[10px] text-[#ECDFCC]/40 uppercase tracking-widest">
                  ARCHITECTURE
                </span>
                <span className="text-[#ECDFCC]/85 mt-1 block">
                  NEXT.JS 16 &amp; AI
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-[#ECDFCC]/40 uppercase tracking-widest">
                  RESPONSE SLA
                </span>
                <span className="text-[#ECDFCC]/85 mt-1 block">
                  &lt; 24 HOURS
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (8 Cols on Desktop): Giant Editorial Chapter Links */}
          <nav
            aria-label="Primary Curtain Navigation"
            className="lg:col-span-8 order-1 lg:order-2 divide-y divide-[#262825] border-y border-[#262825]"
          >
            {NAV_CHAPTERS.map((item, idx) => (
              <a
                key={item.index}
                href={item.href}
                onMouseEnter={() => setHoveredIdx(idx)}
                onClick={() => setIsOpen(false)}
                className="curtain-row group py-6 sm:py-8 px-2 sm:px-4 flex items-center justify-between gap-4 hover:bg-[#121312] transition-colors"
              >
                <div className="flex items-baseline gap-4 sm:gap-8">
                  <span className="font-mono text-xs sm:text-sm text-[#ECDFCC]/40 group-hover:text-[#ECDFCC] transition-colors">
                    /{item.index}
                  </span>
                  <span className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#ECDFCC]/80 group-hover:text-[#ECDFCC] group-hover:translate-x-3 transition-all duration-300">
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-widest text-[#ECDFCC]/40 group-hover:text-[#ECDFCC]/80 transition-colors">
                    {item.tag}
                  </span>
                  <div className="w-10 h-10 border border-[#262825] group-hover:border-[#ECDFCC] group-hover:bg-[#ECDFCC] group-hover:text-[#0D0E0D] flex items-center justify-center transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </a>
            ))}
          </nav>
        </div>

        {/* BOTTOM CURTAIN STATUS STRIP */}
        <div className="w-full border-t border-[#262825] px-6 md:px-12 py-4 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[#ECDFCC]/45">
          <span>SEGLEAD STUDIO // UNITED KINGDOM</span>
          <span>PRESS [ESC] TO CLOSE MENU</span>
        </div>
      </div>
    </div>
  );
}
