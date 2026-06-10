"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image, { StaticImageData } from "next/image"
import {
  ShieldCheck, Activity, Anchor, Zap,
  BellRing, AlertTriangle, LayoutDashboard,
  X, Maximize2, ChevronRight,
  Menu, Radar, Lock, Globe, ArrowRight, Layers,
  BarChart3
} from "lucide-react"
import { Button } from "@/components/ui/button"

import realTimeAlerts from "@/assets/real_time_alerts.png"
import aogEmergency from "@/assets/aog_emergency.png"
import airlinePlatform from "@/assets/airline_platform.png"

const features = [
  {
    image: realTimeAlerts,
    title: "Real-Time Alerts & Monitoring",
    subtitle: "Continuous Fleet Telemetry",
    icon: BellRing,
    iconBg: "bg-blue-500/10 border-blue-500/20",
    iconColor: "text-blue-400",
    description:
      "Ingest live operational data from Sabre, AIMS, ACARS, and partner airline APIs into a unified command center. Configure intelligent alert thresholds per tail, station, or contract — trigger instant notifications for slot changes, maintenance overruns, crew duty limits, and market disruption events across your entire network.",
    bullets: [
      "Multi-source telemetry ingestion (Sabre, AIMS, ACARS)",
      "Configurable alert routing by severity, station & tail number",
      "Live fleet status dashboard with geo-spatial map overlay",
      "Webhook & email integration for dispatch operations centers",
    ],
  },
  {
    image: aogEmergency,
    title: "Speed 2 — AOG Emergency Dispatch",
    subtitle: "Sub-Minute Aircraft Recovery",
    icon: AlertTriangle,
    iconBg: "bg-red-500/10 border-red-500/20",
    iconColor: "text-red-400",
    description:
      "When an aircraft goes AOG, every minute costs thousands. ACMINode's matchmaking engine scans all available carrier capacity, negotiates terms via smart contracts, and locks in a replacement airframe — all within sub-millisecond response windows. Escrow-secured via ACMI-Pay to eliminate counterparty risk.",
    bullets: [
      "Sub-millisecond carrier matching across 1,400+ airframes",
      "Automated smart-contract generation with escrow settlement",
      "Real-time ground-time cost projection & recovery tracking",
      "Priority routing to nearest available crew & maintenance base",
    ],
  },
  {
    image: airlinePlatform,
    title: "Speed 1 — Strategic Fleet Marketplace",
    subtitle: "Long-Term Capacity Orchestration",
    icon: LayoutDashboard,
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "text-emerald-400",
    description:
      "Plan, tender, and close complex ACMI, damp lease, and charter agreements across a global carrier network. Visual fleet planning tools let you model seasonal capacity curves, compare bids side-by-side, and execute multi-party contracts with integrated ACMI-Pay settlement — all within a single, auditable workflow.",
    bullets: [
      "Visual fleet planning with demand forecasting & seasonality",
      "Multi-party tender orchestration with side-by-side bid analysis",
      "Integrated ACMI-Pay escrow for secure contract settlement",
      "Audit-ready contract lifecycle management & compliance logs",
    ],
  },
]

const whyAcmicode = [
  {
    icon: Layers,
    title: "Dual-Speed Architecture",
    color: "blue",
    description:
      "Unify strategic procurement (Speed 1) and emergency response (Speed 2) in a single pane of glass. No other platform delivers sub-minute, event-driven dispatch alongside multi-week tender orchestration — switching modes instantly without context loss.",
  },
  {
    icon: Radar,
    title: "Aviation-Specific Geospatial Engine",
    color: "emerald",
    description:
      "Orthodromic distance calculations via PostGIS ST_Distance — not straight-line map approximations. The engine computes exact nautical miles between ICAO airports and real-time fleet positions in milliseconds, ensuring physically viable matches every time.",
  },
  {
    icon: Globe,
    title: "Direct ERP Telemetry Integration",
    color: "purple",
    description:
      "Native connectors to Sabre, AIMS, and ACARS ingest live operational data directly from airline systems. Validate AOC certifications, crew duty hours, and airframe availability automatically — eliminating stale listings and fraudulent offers.",
  },
  {
    icon: Lock,
    title: "Immutable Financial Guarantee",
    color: "amber",
    description:
      "ACMI-Pay's double-entry ledger architecture locks funds in escrow the moment a contract is signed. No bank transfer delays, no payment risk. Funds release automatically upon verified block-hour consumption — auditable, irreversible, trustless.",
  },
]

const colorClasses: Record<string, { border: string; bg: string; iconBg: string; iconBorder: string; iconColor: string; glow: string; hoverBorder: string }> = {
  blue:    { border: "border-blue-500/20", bg: "bg-blue-500/10", iconBg: "bg-blue-500/10", iconBorder: "border-blue-500/20", iconColor: "text-blue-400", glow: "group-hover:shadow-blue-500/5", hoverBorder: "hover:border-blue-500/40" },
  emerald: { border: "border-emerald-500/20", bg: "bg-emerald-500/10", iconBg: "bg-emerald-500/10", iconBorder: "border-emerald-500/20", iconColor: "text-emerald-400", glow: "group-hover:shadow-emerald-500/5", hoverBorder: "hover:border-emerald-500/40" },
  purple:  { border: "border-purple-500/20", bg: "bg-purple-500/10", iconBg: "bg-purple-500/10", iconBorder: "border-purple-500/20", iconColor: "text-purple-400", glow: "group-hover:shadow-purple-500/5", hoverBorder: "hover:border-purple-500/40" },
  amber:   { border: "border-amber-500/20", bg: "bg-amber-500/10", iconBg: "bg-amber-500/10", iconBorder: "border-amber-500/20", iconColor: "text-amber-400", glow: "group-hover:shadow-amber-500/5", hoverBorder: "hover:border-amber-500/40" },
}

const navLinks = [
  { label: "Why ACMINode", href: "#why-acminode" },
  { label: "Platform Tour", href: "#platform-tour" },
  { label: "ACMI-Pay", href: "#acmi-pay" },
  { label: "AOG Emergency", href: "#aog-emergency" },
]

export default function LandingPage() {
  const [expandedImage, setExpandedImage] = useState<StaticImageData | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpandedImage(null)
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen || expandedImage ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileMenuOpen, expandedImage])

  return (
    <div className="min-h-screen bg-[#050507] text-[#f8fafc] font-sans selection:bg-blue-500/30 overflow-x-hidden flex flex-col relative scroll-smooth">
      {/* Background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-900/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#050507]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 shrink-0">
            <Anchor className="text-blue-500" size={24} />
            <span className="text-xl font-bold tracking-tighter text-white">ACMINODE</span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-400">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Button variant="ghost" className="text-sm font-medium text-slate-300 hover:text-white hover:bg-transparent">
              Sign In
            </Button>
            <Button className="text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-lg shadow-blue-900/20 transition-all border border-blue-400/20">
              Register
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/5 bg-[#0a0a12]/95 backdrop-blur-xl">
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="py-3 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </a>
              ))}
              <hr className="border-white/5 my-2" />
              <div className="flex gap-3 pt-1">
                <Button variant="ghost" className="text-sm text-slate-300 hover:text-white flex-1 justify-center">
                  Sign In
                </Button>
                <Button className="text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white flex-1 justify-center">
                  Register
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center pt-28 pb-20 px-6 sm:px-10 relative z-10 text-center mx-auto max-w-7xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wide mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Enterprise Fleet Infrastructure
        </div>

        <h1 className="max-w-4xl text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#f8fafc] mb-8 leading-[1.1]">
          The High-Availability Operating System for Aircraft Capacity Placement
        </h1>

        <p className="max-w-2xl text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed font-light">
          ACMINode bridges the tactical reality of fleet operations. Orchestrate long-term strategic commercial tenders{" "}
          <span className="text-slate-200 font-medium">(Speed 1)</span> and launch sub-millisecond, event-driven
          aircraft recovery solutions for critical AOG emergencies{" "}
          <span className="text-slate-200 font-medium">(Speed 2)</span> within a single secure ecosystem.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-5 mb-16">
          <Button size="lg" className="px-8 py-6 h-auto text-base bg-white text-black hover:bg-slate-200 font-bold rounded-xl transition-all hover:scale-105">
            <Zap className="mr-2" size={18} />
            Deploy Capacity Request
          </Button>
          <Button size="lg" variant="outline" className="px-8 py-6 h-auto text-base border border-slate-700 text-white font-bold rounded-xl hover:bg-white/5 transition-all">
            <ShieldCheck className="mr-2" size={18} />
            Review Security Protocols
          </Button>
        </div>
      </main>

      {/* ----------------------------------------------------- */}
      {/* Why ACMINode? */}
      {/* ----------------------------------------------------- */}
      <section id="why-acminode" className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-24 scroll-mt-28">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wide mb-6">
            Why ACMINode
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            Built Where Generic Platforms Break
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
            Commercial aviation operates under extreme time, legal, and cost constraints that make generic B2B procurement
            platforms useless. ACMINode is purpose-engineered for the physics of fleet operations — not adapted from another
            industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whyAcmicode.map((item) => {
            const Icon = item.icon
            const cls = colorClasses[item.color]
            return (
              <div
                key={item.title}
                className={`group relative bg-slate-900/20 border rounded-2xl p-7 transition-all duration-500 hover:bg-slate-900/40 ${cls.border} ${cls.hoverBorder} hover:shadow-xl ${cls.glow}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex items-center justify-center w-11 h-11 rounded-xl border shrink-0 ${cls.iconBg} ${cls.iconBorder}`}>
                    <Icon className={cls.iconColor} size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ----------------------------------------------------- */}
      {/* Platform Tour (Screenshots) */}
      {/* ----------------------------------------------------- */}
      <section id="platform-tour" className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-20 scroll-mt-28">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-slate-500 text-xs font-semibold uppercase tracking-wide mb-6">
            Platform Tour
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            See the System in Action
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
            Three integrated interfaces power the most demanding fleet operations — from strategic commercial planning
            to sub-minute emergency aircraft recovery. Click any screenshot to expand.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {features.map((feature, i) => {
            const Icon = feature.icon
            const isReversed = i % 2 === 1
            return (
              <div
                key={feature.title}
                id={i === 1 ? "aog-emergency" : undefined}
                className="group relative bg-slate-900/20 border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all duration-500 scroll-mt-28"
              >
                <div className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
                  <div
                    className="relative lg:w-[55%] aspect-[16/10] lg:aspect-auto lg:min-h-[420px] cursor-pointer overflow-hidden"
                    onClick={() => setExpandedImage(feature.image)}
                  >
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950/60" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-sm font-medium">
                        <Maximize2 size={16} />
                        Click to expand
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-[45%] flex flex-col justify-center p-8 lg:p-12">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${feature.iconBg}`}>
                        <Icon className={feature.iconColor} size={20} />
                      </div>
                      <p className={`text-xs font-semibold uppercase tracking-wider ${feature.iconColor}`}>
                        {feature.subtitle}
                      </p>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed mb-6">{feature.description}</p>

                    <ul className="space-y-3">
                      {feature.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-sm text-slate-300">
                          <ChevronRight className={`shrink-0 mt-0.5 ${feature.iconColor}`} size={16} />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ----------------------------------------------------- */}
      {/* ACMI-Pay */}
      {/* ----------------------------------------------------- */}
      <section id="acmi-pay" className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 pb-24 scroll-mt-28">
        <div className="relative bg-slate-900/20 border border-amber-500/10 rounded-3xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="relative p-8 sm:p-12 lg:p-14">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wide mb-5">
                ACMI-Pay
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                Trustless Settlement. Instant Liquidity.
              </h2>
              <p className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
                Stop chasing payments across borders. ACMI-Pay secures every transaction with a
                double-entry immutable ledger and instant escrow — eliminating counterparty risk
                before the aircraft ever leaves the ground.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <Lock className="text-amber-400" size={26} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">1. Escrow Lock</h4>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">
                    Funds are secured in an immutable escrow the moment both parties sign. No bank
                    delays — capital is verified and frozen instantly.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <BarChart3 className="text-emerald-400" size={26} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">2. Block-Hour Verification</h4>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">
                    The ledger automatically validates consumed block hours against the contract.
                    No manual invoicing — telemetry data triggers confirmation.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                  <Zap className="text-purple-400" size={26} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">3. Instant Release</h4>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">
                    Upon verified completion, funds release automatically. Fully auditable,
                    irreversible, and settlement-final within seconds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- */}
      {/* Live Metrics */}
      {/* ----------------------------------------------------- */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4 md:mb-0">
              Dual-Speed Marketplace Metrics (Live 2026) COMING SOON
            </h2>
            <div className="hidden md:flex h-[1px] flex-1 mx-6 bg-gradient-to-r from-slate-800 to-transparent" />
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-left">
            <div className="flex flex-col gap-1">
              <span className="text-slate-400 text-sm">Avg. AOG Dispatch Recovery Time:</span>
              <span className="text-3xl font-mono font-bold text-emerald-400">
                &lt; 15 Minutes
              </span>
            </div>

            <div className="flex flex-col gap-1 md:border-x border-slate-800 md:px-12 pt-6 md:pt-0 border-t md:border-t-0">
              <span className="text-slate-400 text-sm">Verified Active Carrier Airframes:</span>
              <span className="text-3xl font-mono font-bold text-white">
                1,412 Fleet Assets
              </span>
            </div>

            <div className="flex flex-col gap-1 pt-6 md:pt-0 border-t border-slate-800 md:border-t-0">
              <span className="text-slate-400 text-sm">Total Capital Cleared via Escrow:</span>
              <span className="text-3xl font-mono font-bold text-blue-400">
                $1,840,500.00 <span className="text-sm font-sans font-medium text-slate-500">USD</span>
              </span>
            </div>
          </div>*/}
        </div>
      </section>

      {/* ----------------------------------------------------- */}
      {/* Final CTA */}
      {/* ----------------------------------------------------- */}
      <section className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 pb-20 text-center">
        <div className="relative bg-gradient-to-b from-slate-900/30 to-transparent border border-white/5 rounded-3xl p-10 sm:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_70%)] pointer-events-none" />
          <h2 className="relative text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Ready to Transform Your Fleet Operations?
          </h2>
          <p className="relative max-w-xl mx-auto text-slate-400 text-lg mb-8 leading-relaxed">
            Join the carriers already reducing AOG recovery from hours to minutes. Deploy a
            capacity request now or schedule a technical deep-dive with our team.
          </p>
          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="px-8 py-6 h-auto text-base bg-white text-black hover:bg-slate-200 font-bold rounded-xl transition-all hover:scale-105">
              <Zap className="mr-2" size={18} />
              Deploy Capacity Request
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 h-auto text-base border border-slate-700 text-white font-bold rounded-xl hover:bg-white/5 transition-all">
              <ArrowRight className="mr-2" size={18} />
              Talk to Sales Engineering
            </Button>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- */}
      {/* Footer */}
      {/* ----------------------------------------------------- */}
      <footer className="relative z-10 border-t border-white/5 bg-black/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Anchor className="text-slate-600" size={18} />
            <span className="text-sm font-semibold tracking-tight text-slate-500">ACMINODE</span>
            <span className="text-xs text-slate-700 ml-2">&copy; 2026</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-500 font-bold">
                System Operational
              </span>
            </div>
            <span className="text-slate-700 text-xs hidden md:inline mx-1">|</span>
            <span className="text-[10px] font-mono text-slate-600 tracking-widest">
              V4.82.0-STABLE // LATENCY: 14MS
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-600">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Status</a>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setExpandedImage(null)}
        >
          <button
            className="absolute top-6 right-6 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-colors"
            onClick={() => setExpandedImage(null)}
          >
            <X size={20} />
          </button>
          <div className="relative w-full max-w-6xl max-h-[90vh] aspect-video" onClick={(e) => e.stopPropagation()}>
            <Image
              src={expandedImage}
              alt="Expanded view"
              fill
              className="object-contain"
              sizes="100vw"
              quality={100}
            />
          </div>
        </div>
      )}
    </div>
  )
}
