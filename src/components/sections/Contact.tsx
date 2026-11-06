// src/components/sections/Contact.tsx
"use client";

import React, { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ArrowUpRight, Check, Copy, Loader2 } from "lucide-react";

const SCOPE_OPTIONS = [
  { id: "Next.js Website", num: "01", label: "Next.js Website" },
  { id: "Workflow Automation", num: "02", label: "Workflow Automation" },
  { id: "Custom AI Assistant", num: "03", label: "Custom AI Assistant" },
  { id: "Web App / Portal", num: "04", label: "Web App / Portal" },
];

// 👇 PASTE YOUR WEB3FORMS KEY HERE (from https://web3forms.com)
// Or put NEXT_PUBLIC_WEB3FORMS_KEY=your_key in .env.local
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  const [selectedScopes, setSelectedScopes] = useState<string[]>([
    "Next.js Website",
  ]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [brief, setBrief] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleScope = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.fromTo(
      e.currentTarget,
      { scale: 0.96 },
      { scale: 1, duration: 0.3, ease: "power2.out" }
    );

    setSelectedScopes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@seglead.co.uk");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !brief.trim()) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      if (
        !WEB3FORMS_ACCESS_KEY ||
        WEB3FORMS_ACCESS_KEY === "3b7c5777-664f-480d-8f24-24437ccac712"
      ) {
        throw new Error(
          "Paste your Web3Forms key into WEB3FORMS_ACCESS_KEY at the top of Contact.tsx (or in .env.local)."
        );
      }

      // Build FormData directly in the browser (Bypasses Cloudflare & JSON parse issues 100%)
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.append(
        "subject",
        `New Seglead Brief from ${name} (${company || "No Company"})`
      );
      formData.append("from_name", "Seglead Website");
      formData.append("name", name);
      formData.append("email", email);
      formData.append("company", company || "Not provided");
      formData.append("selected_modules", selectedScopes.join(", "));
      formData.append("message", brief);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const text = await response.text();
      let data: { success?: boolean; message?: string } = {};

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Network blocked the request. Please try again.");
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Could not send message.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please email hello@seglead.co.uk directly.";
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  useGSAP(
    () => {
      gsap.fromTo(
        ".contact-anim",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative w-full pt-24 md:pt-36 pb-12 px-6 md:px-12 bg-transparent text-[#ECDFCC] border-t border-[#262825]"
    >
      {/* Hidden anchor so existing #investment CTA buttons scroll smoothly here */}
      <div id="investment" className="absolute -top-24 left-0" aria-hidden="true" />

      <div className="max-w-7xl mx-auto">
        {/* ===============================================================
            ARCHITECTURAL SPLIT FRAME (1px Solid Grid — #0D0E0D Carbon)
        =============================================================== */}
        <div className="border border-[#262825] bg-[#0D0E0D] grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT COLUMN (5 Cols): Editorial Statement & Direct Dispatch */}
          <div className="lg:col-span-5 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-[#262825] flex flex-col justify-between gap-12">
            <div className="space-y-6">
              <div className="contact-anim flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ECDFCC]/50">
                  .04 // INITIATE PROJECT
                </span>
                <span className="inline-flex items-center gap-2 px-2.5 py-1 border border-[#262825] font-mono text-[10px] uppercase tracking-widest text-[#ECDFCC]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ECDFCC] animate-pulse" />
                  BOOKING OPEN
                </span>
              </div>

              <h2
                id="contact-heading"
                className="contact-anim text-4xl sm:text-5xl xl:text-6xl font-semibold tracking-tight text-[#ECDFCC] leading-[1.02]"
              >
                Ready to automate &amp; scale?
              </h2>

              <p className="contact-anim text-sm sm:text-base text-[#ECDFCC]/65 leading-relaxed">
                Skip the 10-page agency questionnaires. Select the systems you
                need on the right, drop your details, and we will reply within
                24 hours with a concrete architectural plan.
              </p>
            </div>

            {/* Bottom Left: Interactive Click-to-Copy Email & Studio Specs */}
            <div className="contact-anim space-y-6 pt-8 border-t border-[#262825]">
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-widest text-[#ECDFCC]/45 mb-2">
                  DIRECT DISPATCH // CLICK TO COPY
                </span>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="w-full p-4 border border-[#262825] bg-[#121312] hover:border-[#ECDFCC]/60 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <span className="font-mono text-sm sm:text-base text-[#ECDFCC] font-medium">
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

              <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-xs">
                <div>
                  <span className="block text-[10px] text-[#ECDFCC]/40 uppercase tracking-widest">
                    BASE
                  </span>
                  <span className="text-[#ECDFCC]/85 mt-0.5 block">
                    UNITED KINGDOM
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-[#ECDFCC]/40 uppercase tracking-widest">
                    RESPONSE SLA
                  </span>
                  <span className="text-[#ECDFCC]/85 mt-0.5 block">
                    &lt; 24 HOURS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (7 Cols): Flush Architectural Brief Builder */}
          <div className="lg:col-span-7 p-8 sm:p-12 bg-[#0D0E0D] flex flex-col justify-between">
            {submitted ? (
              <div className="my-auto py-16 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ECDFCC] text-[#0D0E0D] font-mono text-xs font-bold uppercase tracking-widest">
                  <Check className="w-3.5 h-3.5" />
                  <span>TRANSMISSION RECEIVED</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#ECDFCC]">
                  We&apos;re on it, {name}.
                </h3>

                <p className="text-sm sm:text-base text-[#ECDFCC]/70 max-w-md leading-relaxed">
                  Your brief has been logged into our system. We&apos;ll review
                  your scope and send a tailored walkthrough to{" "}
                  <span className="text-[#ECDFCC] font-mono underline">
                    {email}
                  </span>{" "}
                  within 24 hours.
                </p>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setEmail("");
                      setCompany("");
                      setBrief("");
                    }}
                    className="px-5 py-3 border border-[#262825] font-mono text-xs uppercase tracking-widest text-[#ECDFCC] hover:border-[#ECDFCC] transition-colors cursor-pointer"
                  >
                    [ SEND ANOTHER BRIEF ]
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* STEP 01: Interactive 2x2 Architectural Scope Tiles */}
                <div className="contact-anim">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#ECDFCC]/60">
                      01 // SELECT SYSTEM MODULES
                    </span>
                    <span className="font-mono text-[11px] text-[#ECDFCC]/40">
                      {selectedScopes.length} SELECTED
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SCOPE_OPTIONS.map((item) => {
                      const isSelected = selectedScopes.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={(e) => toggleScope(item.id, e)}
                          className={`p-4 border text-left transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? "bg-[#ECDFCC] text-[#0D0E0D] border-[#ECDFCC]"
                              : "bg-[#121312] text-[#ECDFCC] border-[#262825] hover:border-[#ECDFCC]/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`font-mono text-xs ${
                                isSelected
                                  ? "text-[#0D0E0D]/70 font-bold"
                                  : "text-[#ECDFCC]/40"
                              }`}
                            >
                              /{item.num}
                            </span>
                            <span className="text-sm font-semibold tracking-tight">
                              {item.label}
                            </span>
                          </div>

                          <div
                            className={`w-4 h-4 border flex items-center justify-center ${
                              isSelected
                                ? "border-[#0D0E0D] bg-[#0D0E0D] text-[#ECDFCC]"
                                : "border-[#262825]"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 02: Minimal Flush Underline Inputs */}
                <div className="contact-anim space-y-8">
                  <span className="block font-mono text-xs uppercase tracking-widest text-[#ECDFCC]/60">
                    02 // YOUR COORDINATES
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="relative">
                      <label
                        htmlFor="brief-name"
                        className="block font-mono text-[10px] uppercase tracking-widest text-[#ECDFCC]/45 mb-1"
                      >
                        YOUR NAME *
                      </label>
                      <input
                        id="brief-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Mercer"
                        className="w-full py-3 bg-transparent border-b border-[#262825] text-base text-[#ECDFCC] placeholder:text-[#ECDFCC]/25 focus:outline-none focus:border-[#ECDFCC] transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="brief-email"
                        className="block font-mono text-[10px] uppercase tracking-widest text-[#ECDFCC]/45 mb-1"
                      >
                        WORK EMAIL *
                      </label>
                      <input
                        id="brief-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.co.uk"
                        className="w-full py-3 bg-transparent border-b border-[#262825] text-base text-[#ECDFCC] placeholder:text-[#ECDFCC]/25 focus:outline-none focus:border-[#ECDFCC] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="brief-company"
                      className="block font-mono text-[10px] uppercase tracking-widest text-[#ECDFCC]/45 mb-1"
                    >
                      COMPANY OR WEBSITE URL (OPTIONAL)
                    </label>
                    <input
                      id="brief-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="mercer.co.uk"
                      className="w-full py-3 bg-transparent border-b border-[#262825] text-base text-[#ECDFCC] placeholder:text-[#ECDFCC]/25 focus:outline-none focus:border-[#ECDFCC] transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="brief-message"
                      className="block font-mono text-[10px] uppercase tracking-widest text-[#ECDFCC]/45 mb-1"
                    >
                      PROJECT BRIEF &amp; GOALS *
                    </label>
                    <textarea
                      id="brief-message"
                      rows={3}
                      required
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                      placeholder="Tell us what you want to launch or automate..."
                      className="w-full py-3 bg-transparent border-b border-[#262825] text-base text-[#ECDFCC] placeholder:text-[#ECDFCC]/25 focus:outline-none focus:border-[#ECDFCC] transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div className="p-3.5 border border-[#ECDFCC]/40 bg-[#121312] font-mono text-xs text-[#ECDFCC]">
                    ⚠ {errorMsg}
                  </div>
                )}

                {/* STEP 03: Full-Width High-Contrast Submit Bar */}
                <div className="contact-anim pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="font-mono text-[11px] text-[#ECDFCC]/45">
                    // ZERO OBLIGATION • DIRECT FOUNDER REPLY
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#ECDFCC] text-[#0D0E0D] font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#ECDFCC]/90 disabled:opacity-50 transition-colors cursor-pointer group"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>DISPATCHING...</span>
                      </>
                    ) : (
                      <>
                        <span>DISPATCH BRIEF</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* ===============================================================
            MINIMAL ARCHITECTURAL FOOTER
        =============================================================== */}
        <footer className="mt-16 pt-8 border-t border-[#262825] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-xl font-bold tracking-tighter text-[#ECDFCC]"
            >
              SEGLEAD.
            </a>
            <span className="font-mono text-xs text-[#ECDFCC]/40">
              // NEXT.JS WEB ENGINEERING &amp; AI SYSTEMS
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-[#ECDFCC]/60">
            <a href="#friction" className="hover:text-[#ECDFCC] transition-colors">
              .01 Why Seglead
            </a>
            <a href="#sandbox" className="hover:text-[#ECDFCC] transition-colors">
              .02 Systems
            </a>
            <a href="#capabilities" className="hover:text-[#ECDFCC] transition-colors">
              .03 Capabilities
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-1 text-[#ECDFCC] hover:opacity-75 transition-opacity"
            >
              <span>TOP</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
