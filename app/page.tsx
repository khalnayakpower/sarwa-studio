"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

/* ════════════════════════════════════════════
   HOOKS
════════════════════════════════════════════ */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCounter(target: number, duration = 2000, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

/* ════════════════════════════════════════════
   ANIMATED SECTION WRAPPER
════════════════════════════════════════════ */
function Reveal({
  children,
  delay = 0,
  className = "",
  dir = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  dir?: "up" | "left" | "right" | "scale";
}) {
  const { ref, inView } = useInView();
  const base =
    dir === "up" ? "translate-y-12 opacity-0"
      : dir === "left" ? "-translate-x-12 opacity-0"
        : dir === "right" ? "translate-x-12 opacity-0"
          : "scale-90 opacity-0";

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? "translate-y-0 translate-x-0 scale-100 opacity-100" : base} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════
   STAT CARD
════════════════════════════════════════════ */
function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, inView } = useInView(0.5);
  const count = useCounter(value, 1800, inView);
  return (
    <div
      ref={ref}
      className="group rounded-2xl border border-white/8 p-8 text-center hover:border-amber-400/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-900/10"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      <p className="text-4xl md:text-5xl font-bold text-amber-400 mb-2 tabular-nums group-hover:scale-110 transition-transform duration-300">
        {count}{suffix}
      </p>
      <p className="text-gray-500 text-sm tracking-wide">{label}</p>
    </div>
  );
}

/* ════════════════════════════════════════════
   FLOATING PARTICLE
════════════════════════════════════════════ */
function Particle({ x, y, size, duration, delay }: { x: number; y: number; size: number; duration: number; delay: number }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: `rgba(251,191,36,${Math.random() * 0.25 + 0.05})`,
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        boxShadow: `0 0 ${size * 2}px rgba(251,191,36,0.3)`,
      }}
    />
  );
}

/* ════════════════════════════════════════════
   DATA
════════════════════════════════════════════ */
const services = [
  {
    id: "web-dev", color: "#3b82f6",
    title: "Web Development",
    desc: "High-performance websites & apps built to convert visitors into customers.",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  },
  {
    id: "3d", color: "#f59e0b",
    title: "3D Animation",
    desc: "Stunning 3D visuals & walkthroughs that make brands impossible to ignore.",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>,
  },
  {
    id: "video", color: "#ef4444",
    title: "Video Editing",
    desc: "Professional edits for YouTube, ads, reels & brand films that captivate.",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
  },
  {
    id: "software", color: "#22c55e",
    title: "Software Solutions",
    desc: "Custom SaaS, mobile apps & automation tools that drive real results.",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" /></svg>,
  },
  {
    id: "graphic", color: "#a855f7",
    title: "Graphic Design",
    desc: "Visual identities, brand assets & UI/UX designs that leave a lasting mark.",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  },
  {
    id: "digital", color: "#06b6d4",
    title: "Digital Solutions",
    desc: "End-to-end strategies — SEO, social media, marketing & analytics.",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  },
];

const stats = [
  { value: 100, suffix: "+", label: "Projects Delivered" },
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 6, suffix: "+", label: "Services" },
  { value: 100, suffix: "%", label: "Satisfaction" },
];

const reasons = [
  { icon: "🎯", title: "Client-First Always", desc: "We listen deeply and adapt to your goals — not a cookie-cutter template." },
  { icon: "⚡", title: "Fast Turnaround", desc: "Tight deadlines? We thrive under pressure and always deliver on time." },
  { icon: "🏆", title: "Pixel-Perfect Quality", desc: "Obsessive attention to detail — every pixel and line of code is intentional." },
  { icon: "🔧", title: "Full-Service Studio", desc: "Design, code, animation, video — all under one creative roof." },
  { icon: "💬", title: "Clear Communication", desc: "Regular updates, transparent pricing — no surprises, ever." },
  { icon: "🚀", title: "Built to Scale", desc: "Every solution is architected to grow alongside your business." },
];

const testimonials = [
  { name: "Aryan Mehta", role: "Founder, PixelForge", avatar: "AM", text: "Sarwa Studio redesigned our entire brand identity. The results exceeded every expectation — conversion rate jumped 40% in the first month." },
  { name: "Priya Sharma", role: "Marketing Head, NovaReach", avatar: "PS", text: "The 3D animation for our product launch was breathtaking. Our social media went viral. Truly a world-class creative team." },
  { name: "Ravi Patel", role: "CEO, BuildCraft", avatar: "RP", text: "They built our SaaS platform from scratch. On time, on budget, and with zero compromises on quality. Couldn't ask for more." },
];

const marqueeItems = ["Web Development", "3D Animation", "Video Editing", "Software Solutions", "Graphic Design", "Digital Solutions", "UI / UX Design", "Brand Identity", "Motion Graphics", "E-Commerce"];

/* ════════════════════════════════════════════
   TYPEWRITER
════════════════════════════════════════════ */
const words = ["Brands", "Products", "Experiences", "Futures"];
function Typewriter() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    if (!deleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length === current.length) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 50);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }
  }, [displayed, deleting, wordIndex]);

  return (
    <span className="relative inline-block">
      <span
        style={{
          background: "linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #fbbf24 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "200% auto",
          animation: "shimmer 3s linear infinite",
        }}
      >
        {displayed}
      </span>
      <span
        className="animate-blink ml-0.5 inline-block w-[3px] rounded-full align-middle"
        style={{ height: "0.85em", background: "#fbbf24", verticalAlign: "middle" }}
      />
    </span>
  );
}

/* ════════════════════════════════════════════
   PARTICLES (client-only, stable positions)
════════════════════════════════════════════ */
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: (i * 37 + 11) % 100,
  y: (i * 53 + 7) % 100,
  size: (i % 4) + 2,
  duration: 4 + (i % 5),
  delay: (i % 5) * 0.8,
}));

/* ════════════════════════════════════════════
   PAGE
════════════════════════════════════════════ */
export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const move = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="min-h-screen text-gray-300 overflow-x-hidden"
      style={{ background: "linear-gradient(135deg, #0a111e 0%, #111929 60%, #192940 100%)" }}
    >

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

        {/* Mouse glow */}
        {mounted && (
          <div
            className="pointer-events-none fixed inset-0 z-0"
            style={{
              background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(251,191,36,0.06), transparent 60%)`,
              transition: "background 0.1s",
            }}
          />
        )}

        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-amber-400/6 rounded-full blur-[180px]" style={{ animation: "breathe 6s ease-in-out infinite" }} />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[160px]" style={{ animation: "breathe 8s ease-in-out infinite", animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[120px]" style={{ animation: "breathe 5s ease-in-out infinite", animationDelay: "1s" }} />

          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          {/* Floating particles */}
          {mounted && PARTICLES.map((p) => <Particle key={p.id} {...p} />)}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/25 text-amber-400 text-sm font-medium px-5 py-2 rounded-full mb-10 backdrop-blur-sm"
            style={{ animation: "fadeSlideDown 0.8s ease-out both" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Creative Studio — Design · Code · Motion
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.05] mb-4"
            style={{ animation: "fadeSlideDown 0.9s ease-out 0.1s both" }}
          >
            We Build
          </h1>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] mb-6"
            style={{ animation: "fadeSlideDown 1s ease-out 0.2s both", minHeight: "1.1em" }}
          >
            <Typewriter />
          </h1>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-gray-600 font-light italic leading-[1.1] mb-8"
            style={{ animation: "fadeSlideDown 1.1s ease-out 0.3s both" }}
          >
            That Matter
          </h1>

          {/* Sub */}
          <p
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ animation: "fadeSlideDown 1.1s ease-out 0.4s both" }}
          >
            Sarwa Studio is a full-service creative agency delivering{" "}
            <span className="text-white font-medium">web development</span>,{" "}
            <span className="text-white font-medium">3D animation</span>,{" "}
            <span className="text-white font-medium">video editing</span>, and{" "}
            <span className="text-white font-medium">software solutions</span>{" "}
            that make brands unforgettable.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animation: "fadeSlideDown 1.1s ease-out 0.5s both" }}
          >
            <Link href="/services"
              className="group relative inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#111929] font-bold px-9 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-amber-500/30 hover:-translate-y-1 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-amber-300/0 via-white/20 to-amber-300/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              Explore Services
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/contact"
              className="group inline-flex items-center justify-center gap-2 border border-white/15 text-white hover:border-amber-400/50 hover:text-amber-400 font-semibold px-9 py-4 rounded-full transition-all duration-200 backdrop-blur-sm hover:-translate-y-1"
            >
              Start a Project
              <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Floating badges */}
          <div
            className="mt-14 flex flex-wrap justify-center gap-4"
            style={{ animation: "fadeSlideDown 1.1s ease-out 0.65s both" }}
          >
            {[{ n: "100+", l: "Projects" }, { n: "50+", l: "Clients" }, { n: "100%", l: "Satisfaction" }].map((b, i) => (
              <div key={b.l}
                className="flex items-center gap-2 bg-white/5 border border-white/8 backdrop-blur-sm px-4 py-2 rounded-full hover:border-amber-400/30 transition-all hover:bg-amber-400/5"
                style={{ animation: `fadeSlideDown 1.1s ease-out ${0.7 + i * 0.1}s both` }}
              >
                <span className="text-amber-400 font-bold text-sm">{b.n}</span>
                <span className="text-gray-500 text-xs">{b.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 text-xs" style={{ animation: "fadeIn 2s ease-out 1.5s both" }}>
          <span className="tracking-widest uppercase text-[10px] animate-pulse">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-amber-400/70 to-transparent" style={{ animation: "scrollPulse 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════
          MARQUEE
      ══════════════════════════════════════ */}
      <div className="border-y border-white/5 py-5 overflow-hidden relative" style={{ background: "rgba(251,191,36,0.03)" }}>
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#0a111e] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#111929] to-transparent pointer-events-none" />
        <div className="flex gap-12 whitespace-nowrap" style={{ animation: "marquee 28s linear infinite" }}>
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-5 text-sm font-medium text-gray-500 shrink-0 hover:text-amber-400 transition-colors cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70 flex-shrink-0 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          SERVICES
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <Reveal className="text-center mb-16">
          <div className="w-12 h-0.5 bg-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Everything You Need,{" "}
            <span className="text-amber-400">Under One Roof</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            From concept to launch — we handle every creative and technical touchpoint.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 80} dir="up">
              <Link href={`/services#${s.id}`}
                className="group relative rounded-2xl border border-white/5 p-7 overflow-hidden block transition-all duration-400 hover:border-amber-400/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-900/10"
                style={{ background: "rgba(255,255,255,0.025)" }}
              >
                {/* Hover colour wash */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${s.color}15, transparent 70%)` }} />
                {/* Shimmer sweep */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)", transform: "translateX(-100%)", animation: "none" }} />

                <div className="relative">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ background: `${s.color}18`, color: "#fbbf24", border: `1px solid ${s.color}30` }}>
                    {s.icon}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-amber-400 transition-colors duration-200">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-transparent group-hover:text-amber-400 text-xs font-medium transition-all duration-300">
                    Learn more
                    <svg className="w-3.5 h-3.5 -translate-x-2 group-hover:translate-x-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="text-center mt-10">
            <Link href="/services"
              className="group inline-flex items-center gap-2 border border-amber-400/30 text-amber-400 hover:bg-amber-400/10 px-6 py-3 rounded-full text-sm font-medium transition-all hover:border-amber-400/60 hover:-translate-y-0.5">
              View All Services
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════
          STATS
      ══════════════════════════════════════ */}
      <section className="border-y border-white/5 py-20" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} dir="scale">
              <StatCard {...s} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHY US
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <Reveal className="text-center mb-16">
          <div className="w-12 h-0.5 bg-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Why Clients Choose{" "}
            <span className="text-amber-400">Sarwa Studio</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            We're not just a vendor — we're a creative partner invested in your growth.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <Reveal key={i} delay={i * 70} dir={i % 2 === 0 ? "left" : "right"}>
              <div className="rounded-2xl border border-white/5 p-7 group hover:border-amber-400/20 transition-all duration-400 hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="text-3xl mb-4" style={{ filter: "drop-shadow(0 0 8px rgba(251,191,36,0.3))", transition: "filter 0.3s", }}>{r.icon}</div>
                <h3 className="text-white font-semibold mb-2 group-hover:text-amber-400 transition-colors">{r.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          PROCESS
      ══════════════════════════════════════ */}
      <section className="border-y border-white/5 py-20" style={{ background: "rgba(251,191,36,0.02)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <div className="w-12 h-0.5 bg-amber-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">How We Work</h2>
          </Reveal>

          <div className="grid md:grid-cols-4 gap-0 relative">
            <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-amber-400/0 via-amber-400/30 to-amber-400/0" />
            {[
              { n: "01", t: "Discovery", d: "Deep-dive into your goals, audience & vision." },
              { n: "02", t: "Strategy", d: "Tailored roadmap — timelines, deliverables & plan." },
              { n: "03", t: "Creation", d: "Experts build with precision and creativity." },
              { n: "04", t: "Launch", d: "Polished delivery, feedback loops & ongoing support." },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 120} dir="up">
                <div className="relative flex flex-col items-center text-center px-6 mb-8 md:mb-0 group">
                  <div className="relative z-10 w-14 h-14 rounded-full border-2 border-amber-400/30 bg-[#111929] flex items-center justify-center text-amber-400 font-bold text-sm mb-5 group-hover:border-amber-400 group-hover:shadow-lg group-hover:shadow-amber-500/20 transition-all duration-300">
                    {p.n}
                    <div className="absolute inset-0 rounded-full bg-amber-400/10 scale-0 group-hover:scale-150 opacity-50 group-hover:opacity-0 transition-all duration-600 pointer-events-none" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-amber-400 transition-colors">{p.t}</h3>
                  <p className="text-gray-500 text-sm max-w-[180px]">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <Reveal className="text-center mb-16">
          <div className="w-12 h-0.5 bg-amber-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            What Our <span className="text-amber-400">Clients Say</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 100} dir="up">
              <div className="rounded-2xl border border-white/8 p-7 flex flex-col gap-5 group hover:border-amber-400/25 hover:-translate-y-1 transition-all duration-400"
                style={{ background: "rgba(255,255,255,0.025)" }}>
                {/* Animated stars */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <svg key={si} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"
                      style={{ animation: `starPop 0.4s ease-out ${si * 0.08}s both` }}>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-5xl text-amber-400/15 font-serif leading-none select-none">"</div>
                <p className="text-gray-400 text-sm leading-relaxed -mt-4 flex-1">{t.text}</p>
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold text-xs group-hover:bg-amber-400/30 transition-colors">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-600 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 pb-28">
        <Reveal dir="scale">
          <div className="relative overflow-hidden rounded-3xl border border-amber-400/20 p-12 md:p-16 text-center"
            style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.1) 0%, rgba(17,25,41,0.95) 50%, rgba(251,191,36,0.06) 100%)" }}>
            {/* Orbs */}
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-amber-400/10 rounded-full blur-[80px] pointer-events-none" style={{ animation: "breathe 5s ease-in-out infinite" }} />
            <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" style={{ animation: "breathe 7s ease-in-out infinite", animationDelay: "1s" }} />
            {/* Spinning ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-amber-400/5 pointer-events-none" style={{ animation: "spin 20s linear infinite" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-amber-400/8 pointer-events-none" style={{ animation: "spin 15s linear infinite reverse" }} />

            <div className="relative z-10">
              <div className="w-12 h-0.5 bg-amber-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Let's Build Something{" "}
                <span className="text-amber-400">Amazing</span> Together
              </h2>
              <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg">
                Tell us your vision. We'll make it reality — on time, on budget, and beyond expectations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact"
                  className="group relative inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#111929] font-bold px-9 py-4 rounded-full transition-all duration-200 hover:shadow-2xl hover:shadow-amber-500/30 hover:-translate-y-1 overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-300/0 via-white/20 to-amber-300/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  Start Your Project
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a href="mailto:vv797538@gmail.com"
                  className="group inline-flex items-center justify-center border border-white/15 text-white hover:border-amber-400/40 hover:text-amber-400 font-semibold px-9 py-4 rounded-full transition-all duration-200 hover:-translate-y-1">
                  Send an Email
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ════ GLOBAL ANIMATIONS ════ */}
      <style jsx global>{`
        @keyframes shimmer { from { background-position: 0% center; } to { background-position: 200% center; } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }
        @keyframes breathe { 0%,100% { transform: scale(1); opacity:0.6; } 50% { transform: scale(1.08); opacity:1; } }
        @keyframes float { 0%,100% { transform: translateY(0px) rotate(0deg); opacity:0.5; } 33% { transform: translateY(-18px) rotate(2deg); opacity:1; } 66% { transform: translateY(8px) rotate(-1deg); opacity:0.7; } }
        @keyframes fadeSlideDown { from { opacity:0; transform: translateY(-20px); } to { opacity:1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes scrollPulse { 0%,100% { transform: scaleY(1); opacity:1; } 50% { transform: scaleY(0.6); opacity:0.4; } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes spin { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
        @keyframes starPop { from { transform: scale(0) rotate(-30deg); opacity:0; } to { transform: scale(1) rotate(0deg); opacity:1; } }
        .animate-blink { animation: blink 1s step-end infinite; }
        * { cursor: none !important; }
      `}</style>
    </div>
  );
}
