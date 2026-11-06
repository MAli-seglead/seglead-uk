// src/components/sections/Friction.tsx
"use client";

import React, { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";

const MANIFESTO_TEXT =
  "A website shouldn't just exist to look pretty. If your digital presence loads slowly, leaks high-intent leads, and forces your team into repetitive manual admin behind the scenes—it isn't an asset. We engineer Next.js speed and practical AI automation into one cohesive growth system.";

const CHAPTERS = [
  {
    num: "01",
    focus: "TECHNICAL ARCHITECTURE",
    title: "Fast, resilient, and built to rank on Google from day one.",
    body: "We engineer modern web platforms that aren't just visually refined—they are built on Next.js 16 for instantaneous opening speeds, clean semantic SEO structure, and effortless scalability as your UK startup grows.",
    points: [
      "Sub-second page load performance",
      "Clean semantic SEO & Schema architecture",
      "Modern, infinitely scalable codebase",
    ],
  },
  {
    num: "02",
    focus: "AI & WORKFLOW AUTOMATION",
    title: "Eliminate repetitive work across your operations.",
    body: "Stop wasting hours copying form inquiries into spreadsheets or manually chasing follow-ups. We connect your website directly to Claude, n8n, and Zapier so leads are qualified, routed, and answered automatically.",
    points: [
      "Automated inbound lead qualification",
      "Instant CRM, Notion & Slack sync",
      "Custom AI assistants tailored to your workflow",
    ],
  },
  {
    num: "03",
    focus: "CONVERSION & POSITIONING",
    title: "A digital presence that commands immediate trust.",
    body: "Every scroll interaction is structured to clarify your value, bridge the gap between startup and market leader, and guide the right visitors smoothly toward booking a call with your team.",
    points: [
      "Clear visual and informational hierarchy",
      "Trust-building interactive proof",
      "High-conviction conversion flow",
    ],
  },
];

export default function Friction() {
  const sectionRef = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLParagraphElement>(null);
  const morphZoneRef = useRef<HTMLDivElement>(null);

  // Desktop Pin Refs
  const desktopGridRef = useRef<HTMLDivElement>(null);
  const desktopLeftColRef = useRef<HTMLDivElement>(null);
  const desktopChapterRefs = useRef<(HTMLElement | null)[]>([]);

  // Mobile Pin Refs
  const mobilePinRef = useRef<HTMLDivElement>(null);
  const mobileSlideRefs = useRef<(HTMLElement | null)[]>([]);
  const mobileProgressRef = useRef<HTMLDivElement>(null);

  const [activeChapter, setActiveChapter] = useState<number>(0);

  useGSAP(
    () => {
      // 1. Word-by-Word Scroll-Lit Manifesto
      const words = gsap.utils.toArray<HTMLElement>(".manifesto-word");
      if (words.length > 0 && manifestoRef.current) {
        gsap.fromTo(
          words,
          { opacity: 0.18, color: "#697565" },
          {
            opacity: 1,
            color: "#ECDFCC",
            stagger: 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: manifestoRef.current,
              start: "top 82%",
              end: "bottom 50%",
              scrub: 0.5,
            },
          }
        );
      }

      // 2. Responsive Desktop vs. Mobile Pinning & Color Morph (STRICT #0D0E0D)
      const themeWrapper = document.getElementById("theme-wrapper");
      const bgTargets = [themeWrapper, document.body].filter(Boolean);

      const mm = gsap.matchMedia();

      // =========================================================
      // DESKTOP (>= 1024px)
      // =========================================================
      mm.add("(min-width: 1024px)", () => {
        const enterTl = gsap.timeline({
          scrollTrigger: {
            trigger: morphZoneRef.current,
            start: "top 75%",
            end: "top 25%",
            scrub: 0.3,
          },
        });

        enterTl
          .to(bgTargets, { backgroundColor: "#ECDFCC", ease: "none" }, 0)
          .to(".morph-ink-primary", { color: "#0D0E0D", ease: "none" }, 0)
          .to(".morph-ink-secondary", { color: "#3C3D37", ease: "none" }, 0)
          .to(
            ".morph-border",
            { borderColor: "rgba(13, 14, 13, 0.18)", ease: "none" },
            0
          )
          .to(
            ".morph-pill",
            {
              backgroundColor: "rgba(13, 14, 13, 0.08)",
              borderColor: "rgba(13, 14, 13, 0.2)",
              color: "#0D0E0D",
              ease: "none",
            },
            0
          );

        const exitTl = gsap.timeline({
          scrollTrigger: {
            trigger: morphZoneRef.current,
            start: "bottom 92%",
            end: "bottom 55%",
            scrub: 0.3,
          },
        });

        exitTl
          .to(
            bgTargets,
            { backgroundColor: "#0D0E0D", immediateRender: false, ease: "none" },
            0
          )
          .to(
            ".morph-ink-primary",
            { color: "#ECDFCC", immediateRender: false, ease: "none" },
            0
          )
          .to(
            ".morph-ink-secondary",
            {
              color: "rgba(236, 223, 204, 0.7)",
              immediateRender: false,
              ease: "none",
            },
            0
          )
          .to(
            ".morph-border",
            {
              borderColor: "rgba(60, 61, 55, 0.6)",
              immediateRender: false,
              ease: "none",
            },
            0
          )
          .to(
            ".morph-pill",
            {
              backgroundColor: "rgba(60, 61, 55, 0.4)",
              borderColor: "rgba(236, 223, 204, 0.15)",
              color: "#ECDFCC",
              immediateRender: false,
              ease: "none",
            },
            0
          );

        const lastChapter = desktopChapterRefs.current[CHAPTERS.length - 1];
        if (desktopGridRef.current && desktopLeftColRef.current && lastChapter) {
          ScrollTrigger.create({
            trigger: desktopGridRef.current,
            start: "top 128px",
            endTrigger: lastChapter,
            end: "top 128px",
            pin: desktopLeftColRef.current,
            pinSpacing: false,
          });
        }

        desktopChapterRefs.current.forEach((chapter, idx) => {
          if (!chapter) return;
          ScrollTrigger.create({
            trigger: chapter,
            start: "top 60%",
            end: "bottom 45%",
            onEnter: () => setActiveChapter(idx),
            onEnterBack: () => setActiveChapter(idx),
          });
        });
      });

      // =========================================================
      // MOBILE (< 1024px)
      // =========================================================
      mm.add("(max-width: 1023px)", () => {
        const slides = mobileSlideRefs.current.filter(Boolean) as HTMLElement[];
        if (slides.length < 3 || !mobilePinRef.current) return;

        gsap.set(slides[0], { autoAlpha: 1, y: 0 });
        gsap.set([slides[1], slides[2]], { autoAlpha: 0, y: 40 });

        gsap.timeline({
          scrollTrigger: {
            trigger: mobilePinRef.current,
            start: "top 75%",
            end: "top 15%",
            scrub: 0.25,
          },
        })
          .to(bgTargets, { backgroundColor: "#ECDFCC", ease: "none" }, 0)
          .to(".morph-ink-primary", { color: "#0D0E0D", ease: "none" }, 0)
          .to(".morph-ink-secondary", { color: "#3C3D37", ease: "none" }, 0)
          .to(
            ".morph-border",
            { borderColor: "rgba(13, 14, 13, 0.18)", ease: "none" },
            0
          )
          .to(
            ".morph-pill",
            {
              backgroundColor: "rgba(13, 14, 13, 0.08)",
              borderColor: "rgba(13, 14, 13, 0.2)",
              color: "#0D0E0D",
              ease: "none",
            },
            0
          );

        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: mobilePinRef.current,
            start: "top top",
            end: "+=220%",
            pin: true,
            pinSpacing: true,
            scrub: 0.35,
            onUpdate: (self) => {
              if (mobileProgressRef.current) {
                gsap.set(mobileProgressRef.current, { scaleX: self.progress });
              }
              if (self.progress < 0.33) setActiveChapter(0);
              else if (self.progress < 0.66) setActiveChapter(1);
              else setActiveChapter(2);
            },
          },
        });

        mobileTl
          .to({}, { duration: 0.25 })
          .to(slides[0], {
            autoAlpha: 0,
            y: -35,
            duration: 0.2,
            ease: "power2.in",
          })
          .to(slides[1], {
            autoAlpha: 1,
            y: 0,
            duration: 0.22,
            ease: "power2.out",
          })
          .to({}, { duration: 0.28 })
          .to(slides[1], {
            autoAlpha: 0,
            y: -35,
            duration: 0.2,
            ease: "power2.in",
          })
          .to(slides[2], {
            autoAlpha: 1,
            y: 0,
            duration: 0.22,
            ease: "power2.out",
          })
          .to({}, { duration: 0.25 })
          .to(
            bgTargets,
            { backgroundColor: "#0D0E0D", duration: 0.2, ease: "none" },
            "-=0.1"
          )
          .to(
            ".morph-ink-primary",
            { color: "#ECDFCC", duration: 0.2, ease: "none" },
            "<"
          )
          .to(
            ".morph-ink-secondary",
            { color: "rgba(236, 223, 204, 0.7)", duration: 0.2, ease: "none" },
            "<"
          );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const wordsArray = MANIFESTO_TEXT.split(" ");

  return (
    <section
      ref={sectionRef}
      id="friction"
      aria-labelledby="friction-heading"
      className="relative pt-24 md:pt-36 bg-transparent"
    >
      {/* PART 1: MANIFESTO BRIDGE */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-32">
        <div className="morph-border flex items-center justify-between gap-4 pb-6 border-b border-[#3C3D37]/60">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#697565]">.01</span>
            <span className="morph-ink-primary font-mono text-xs uppercase tracking-[0.2em] text-[#ECDFCC]/80">
              WHY SEGLEAD
            </span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#697565]">
            / AESTHETIC • PERFORMANCE • STRATEGY
          </span>
        </div>

        <div className="pt-12 md:pt-20 max-w-5xl">
          <p
            ref={manifestoRef}
            className="text-2xl sm:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.22] flex flex-wrap gap-x-[0.28em] gap-y-1"
          >
            {wordsArray.map((word, idx) => (
              <span key={idx} className="manifesto-word inline-block">
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* PART 2: MORPH ZONE */}
      <div ref={morphZoneRef} className="w-full bg-transparent">
        {/* MOBILE VIEW (< 1024px) */}
        <div
          ref={mobilePinRef}
          className="lg:hidden relative h-[100dvh] w-full flex flex-col justify-between px-6 pt-28 pb-8 overflow-hidden"
        >
          <div className="space-y-2.5 shrink-0">
            <div className="flex items-center justify-between gap-2">
              <div className="morph-pill inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3C3D37]/40 border border-[#ECDFCC]/15 text-[#ECDFCC]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#697565]" />
                <span className="font-mono text-[10px] uppercase tracking-widest font-bold">
                  {CHAPTERS[activeChapter]?.num} //{" "}
                  {CHAPTERS[activeChapter]?.focus}
                </span>
              </div>

              <span className="morph-ink-secondary font-mono text-xs text-[#ECDFCC]/70 tabular-nums">
                {CHAPTERS[activeChapter]?.num} / 03
              </span>
            </div>

            <h2 className="morph-ink-primary text-2xl font-semibold tracking-tight leading-tight text-[#ECDFCC]">
              Built for better business operations.
            </h2>

            <div className="w-full h-[2px] bg-[#697565]/25 overflow-hidden rounded-full">
              <div
                ref={mobileProgressRef}
                className="h-full bg-[#697565] origin-left scale-x-0"
              />
            </div>
          </div>

          <div className="relative flex-1 flex items-center my-2">
            <div className="relative w-full grid grid-cols-1 items-center">
              {CHAPTERS.map((chap, idx) => (
                <article
                  key={chap.num}
                  ref={(el) => {
                    mobileSlideRefs.current[idx] = el;
                  }}
                  className="col-start-1 row-start-1 w-full invisible"
                >
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#697565]">
                      .{chap.num} // {chap.focus}
                    </span>
                    <span className="morph-ink-secondary font-mono text-[10px] uppercase tracking-widest text-[#ECDFCC]/50">
                      SEGLEAD STANDARD
                    </span>
                  </div>

                  <h3 className="morph-ink-primary text-2xl font-semibold tracking-tight leading-[1.14] text-[#ECDFCC]">
                    {chap.title}
                  </h3>

                  <p className="morph-ink-secondary mt-3 text-sm text-[#ECDFCC]/75 leading-relaxed">
                    {chap.body}
                  </p>

                  <ul className="morph-border mt-4 pt-3.5 border-t border-[#3C3D37]/40 space-y-2">
                    {chap.points.map((pt, i) => (
                      <li
                        key={i}
                        className="morph-ink-primary flex items-center gap-2.5 font-mono text-xs text-[#ECDFCC]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#697565] shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div className="morph-border pt-3.5 border-t border-[#3C3D37]/40 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1.5">
              {CHAPTERS.map((_, dotIdx) => (
                <span
                  key={dotIdx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeChapter === dotIdx
                      ? "w-6 bg-[#697565]"
                      : "w-1.5 bg-[#697565]/35"
                  }`}
                />
              ))}
            </div>

            <a
              href="#investment"
              className="morph-ink-primary inline-flex items-center gap-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#ECDFCC]"
            >
              <span>Start Sprint</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* DESKTOP VIEW (>= 1024px) */}
        <div className="hidden lg:block max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-44">
          <div
            ref={desktopGridRef}
            className="grid grid-cols-12 gap-16 items-start"
          >
            <div ref={desktopLeftColRef} className="col-span-5 space-y-6">
              <div className="morph-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3C3D37]/40 border border-[#ECDFCC]/15 text-[#ECDFCC]">
                <span className="w-2 h-2 rounded-full bg-[#697565] animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-widest opacity-75">
                  CURRENT FOCUS //
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest font-bold">
                  {CHAPTERS[activeChapter]?.focus}
                </span>
              </div>

              <h2
                id="friction-heading"
                className="morph-ink-primary text-5xl font-semibold tracking-tight leading-[1.06] text-[#ECDFCC]"
              >
                Built for better business operations.
              </h2>

              <p className="morph-ink-secondary text-base text-[#ECDFCC]/70 leading-relaxed max-w-md">
                A high-performing business website should explain your brand
                clearly, rank organically on search engines, and automate the
                busywork behind the scenes.
              </p>

              <div className="morph-border flex items-baseline gap-4 pt-6 border-t border-[#3C3D37]/60">
                <span className="morph-ink-primary text-7xl xl:text-8xl font-bold tracking-tighter text-[#ECDFCC] tabular-nums transition-all duration-300">
                  {CHAPTERS[activeChapter]?.num}
                </span>
                <span className="font-mono text-sm uppercase tracking-widest text-[#697565]">
                  / 03 — {CHAPTERS[activeChapter]?.focus}
                </span>
              </div>
            </div>

            <div className="col-span-7 space-y-40">
              {CHAPTERS.map((chap, idx) => {
                const isActive = activeChapter === idx;

                return (
                  <article
                    key={chap.num}
                    ref={(el) => {
                      desktopChapterRefs.current[idx] = el;
                    }}
                    className={`morph-border transition-opacity duration-500 border-t border-[#3C3D37]/60 pt-12 ${
                      isActive ? "opacity-100" : "opacity-35"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#697565]">
                        .{chap.num} // {chap.focus}
                      </span>
                      <span className="morph-ink-secondary font-mono text-xs text-[#ECDFCC]/50">
                        SEGLEAD STANDARD
                      </span>
                    </div>

                    <h3 className="morph-ink-primary text-4xl font-semibold tracking-tight leading-[1.12] text-[#ECDFCC]">
                      {chap.title}
                    </h3>

                    <p className="morph-ink-secondary mt-5 text-lg text-[#ECDFCC]/70 leading-relaxed">
                      {chap.body}
                    </p>

                    <div className="morph-border mt-8 pt-6 border-t border-[#3C3D37]/60 flex items-center justify-between gap-4">
                      <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        {chap.points.map((pt, i) => (
                          <li
                            key={i}
                            className="morph-ink-primary inline-flex items-center gap-2 font-mono text-xs text-[#ECDFCC]"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#697565]" />
                            {pt}
                          </li>
                        ))}
                      </ul>

                      <a
                        href="#investment"
                        className="morph-ink-primary inline-flex items-center gap-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#ECDFCC] hover:text-[#697565] transition-colors shrink-0"
                      >
                        <span>Start Sprint</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}