"use client";

import { useState } from "react";
import Link from "next/link";

const services = [
    "Web Development",
    "3D Animation",
    "Video Editing",
    "Software Solutions",
    "Graphic Design",
    "Digital Solutions",
    "Other",
];

const budgets = [
    "Under $500",
    "$500 – $1,000",
    "$1,000 – $5,000",
    "$5,000 – $10,000",
    "$10,000+",
    "Let's discuss",
];

function Reveal({ children, delay = 0, className = "", dir = "up" }: { children: React.ReactNode; delay?: number; className?: string; dir?: "up" | "left" | "right" | "scale" }) {
    return (
        <div
            className={`opacity-0 animate-fadeUp ${className}`}
            style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
        >
            {children}
        </div>
    );
}

export default function ContactPage() {
    const [form, setForm] = useState({
        name: "", email: "", phone: "", service: "", budget: "", message: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        setErrorMsg("");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) { setErrorMsg(data.error || "Something went wrong."); setStatus("error"); return; }
            setStatus("sent");
            setForm({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
        } catch {
            setErrorMsg("Network error. Please try again.");
            setStatus("error");
        }
    };

    return (
        <div
            className="min-h-screen text-gray-300"
            style={{ background: "linear-gradient(135deg, #0a111e 0%, #111929 60%, #192940 100%)" }}
        >
            {/* Hero */}
            <div className="relative overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-800/8 rounded-full blur-[100px]" />
                    {/* Grid */}
                    <div className="absolute inset-0 opacity-[0.025]"
                        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "70px 70px" }} />
                </div>
                <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
                    <Reveal>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
                            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-amber-400">Contact</span>
                        </div>
                    </Reveal>
                    <Reveal delay={80}>
                        <div className="w-12 h-0.5 bg-amber-400 mb-5" />
                    </Reveal>
                    <Reveal delay={150}>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
                            Let's Build Something<br />
                            <span className="text-amber-400">Amazing Together</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={220}>
                        <p className="text-gray-400 text-lg max-w-xl mt-4">
                            Tell us about your project. We'll get back to you within 24 hours with a tailored proposal.
                        </p>
                    </Reveal>
                </div>
            </div>

            {/* Body */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-12">

                {/* ─── Left: Info ─── */}
                <Reveal dir="left" className="space-y-8">
                    {/* Cards */}
                    {[
                        {
                            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                            label: "Email Us",
                            value: "vv797538@gmail.com",
                            href: "mailto:vv797538@gmail.com",
                        },
                        {
                            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
                            label: "Call / WhatsApp",
                            value: "+91 79753 80000",
                            href: "tel:+917975380000",
                        },
                        {
                            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                            label: "Location",
                            value: "India — Remote Worldwide",
                            href: null,
                        },
                    ].map((c, i) => (
                        <div key={i}
                            className="flex items-start gap-4 rounded-2xl border border-white/8 p-5 group hover:border-amber-400/25 transition-all duration-300"
                            style={{ background: "rgba(255,255,255,0.02)" }}>
                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-400/15 transition-colors">
                                {c.icon}
                            </div>
                            <div>
                                <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">{c.label}</p>
                                {c.href
                                    ? <a href={c.href} className="text-white font-medium hover:text-amber-400 transition-colors text-sm">{c.value}</a>
                                    : <p className="text-white font-medium text-sm">{c.value}</p>}
                            </div>
                        </div>
                    ))}

                    {/* Social links */}
                    <div className="rounded-2xl border border-white/8 p-5" style={{ background: "rgba(255,255,255,0.02)" }}>
                        <p className="text-xs text-gray-600 uppercase tracking-widest mb-4">Follow Us</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: "Instagram", href: "#" },
                                { label: "LinkedIn", href: "#" },
                                { label: "Twitter", href: "#" },
                                { label: "Behance", href: "#" },
                            ].map((s) => (
                                <a key={s.label} href={s.href}
                                    className="text-xs font-medium text-gray-500 border border-white/8 hover:border-amber-400/30 hover:text-amber-400 px-3 py-1.5 rounded-full transition-all">
                                    {s.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Typical response time */}
                    <div className="rounded-2xl border border-amber-400/15 p-5"
                        style={{ background: "rgba(251,191,36,0.04)" }}>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <p className="text-green-400 text-xs font-semibold uppercase tracking-widest">Typically replies within</p>
                        </div>
                        <p className="text-white font-bold text-2xl">24 Hours</p>
                        <p className="text-gray-500 text-xs mt-1">Mon – Sat, 10am – 8pm IST</p>
                    </div>
                </Reveal>

                {/* ─── Right: Form ─── */}
                <Reveal delay={100} className="lg:col-span-2">
                    {status === "sent" ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-16 rounded-2xl border border-amber-400/20"
                            style={{ background: "rgba(251,191,36,0.04)" }}>
                            <div className="w-16 h-16 rounded-full bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 text-2xl mb-5">✓</div>
                            <h2 className="text-2xl font-bold text-white mb-2">Message Sent!</h2>
                            <p className="text-gray-400 max-w-sm">
                                Thanks for reaching out. We'll review your message and get back to you within 24 hours.
                            </p>
                            <button onClick={() => setStatus("idle")}
                                className="mt-8 border border-amber-400/30 text-amber-400 hover:bg-amber-400/10 px-6 py-2.5 rounded-full text-sm font-medium transition-all">
                                Send Another
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={submit}
                            className="rounded-2xl border border-white/8 p-8 md:p-10 space-y-6"
                            style={{ background: "rgba(255,255,255,0.02)" }}>
                            <h2 className="text-white font-bold text-xl mb-2">
                                Tell us about your project
                            </h2>

                            {/* Name + Email */}
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Your Name *</label>
                                    <input
                                        value={form.name} onChange={(e) => set("name", e.target.value)} required
                                        placeholder="John Doe"
                                        className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber-400/50 focus:bg-white/6 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Email Address *</label>
                                    <input
                                        type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required
                                        placeholder="john@example.com"
                                        className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber-400/50 focus:bg-white/6 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Phone / WhatsApp</label>
                                <input
                                    value={form.phone} onChange={(e) => set("phone", e.target.value)}
                                    placeholder="+91 98765 43210"
                                    className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber-400/50 focus:bg-white/6 transition-all"
                                />
                            </div>

                            {/* Service + Budget */}
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Service Needed</label>
                                    <select
                                        value={form.service} onChange={(e) => set("service", e.target.value)}
                                        className="w-full bg-[#111929] border border-white/8 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400/50 transition-all appearance-none"
                                        style={{ color: form.service ? "#fff" : "#4b5563" }}
                                    >
                                        <option value="" style={{ color: "#4b5563" }}>Select a service</option>
                                        {services.map((s) => <option key={s} value={s} style={{ color: "#fff" }}>{s}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Budget Range</label>
                                    <select
                                        value={form.budget} onChange={(e) => set("budget", e.target.value)}
                                        className="w-full bg-[#111929] border border-white/8 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400/50 transition-all appearance-none"
                                        style={{ color: form.budget ? "#fff" : "#4b5563" }}
                                    >
                                        <option value="" style={{ color: "#4b5563" }}>Select a range</option>
                                        {budgets.map((b) => <option key={b} value={b} style={{ color: "#fff" }}>{b}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Your Message *</label>
                                <textarea
                                    rows={5} value={form.message} onChange={(e) => set("message", e.target.value)} required
                                    placeholder="Tell us about your project, goals, timeline or anything else you'd like us to know..."
                                    className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber-400/50 focus:bg-white/6 transition-all resize-none"
                                />
                            </div>

                            {/* Error */}
                            {status === "error" && (
                                <div className="rounded-xl border border-red-500/30 bg-red-500/8 px-4 py-3 text-red-400 text-sm">
                                    {errorMsg}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit" disabled={status === "sending"}
                                className="group w-full relative overflow-hidden inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#111929] font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-amber-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-amber-300/0 via-white/20 to-amber-300/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                {status === "sending" ? (
                                    <>
                                        <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </>
                                )}
                            </button>

                            <p className="text-center text-gray-600 text-xs">
                                By submitting, you agree to our{" "}
                                <Link href="/privacy-policy" className="text-amber-400/70 hover:text-amber-400 transition-colors">Privacy Policy</Link>
                            </p>
                        </form>
                    )}
                </Reveal>
            </div>


        </div>
    );
}
