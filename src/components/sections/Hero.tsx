// src/components/sections/Hero.tsx
"use client";

import React, { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import {
  ArrowUpRight,
  Sparkles,
  Cpu,
  Workflow,
  Zap,
  Layers,
  ShieldCheck,
  RotateCcw,
  GripHorizontal,
} from "lucide-react";

const FLOATING_PILLS = [
  {
    id: "pill-1",
    label: "Next.js 16 Speed",
    sub: "0.3s Load Architecture",
    icon: Zap,
    posClass: "top-[10%] left-[3%]",
    rotate: -6,
  },
  {
    id: "pill-2",
    label: "n8n & Zapier AI",
    sub: "Automated Workflows",
    icon: Workflow,
    posClass: "top-[12%] right-[3%]",
    rotate: 6,
  },
  {
    id: "pill-3",
    label: "Claude & OpenAI",
    sub: "Custom AI Agents",
    icon: Cpu,
    posClass: "bottom-[18%] left-[4%]",
    rotate: 4,
  },
  {
    id: "pill-4",
    label: "£500 – £3,000",
    sub: "Transparent UK Pricing",
    icon: ShieldCheck,
    posClass: "bottom-[18%] right-[4%]",
    rotate: -4,
  },
  {
    id: "pill-5",
    label: "GSAP & UI/UX",
    sub: "Playful Brand Motion",
    icon: Layers,
    posClass: "top-[44%] left-[1%]",
    rotate: -9,
  },
  {
    id: "pill-6",
    label: "7-Day Launch",
    sub: "Rapid Startup Sprints",
    icon: Sparkles,
    posClass: "top-[44%] right-[1%]",
    rotate: 9,
  },
];

const MOBILE_PILLARS = [
  {
    num: ".01",
    title: "Next.js 16 Web Architecture",
    desc: "Sub-second, high-converting websites built to make startups look established.",
  },
  {
    num: ".02",
    title: "Practical AI Automation",
    desc: "Connect your site to Claude, n8n & Zapier to eliminate manual admin.",
  },
  {
    num: ".03",
    title: "Fixed UK Sprints (£500 – £3k)",
    desc: "Clear deliverables launched in days, without bloated monthly retainers.",
  },
];

const TECH_STACK = [
  "NEXT.JS 16",
  "CLAUDE AI",
  "N8N WORKFLOWS",
  "PYTHON",
  "REACT",
  "ZAPIER",
  "OPENAI",
  "CURSOR",
  "DOCKER",
  "STRIPE UK",
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const primaryCtaRef = useRef<HTMLAnchorElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);

  const resetPills = () => {
    pillRefs.current.forEach((pill, i) => {
      if (!pill) return;
      gsap.to(pill, {
        x: 0,
        y: 0,
        rotation: FLOATING_PILLS[i].rotate,
        scale: 1,
        duration: 0.85,
        ease: "elastic.out(1, 0.5)",
      });
    });
  };

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    index: number
  ) => {
    const el = pillRefs.current[index];
    if (!el) return;

    e.currentTarget.setPointerCapture(e.pointerId);
    const startX = e.clientX - (Number(gsap.getProperty(el, "x")) || 0);
    const startY = e.clientY - (Number(gsap.getProperty(el, "y")) || 0);

    gsap.to(el, {
      scale: 1.08,
      rotation: 0,
      zIndex: 50,
      duration: 0.2,
      ease: "power2.out",
    });

    const onPointerMove = (moveEvent: PointerEvent) => {
      gsap.set(el, {
        x: moveEvent.clientX - startX,
        y: moveEvent.clientY - startY,
      });
    };

    const onPointerUp = () => {
      gsap.to(el, {
        scale: 1,
        rotation: FLOATING_PILLS[index].rotate,
        zIndex: 20,
        duration: 0.4,
        ease: "back.out(1.7)",
      });
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  useGSAP(
    () => {
      pillRefs.current.forEach((pill, i) => {
        if (!pill) return;
        gsap.set(pill, {
          x: 0,
          y: 0,
          rotation: FLOATING_PILLS[i].rotate,
          opacity: 1,
          scale: 1,
        });

        gsap.from(pill, {
          y: 25,
          scale: 0.85,
          duration: 0.7,
          delay: 0.1 + i * 0.06,
          ease: "back.out(1.6)",
        });
      });

      gsap.utils.toArray<HTMLElement>(".pill-bob").forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -8 : 8,
          duration: 2.2 + i * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      const track = marqueeTrackRef.current;
      if (track) {
        const marqueeTween = gsap.to(track, {
          xPercent: -50,
          repeat: -1,
          duration: 24,
          ease: "none",
        });

        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            const velocity = Math.abs(self.getVelocity());
            const timeScale = 1 + Math.min(velocity / 350, 4.5);
            const skew = gsap.utils.clamp(-8, 8, self.getVelocity() / 300);

            gsap.to(marqueeTween, {
              timeScale,
              duration: 0.2,
              overwrite: true,
              onComplete: () => {
                gsap.to(marqueeTween, { timeScale: 1, duration: 0.8 });
              },
            });

            gsap.to(track, {
              skewX: -skew,
              duration: 0.25,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
        });
      }

      const btn = primaryCtaRef.current;
      if (!btn) return;

      const xTo = gsap.quickTo(btn, "x", {
        duration: 0.45,
        ease: "elastic.out(1, 0.4)",
      });
      const yTo = gsap.quickTo(btn, "y", {
        duration: 0.45,
        ease: "elastic.out(1, 0.4)",
      });

      const onMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        xTo(relX * 0.25);
        yTo(relY * 0.25);
      };

      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);

      return () => {
        btn.removeEventListener("mousemove", onMove);
        btn.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen pt-24 pb-4 flex flex-col justify-between overflow-hidden select-none bg-transparent"
    >
      {/* Subtle Warm Bone / Neutral Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[340px] rounded-full bg-[#ECDFCC]/[0.04] blur-[130px]"
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full min-h-[76vh] flex flex-col items-center justify-center py-6">
        {/* TOP MANTRA BAR */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-5 z-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#ECDFCC]/55">
            / SIMPLE. / PRACTICAL. / EFFECTIVE.
          </span>

          <button
            type="button"
            onClick={resetPills}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141513] border border-[#2A2B27] font-mono text-[10px] uppercase tracking-widest text-[#ECDFCC]/80 hover:text-[#ECDFCC] hover:border-[#ECDFCC]/40 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3 text-[#ECDFCC]/60" />
            <span>Reset Badges</span>
          </button>
        </div>

        {/* CENTER HEADLINE */}
        <div className="text-center max-w-3xl mx-auto z-10 space-y-5">
          <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-semibold tracking-tight leading-[1.03] text-[#ECDFCC]">
            We build websites &amp;{" "}
            <span className="italic font-normal text-[#697565]">
              intelligent
            </span>{" "}
            systems that scale.
          </h1>

          <p className="text-sm sm:text-base text-[#ECDFCC]/75 max-w-xl mx-auto leading-relaxed">
            Playful design meets serious engineering. We help UK startups launch
            high-converting Next.js websites and automate repetitive work with
            AI—fixed from{" "}
            <span className="text-[#ECDFCC] font-semibold">£500 to £3,000</span>
            .
          </p>

          {/* CTA BUTTONS */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
            <a
              ref={primaryCtaRef}
              href="#investment"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-[#ECDFCC] text-[#0D0E0D] font-semibold text-xs sm:text-sm tracking-tight shadow-[0_14px_40px_rgba(236,223,204,0.18)] hover:bg-[#ECDFCC]/90 transition-colors"
            >
              <span>Book a Free Strategy Call</span>
              <span className="px-2 py-0.5 rounded-full bg-[#0D0E0D]/10 font-mono text-[11px]">
                £500 – £3k
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="#sandbox"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#141513]/80 backdrop-blur-xl border border-[#2A2B27] text-[#ECDFCC] text-xs sm:text-sm font-medium hover:border-[#ECDFCC]/40 transition-colors"
            >
              <span>Explore Capabilities</span>
            </a>
          </div>
        </div>

        {/* MOBILE-ONLY CARD */}
        <div className="lg:hidden w-full max-w-md mx-auto mt-8 p-5 bg-[#141513] border border-[#2A2B27]">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#2A2B27]">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#ECDFCC]/60">
              SEGLEAD // CORE ARCHITECTURE
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#ECDFCC]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ECDFCC] animate-pulse" />
              7-Day Sprint
            </span>
          </div>

          <div className="space-y-2.5">
            {MOBILE_PILLARS.map((item) => (
              <div
                key={item.num}
                className="p-3.5 bg-[#0D0E0D] border border-[#2A2B27] flex items-start gap-3"
              >
                <span className="font-mono text-xs text-[#ECDFCC]/50 pt-0.5">
                  {item.num}
                </span>
                <div>
                  <h3 className="text-xs font-semibold text-[#ECDFCC]">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#ECDFCC]/65 mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP DRAGGABLE PILLS */}
        {FLOATING_PILLS.map((pill, i) => {
          const Icon = pill.icon;
          return (
            <div
              key={pill.id}
              ref={(el) => {
                pillRefs.current[i] = el;
              }}
              onPointerDown={(e) => handlePointerDown(e, i)}
              className={`hidden lg:block absolute ${pill.posClass} z-20 cursor-grab active:cursor-grabbing touch-none`}
            >
              <div className="pill-bob group flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#141513]/85 backdrop-blur-2xl border border-[#2A2B27] shadow-[0_16px_40px_rgba(0,0,0,0.65)] hover:border-[#ECDFCC]/50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#0D0E0D] border border-[#2A2B27] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#ECDFCC]" />
                </div>
                <div className="text-left pr-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-[#ECDFCC] whitespace-nowrap">
                      {pill.label}
                    </span>
                    <GripHorizontal className="w-3 h-3 text-[#ECDFCC]/45" />
                  </div>
                  <p className="font-mono text-[10px] text-[#ECDFCC]/60 whitespace-nowrap">
                    {pill.sub}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* BOTTOM MARQUEE */}
      <div className="w-full border-y border-[#2A2B27] bg-[#0D0E0D]/80 backdrop-blur-md py-3 overflow-hidden">
        <div
          ref={marqueeTrackRef}
          className="flex items-center gap-10 whitespace-nowrap w-max"
        >
          {[...TECH_STACK, ...TECH_STACK].map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center gap-10 font-mono text-[11px] uppercase tracking-[0.2em] text-[#ECDFCC]/55"
            >
              <span className="hover:text-[#ECDFCC] transition-colors cursor-default">
                {tech}
              </span>
              <span className="text-[#2A2B27]">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}