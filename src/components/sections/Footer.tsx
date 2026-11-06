// src/components/layout/Footer.tsx
"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0D0E0D] text-[#ECDFCC] border-t border-[#262825] px-6 md:px-12 pt-16 pb-10">
      <div className="max-w-7xl mx-auto">
        {/* Top Grid: Brand, Navigation & Direct Email */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#262825]">
          {/* Col 1: Brand Identity (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#"
              className="inline-flex items-center gap-1 text-2xl font-bold tracking-tighter text-[#ECDFCC] group"
            >
              <span>SEGLEAD</span>
              <span className="text-[#ECDFCC]/40 group-hover:translate-x-0.5 transition-transform">
                .
              </span>
            </a>
            <p className="text-sm text-[#ECDFCC]/60 max-w-sm leading-relaxed">
              Next.js 16 web architecture and intelligent AI workflow automation
              engineered for startups and scaling brands.
            </p>
            <div className="inline-flex items-center gap-2 pt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ECDFCC]/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ECDFCC] animate-pulse" />
              <span>UNITED KINGDOM // SYSTEMS ONLINE</span>
            </div>
          </div>

          {/* Col 2: Quick Navigation Links (4 Cols) */}
          <div className="md:col-span-4 space-y-3">
            <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#ECDFCC]/40">
              NAVIGATION
            </span>
            <nav className="grid grid-cols-2 gap-y-2.5 gap-x-4 font-mono text-xs">
              <a
                href="#friction"
                className="text-[#ECDFCC]/70 hover:text-[#ECDFCC] transition-colors"
              >
                .01 Why Seglead
              </a>
              <a
                href="#sandbox"
                className="text-[#ECDFCC]/70 hover:text-[#ECDFCC] transition-colors"
              >
                .02 Systems
              </a>
              <a
                href="#capabilities"
                className="text-[#ECDFCC]/70 hover:text-[#ECDFCC] transition-colors"
              >
                .03 Capabilities
              </a>
              <a
                href="#contact"
                className="text-[#ECDFCC]/70 hover:text-[#ECDFCC] transition-colors"
              >
                .04 Contact
              </a>
            </nav>
          </div>

          {/* Col 3: Direct Email & Back to Top (3 Cols) */}
          <div className="md:col-span-3 flex flex-col justify-between space-y-6 md:items-end">
            <div className="space-y-2 md:text-right">
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#ECDFCC]/40">
                DIRECT INQUIRIES
              </span>
              <a
                href="mailto:info@seglead.com"
                className="inline-flex items-center gap-1.5 font-mono text-sm text-[#ECDFCC] hover:underline underline-offset-4 group"
              >
                <span>info@seglead.com</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#ECDFCC]/50 group-hover:text-[#ECDFCC] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            <a
              href="#"
              className="self-start md:self-end inline-flex items-center gap-2 px-3.5 py-2 border border-[#262825] bg-[#121312] hover:border-[#ECDFCC]/50 font-mono text-[10px] uppercase tracking-widest text-[#ECDFCC] transition-colors group"
            >
              <span>BACK TO TOP</span>
              <ArrowUpRight className="w-3 h-3 -rotate-45 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] text-[#ECDFCC]/45">
          <span>
            &copy; {new Date().getFullYear()} SEGLEAD. ALL RIGHTS RESERVED.
          </span>
          <span>BUILT WITH NEXT.JS 16 &amp; GSAP // UK</span>
        </div>
      </div>
    </footer>
  );
}
