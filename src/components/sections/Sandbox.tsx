// src/components/sections/Sandbox.tsx
"use client";

import React, { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ArrowUpRight, Check } from "lucide-react";

interface StepConfig {
  id: string;
  index: string;
  tab: string;
  title: string;
  mobileTitle: string;
  badge: string;
  desc: string;
  stat1Val: string;
  stat1Label: string;
  stat2Val: string;
  stat2Label: string;
  canvasLabel: string;
  points: string[];
}

const STEPS: StepConfig[] = [
  {
    id: "plan-design",
    index: "01",
    tab: "01. PLAN & DESIGN",
    title: "We Plan &\nDesign It",
    mobileTitle: "We Plan & Design It",
    badge: "STEP 1 • STRATEGY & DESIGN",
    desc: "We map out a clear plan for your business and design a modern website that explains what you do in seconds.",
    stat1Val: "100%",
    stat1Label: "Custom Brand Design",
    stat2Val: "2x",
    stat2Label: "Clearer Buyer Journey",
    canvasLabel: "STEP 01 // MAPPING YOUR WEBSITE LAYOUT",
    points: [
      "Clear messaging that wins trust immediately",
      "Custom visual identity (never a generic template)",
      "Designed to guide visitors straight to booking",
    ],
  },
  {
    id: "build-launch",
    index: "02",
    tab: "02. BUILD & LAUNCH",
    title: "We Build &\nLaunch It",
    mobileTitle: "We Build & Launch It",
    badge: "STEP 2 • CODING & GOOGLE SETUP",
    desc: "We turn the design into a fast, rock-solid website and put it live for you—ready for Google from day one.",
    stat1Val: "7 Days",
    stat1Label: "Average Time To Launch",
    stat2Val: "0.3s",
    stat2Label: "Instant Page Load",
    canvasLabel: "STEP 02 // LAUNCHING FOR SPEED & GOOGLE",
    points: [
      "Opens in 0.3s on every phone and laptop",
      "Full Google SEO setup so UK clients find you",
      "Hosted, secured, and launched in 7 days",
    ],
  },
  {
    id: "add-ai",
    index: "03",
    tab: "03. ADD AI AUTOMATION",
    title: "We Add AI To\nSave You Time",
    mobileTitle: "We Add AI To Save You Time",
    badge: "STEP 3 • SMART AI & AUTOMATION",
    desc: "We plug in practical AI to answer visitor questions 24/7, book calls into your calendar, and send leads straight to your phone.",
    stat1Val: "20+ hrs",
    stat1Label: "Weekly Admin Saved",
    stat2Val: "24/7",
    stat2Label: "Automated Lead Handling",
    canvasLabel: "STEP 03 // AI HANDLING LEADS & BOOKINGS",
    points: [
      "24/7 AI assistant answers buyer questions",
      "Automatic calendar bookings without email tag",
      "Instant lead alerts sent to WhatsApp, Slack & CRM",
    ],
  },
];

const AI_TASKS = [
  { label: "INSTANT LEAD REPLIES", x: 360, y: 65 },
  { label: "CALENDAR BOOKINGS", x: 535, y: 140 },
  { label: "WHATSAPP & SLACK ALERTS", x: 535, y: 280 },
  { label: "24/7 CUSTOMER Q&A", x: 360, y: 355 },
  { label: "AUTO FOLLOW-UP EMAILS", x: 185, y: 280 },
  { label: "SPREADSHEET & CRM SYNC", x: 185, y: 140 },
];

export default function Sandbox() {
  const sectionRef = useRef<HTMLElement>(null);
  const mobileTimelineRef = useRef<HTMLDivElement>(null);
  const mobileLineFillRef = useRef<HTMLDivElement>(null);
  const mobileItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [stepIdx, setStepIdx] = useState<number>(0);
  const [mobileActiveIdx, setMobileActiveIdx] = useState<number>(0);

  const current = STEPS[stepIdx];

  const handleStepChange = (nextIdx: number) => {
    if (nextIdx === stepIdx) return;
    setStepIdx(nextIdx);
  };

  useGSAP(
    () => {
      if (mobileTimelineRef.current && mobileLineFillRef.current) {
        gsap.fromTo(
          mobileLineFillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: mobileTimelineRef.current,
              start: "top 70%",
              end: "bottom 55%",
              scrub: 0.4,
            },
          }
        );
      }

      mobileItemRefs.current.forEach((item, idx) => {
        if (!item) return;
        ScrollTrigger.create({
          trigger: item,
          start: "top 65%",
          end: "bottom 50%",
          onEnter: () => setMobileActiveIdx(idx),
          onEnterBack: () => setMobileActiveIdx(idx),
        });
      });
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      gsap.fromTo(
        ".customer-swap",
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.04, duration: 0.4, ease: "power3.out" }
      );

      if (stepIdx === 0) {
        gsap.fromTo(
          ".blueprint-frame",
          { strokeDasharray: 500, strokeDashoffset: 500, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.9,
            ease: "power2.out",
          }
        );
        gsap.fromTo(
          ".blueprint-fill",
          { scaleX: 0, transformOrigin: "left center", opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            stagger: 0.08,
            duration: 0.6,
            delay: 0.2,
            ease: "power3.out",
          }
        );
        gsap.fromTo(
          ".designer-cursor",
          { x: -90, y: -40 },
          {
            x: 70,
            y: 35,
            duration: 2.4,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
          }
        );
      }

      if (stepIdx === 1) {
        gsap.fromTo(
          ".speed-arc",
          { strokeDasharray: 380, strokeDashoffset: 380 },
          { strokeDashoffset: 30, duration: 1.1, ease: "expo.out" }
        );
        gsap.to(".signal-wave", {
          strokeDashoffset: -200,
          duration: 3,
          repeat: -1,
          ease: "none",
        });
        gsap.fromTo(
          ".check-pill",
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.45,
            delay: 0.15,
            ease: "back.out(1.5)",
          }
        );
      }

      if (stepIdx === 2) {
        gsap.to(".ai-ring-cw", {
          rotation: 360,
          transformOrigin: "360px 210px",
          duration: 20,
          repeat: -1,
          ease: "none",
        });
        gsap.to(".ai-ring-ccw", {
          rotation: -360,
          transformOrigin: "360px 210px",
          duration: 14,
          repeat: -1,
          ease: "none",
        });
        gsap.to(".ai-pulse-line", {
          strokeDashoffset: -140,
          duration: 2,
          repeat: -1,
          ease: "none",
        });
        gsap.to(".ai-core-glow", {
          scale: 1.28,
          opacity: 0.18,
          transformOrigin: "360px 210px",
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.fromTo(
          ".ai-task-node",
          { scale: 0.7, opacity: 0, transformOrigin: "50% 50%" },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.06,
            duration: 0.4,
            ease: "back.out(1.5)",
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [stepIdx] }
  );

  return (
    <section
      ref={sectionRef}
      id="sandbox"
      aria-labelledby="sandbox-heading"
      className="relative w-full py-20 md:py-28 px-6 md:px-12 bg-transparent text-[#ECDFCC]"
    >
      <div className="max-w-7xl mx-auto">
        {/* ===============================================================
            MOBILE LAYOUT (< lg): Clean Vertical Scroll Timeline
        =============================================================== */}
        <div className="lg:hidden">
          <div className="pb-6 border-b border-[#3C3D37]/60">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-[#697565]">
                .02 // HOW WE WORK
              </span>
              <span className="font-mono text-[11px] text-[#697565]">
                3 SIMPLE STEPS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#ECDFCC]">
              From idea to automated growth.
            </h2>
          </div>

          <div ref={mobileTimelineRef} className="relative mt-10 pl-8 space-y-14">
            <div className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-[#3C3D37]/60" />
            <div
              ref={mobileLineFillRef}
              className="absolute left-[11px] top-2 bottom-2 w-[1.5px] bg-[#ECDFCC] origin-top scale-y-0"
            />

            {STEPS.map((step, idx) => {
              const isActive = mobileActiveIdx >= idx;
              return (
                <div
                  key={step.id}
                  ref={(el) => {
                    mobileItemRefs.current[idx] = el;
                  }}
                  className={`relative transition-opacity duration-500 ${
                    mobileActiveIdx === idx ? "opacity-100" : "opacity-55"
                  }`}
                >
                  <div
                    className={`absolute -left-8 top-0.5 w-6 h-6 flex items-center justify-center font-mono text-[10px] font-bold border transition-colors duration-300 ${
                      isActive
                        ? "bg-[#ECDFCC] text-[#0D0E0D] border-[#ECDFCC]"
                        : "bg-[#0D0E0D] text-[#697565] border-[#3C3D37]"
                    }`}
                  >
                    {step.index}
                  </div>

                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#697565] block mb-1.5">
                    {step.badge}
                  </span>

                  <h3 className="text-2xl font-semibold tracking-tight text-[#ECDFCC]">
                    {step.mobileTitle}
                  </h3>

                  <p className="mt-2.5 text-sm text-[#ECDFCC]/75 leading-relaxed">
                    {step.desc}
                  </p>

                  <ul className="mt-4 space-y-2 border-l border-[#3C3D37] pl-3.5">
                    {step.points.map((pt, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-xs text-[#ECDFCC]/90"
                      >
                        <Check className="w-3.5 h-3.5 text-[#697565] shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 inline-flex items-center gap-4 px-3.5 py-2 bg-[#0D0E0D]/80 border border-[#3C3D37]">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-mono text-sm font-bold text-[#ECDFCC]">
                        {step.stat1Val}
                      </span>
                      <span className="font-mono text-[10px] text-[#697565]">
                        {step.stat1Label}
                      </span>
                    </div>
                    <span className="text-[#3C3D37]">|</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-mono text-sm font-bold text-[#ECDFCC]">
                        {step.stat2Val}
                      </span>
                      <span className="font-mono text-[10px] text-[#697565]">
                        {step.stat2Label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 pt-6 border-t border-[#3C3D37]/60">
            <a
              href="#investment"
              className="w-full inline-flex items-center justify-center gap-2.5 py-4 bg-[#ECDFCC] text-[#0D0E0D] font-mono text-xs font-semibold uppercase tracking-widest"
            >
              <span>START YOUR PROJECT</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* ===============================================================
            DESKTOP LAYOUT (lg:block): Strictly #0D0E0D + #3C3D37 + #697565 + #ECDFCC
        =============================================================== */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between gap-4 pb-5 border-b border-[#3C3D37]/60">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#697565]">.02</span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ECDFCC]/85">
                HOW WE WORK — SIMPLE 3-STEP PROCESS
              </span>
            </div>

            <div className="grid grid-cols-3 border border-[#3C3D37] bg-[#0D0E0D]/80">
              {STEPS.map((s, idx) => {
                const active = stepIdx === idx;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleStepChange(idx)}
                    className={`px-5 py-3 font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer border-r last:border-r-0 border-[#3C3D37] text-center ${
                      active
                        ? "bg-[#ECDFCC] text-[#0D0E0D] font-semibold"
                        : "text-[#697565] hover:text-[#ECDFCC] hover:bg-[#3C3D37]/25"
                    }`}
                  >
                    {s.tab}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 border border-[#3C3D37] bg-[#0D0E0D]/60 backdrop-blur-sm">
            <div className="grid grid-cols-12">
              {/* LEFT PANEL (5 Cols) */}
              <div className="col-span-5 relative bg-[#3C3D37]/15 p-10 flex flex-col justify-between border-r border-[#3C3D37]">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    {STEPS.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleStepChange(i)}
                        aria-label={`Go to step ${i + 1}`}
                        className={`h-[3px] transition-all cursor-pointer ${
                          stepIdx === i
                            ? "w-14 bg-[#ECDFCC]"
                            : "w-7 bg-[#697565]/40 hover:bg-[#697565]"
                        }`}
                      />
                    ))}
                  </div>

                  <h2
                    id="sandbox-heading"
                    className="customer-swap text-[46px] font-semibold tracking-tight leading-[1.06] text-[#ECDFCC] whitespace-pre-line"
                  >
                    {current.title}
                  </h2>
                </div>

                <div className="my-6 space-y-4">
                  <div className="customer-swap inline-flex items-center gap-2.5 px-3 py-1.5 bg-[#0D0E0D] border border-[#3C3D37]">
                    <span className="w-2 h-2 bg-[#697565]" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#ECDFCC]">
                      {current.badge}
                    </span>
                  </div>

                  <p className="customer-swap text-base text-[#ECDFCC]/75 leading-relaxed">
                    {current.desc}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <a
                    href="#investment"
                    className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 bg-[#ECDFCC] text-[#0D0E0D] hover:bg-[#ECDFCC]/90 font-mono text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    <span>START PROJECT</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleStepChange((stepIdx + 1) % STEPS.length)}
                    className="px-4 py-3.5 bg-[#0D0E0D] border border-[#3C3D37] font-mono text-xs text-[#697565] hover:text-[#ECDFCC] hover:border-[#ECDFCC]/50 transition-colors cursor-pointer uppercase tracking-wider"
                  >
                    NEXT STEP ({((stepIdx + 1) % 3) + 1}/3) →
                  </button>
                </div>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#697565]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#697565]"
                />
              </div>

              {/* RIGHT PANEL (7 Cols): Animated Visual Stage */}
              <div
                onClick={() => handleStepChange((stepIdx + 1) % STEPS.length)}
                className="col-span-7 relative bg-transparent flex flex-col justify-between overflow-hidden cursor-pointer group"
              >
                <div className="px-6 py-4 border-b border-[#3C3D37] flex items-center justify-between gap-2 bg-[#0D0E0D]/50">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#697565]">
                    {current.canvasLabel}
                  </span>
                  <span className="font-mono text-[11px] text-[#ECDFCC]/70 group-hover:text-[#ECDFCC] transition-colors">
                    [ CLICK TO SEE NEXT STEP → ]
                  </span>
                </div>

                <div className="w-full h-[400px] flex items-center justify-center p-4">
                  {/* ANIMATION 1: WE PLAN & DESIGN */}
                  {stepIdx === 0 && (
                    <svg
                      viewBox="0 0 720 420"
                      preserveAspectRatio="xMidYMid meet"
                      className="w-full h-full select-none"
                    >
                      <g stroke="#3C3D37" strokeOpacity="0.4" strokeWidth="1">
                        {[120, 240, 360, 480, 600].map((x) => (
                          <line key={`vx-${x}`} x1={x} y1={0} x2={x} y2={420} />
                        ))}
                        {[105, 210, 315].map((y) => (
                          <line key={`hy-${y}`} x1={0} y1={y} x2={720} y2={y} />
                        ))}
                      </g>

                      <rect
                        x="90"
                        y="35"
                        width="540"
                        height="350"
                        fill="#0D0E0D"
                        stroke="#ECDFCC"
                        strokeWidth="1.5"
                        className="blueprint-frame"
                      />

                      <line
                        x1="90"
                        y1="80"
                        x2="630"
                        y2="80"
                        stroke="#3C3D37"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="115"
                        y="52"
                        width="75"
                        height="12"
                        fill="#ECDFCC"
                        className="blueprint-fill"
                      />
                      <rect
                        x="525"
                        y="49"
                        width="80"
                        height="18"
                        fill="#697565"
                        className="blueprint-fill"
                      />

                      <rect
                        x="115"
                        y="105"
                        width="310"
                        height="165"
                        fill="#3C3D37"
                        fillOpacity="0.2"
                        stroke="#697565"
                        strokeWidth="1"
                        className="blueprint-frame"
                      />
                      <text
                        x="135"
                        y="132"
                        fill="#697565"
                        fontSize="10"
                        fontFamily="monospace"
                      >
                        01. CLEAR CUSTOMER MESSAGE
                      </text>
                      <rect
                        x="135"
                        y="148"
                        width="230"
                        height="14"
                        fill="#ECDFCC"
                        className="blueprint-fill"
                      />
                      <rect
                        x="135"
                        y="170"
                        width="175"
                        height="14"
                        fill="#ECDFCC"
                        fillOpacity="0.55"
                        className="blueprint-fill"
                      />
                      <rect
                        x="135"
                        y="215"
                        width="115"
                        height="30"
                        fill="#ECDFCC"
                        className="blueprint-fill"
                      />
                      <text
                        x="192"
                        y="234"
                        textAnchor="middle"
                        fill="#0D0E0D"
                        fontSize="9.5"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        BOOK A CALL
                      </text>

                      <rect
                        x="445"
                        y="105"
                        width="160"
                        height="165"
                        fill="#0D0E0D"
                        stroke="#ECDFCC"
                        strokeWidth="1.2"
                        className="blueprint-frame"
                      />
                      <line
                        x1="445"
                        y1="105"
                        x2="605"
                        y2="270"
                        stroke="#3C3D37"
                        strokeWidth="1"
                      />
                      <line
                        x1="605"
                        y1="105"
                        x2="445"
                        y2="270"
                        stroke="#3C3D37"
                        strokeWidth="1"
                      />
                      <rect
                        x="475"
                        y="175"
                        width="100"
                        height="24"
                        fill="#0D0E0D"
                        stroke="#ECDFCC"
                        strokeWidth="1"
                      />
                      <text
                        x="525"
                        y="191"
                        textAnchor="middle"
                        fill="#ECDFCC"
                        fontSize="9"
                        fontFamily="monospace"
                      >
                        BRAND DESIGN
                      </text>

                      {[0, 1, 2].map((col) => (
                        <g key={col}>
                          <rect
                            x={115 + col * 170}
                            y="290"
                            width="150"
                            height="70"
                            fill="#3C3D37"
                            fillOpacity="0.2"
                            stroke="#3C3D37"
                            strokeWidth="1"
                            className="blueprint-frame"
                          />
                          <rect
                            x={130 + col * 170}
                            y="310"
                            width="90"
                            height="10"
                            fill="#ECDFCC"
                            className="blueprint-fill"
                          />
                          <rect
                            x={130 + col * 170}
                            y="330"
                            width="115"
                            height="8"
                            fill="#697565"
                            className="blueprint-fill"
                          />
                        </g>
                      ))}

                      <g className="designer-cursor" transform="translate(380, 200)">
                        <polygon
                          points="0,0 0,18 5,14 9,22 12,20 8,12 14,12"
                          fill="#ECDFCC"
                        />
                        <rect
                          x="16"
                          y="10"
                          width="105"
                          height="20"
                          fill="#ECDFCC"
                        />
                        <text
                          x="68"
                          y="23"
                          textAnchor="middle"
                          fill="#0D0E0D"
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          YOUR NEW SITE
                        </text>
                      </g>
                    </svg>
                  )}

                  {/* ANIMATION 2: WE BUILD & LAUNCH */}
                  {stepIdx === 1 && (
                    <svg
                      viewBox="0 0 720 420"
                      preserveAspectRatio="xMidYMid meet"
                      className="w-full h-full select-none"
                    >
                      <g stroke="#3C3D37" strokeOpacity="0.4" strokeWidth="1">
                        {[144, 288, 432, 576].map((x) => (
                          <line key={x} x1={x} y1={0} x2={x} y2={420} />
                        ))}
                        {[105, 210, 315].map((y) => (
                          <line key={y} x1={0} y1={y} x2={720} y2={y} />
                        ))}
                      </g>

                      <path
                        d="M 40 190 Q 120 95, 200 190 T 360 190 T 520 190 T 680 190"
                        fill="none"
                        stroke="#697565"
                        strokeWidth="1.5"
                        strokeDasharray="6 6"
                      />
                      <path
                        d="M 40 190 Q 120 95, 200 190 T 360 190 T 520 190 T 680 190"
                        fill="none"
                        stroke="#ECDFCC"
                        strokeWidth="2.5"
                        strokeDasharray="36 110"
                        className="signal-wave"
                      />

                      <circle
                        cx="360"
                        cy="190"
                        r="96"
                        fill="#0D0E0D"
                        stroke="#3C3D37"
                        strokeWidth="7"
                      />
                      <circle
                        cx="360"
                        cy="190"
                        r="96"
                        fill="none"
                        stroke="#ECDFCC"
                        strokeWidth="7"
                        transform="rotate(-90 360 190)"
                        className="speed-arc"
                      />

                      <text
                        x="360"
                        y="182"
                        textAnchor="middle"
                        fill="#ECDFCC"
                        fontSize="40"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        0.3s
                      </text>
                      <text
                        x="360"
                        y="206"
                        textAnchor="middle"
                        fill="#697565"
                        fontSize="10"
                        fontFamily="monospace"
                        letterSpacing="2"
                      >
                        INSTANT LOAD
                      </text>
                      <text
                        x="360"
                        y="228"
                        textAnchor="middle"
                        fill="#ECDFCC"
                        fontSize="9.5"
                        fontFamily="monospace"
                      >
                        ● LIVE &amp; GOOGLE READY
                      </text>

                      {[
                        { x: 75, text: "✓ WORKS ON ALL PHONES" },
                        { x: 275, text: "✓ SHOWS UP ON GOOGLE" },
                        { x: 475, text: "✓ LIVE IN 7 DAYS" },
                      ].map((pill, i) => (
                        <g key={i} className="check-pill">
                          <rect
                            x={pill.x}
                            y="335"
                            width="170"
                            height="36"
                            fill="#0D0E0D"
                            stroke="#ECDFCC"
                            strokeWidth="1.2"
                          />
                          <text
                            x={pill.x + 85}
                            y="357"
                            textAnchor="middle"
                            fill="#ECDFCC"
                            fontSize="10"
                            fontFamily="monospace"
                          >
                            {pill.text}
                          </text>
                        </g>
                      ))}
                    </svg>
                  )}

                  {/* ANIMATION 3: WE ADD AI */}
                  {stepIdx === 2 && (
                    <svg
                      viewBox="0 0 720 420"
                      preserveAspectRatio="xMidYMid meet"
                      className="w-full h-full select-none"
                    >
                      <circle
                        cx="360"
                        cy="210"
                        r="145"
                        fill="none"
                        stroke="#3C3D37"
                        strokeWidth="1"
                        strokeDasharray="8 8"
                        className="ai-ring-cw"
                      />
                      <circle
                        cx="360"
                        cy="210"
                        r="100"
                        fill="none"
                        stroke="#697565"
                        strokeWidth="1.5"
                        strokeDasharray="24 12"
                        className="ai-ring-ccw"
                      />

                      {AI_TASKS.map((task, i) => (
                        <g key={i}>
                          <line
                            x1="360"
                            y1="210"
                            x2={task.x}
                            y2={task.y}
                            stroke="#3C3D37"
                            strokeWidth="1.5"
                          />
                          <line
                            x1="360"
                            y1="210"
                            x2={task.x}
                            y2={task.y}
                            stroke="#ECDFCC"
                            strokeWidth="2"
                            strokeDasharray="12 32"
                            className="ai-pulse-line"
                          />
                        </g>
                      ))}

                      <circle
                        cx="360"
                        cy="210"
                        r="52"
                        fill="#ECDFCC"
                        fillOpacity="0.12"
                        className="ai-core-glow"
                      />
                      <circle
                        cx="360"
                        cy="210"
                        r="40"
                        fill="#0D0E0D"
                        stroke="#ECDFCC"
                        strokeWidth="2"
                      />
                      <text
                        x="360"
                        y="206"
                        textAnchor="middle"
                        fill="#ECDFCC"
                        fontSize="11"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        YOUR AI
                      </text>
                      <text
                        x="360"
                        y="221"
                        textAnchor="middle"
                        fill="#697565"
                        fontSize="8.5"
                        fontFamily="monospace"
                      >
                        WORKING 24/7
                      </text>

                      {AI_TASKS.map((task, i) => (
                        <g
                          key={i}
                          className="ai-task-node"
                          transform={`translate(${task.x}, ${task.y})`}
                        >
                          <rect
                            x="-82"
                            y="-15"
                            width="164"
                            height="30"
                            fill="#0D0E0D"
                            stroke="#ECDFCC"
                            strokeWidth="1.2"
                          />
                          <text
                            x="0"
                            y="4"
                            textAnchor="middle"
                            fill="#ECDFCC"
                            fontSize="9"
                            fontFamily="monospace"
                          >
                            {task.label}
                          </text>
                        </g>
                      ))}
                    </svg>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Bottom Stat Bar */}
            <div className="grid grid-cols-2 border-t border-[#3C3D37] bg-[#0D0E0D]/80">
              <div className="px-10 py-6 flex items-center justify-between border-r border-[#3C3D37]">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-base text-[#697565]">✢</span>
                  <span className="customer-swap text-4xl font-semibold tracking-tight text-[#ECDFCC] tabular-nums">
                    {current.stat1Val}
                  </span>
                </div>
                <span className="customer-swap font-mono text-xs text-[#ECDFCC]/70">
                  {current.stat1Label}
                </span>
              </div>

              <div className="px-10 py-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-base text-[#697565]">✢</span>
                  <span className="customer-swap text-4xl font-semibold tracking-tight text-[#ECDFCC] tabular-nums">
                    {current.stat2Val}
                  </span>
                </div>
                <span className="customer-swap font-mono text-xs text-[#ECDFCC]/70">
                  {current.stat2Label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}