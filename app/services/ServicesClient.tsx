"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const services = [
    {
        id: "web-dev",
        title: "Web Development",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
        tagline: "Fast, scalable, and beautiful websites tailored to your brand.",
        description:
            "We craft high-performance websites and web applications using the latest technologies. From sleek landing pages to complex e-commerce platforms, we deliver pixel-perfect, SEO-optimized digital experiences that convert visitors into customers. Every line of code we write is intentional, clean, and built to scale.",
        features: [
            "Custom Website Design & Development",
            "E-Commerce Solutions (Shopify, WooCommerce)",
            "CMS Integration (WordPress, Strapi, Contentful)",
            "SEO & Performance Optimization",
            "Responsive & Mobile-First Design",
            "API Development & Third-Party Integration",
        ],
        tools: ["React", "Next.js", "Node.js", "TypeScript", "WordPress", "Shopify"],
    },
    {
        id: "3d-animation",
        title: "3D Animation",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
        ),
        tagline: "Stunning 3D visuals that bring your ideas to life.",
        description:
            "Our 3D animation team creates breathtaking visuals for product showcases, architectural walkthroughs, explainer videos, and immersive brand experiences. We transform complex ideas into compelling 3D narratives that captivate audiences across all platforms — from social media to broadcast television.",
        features: [
            "Product 3D Visualization & Rendering",
            "Architectural Walkthroughs & Fly-throughs",
            "Character Animation & Rigging",
            "Motion Graphics & VFX",
            "3D Logo & Brand Animation",
            "Immersive AR/VR Experiences",
        ],
        tools: ["Blender", "Cinema 4D", "After Effects", "Unreal Engine", "Maya", "ZBrush"],
    },
    {
        id: "video-editing",
        title: "Video Editing",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        ),
        tagline: "Professional edits that tell your story with impact.",
        description:
            "From raw footage to polished productions — we handle it all. Our video editors craft compelling narratives for YouTube, social media, advertisements, corporate videos, and film productions. Color grading, sound design, motion text, transitions — every detail is handled with care to make your content shine.",
        features: [
            "Corporate & Brand Video Production",
            "YouTube & Social Media Content Editing",
            "Reels, Shorts & Ad Creative Edits",
            "Professional Color Grading",
            "Sound Design & Audio Mixing",
            "Promotional & Event Videos",
        ],
        tools: ["Premiere Pro", "DaVinci Resolve", "After Effects", "Final Cut Pro", "Audition"],
    },
    {
        id: "software",
        title: "Software Solutions",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
            </svg>
        ),
        tagline: "Custom software built to solve your unique business challenges.",
        description:
            "We build robust, scalable software solutions tailored to your business needs. Whether it's a SaaS platform, internal business tool, or mobile app — we architect, develop, and deploy software that drives efficiency and growth. Our engineers focus on clean code, long-term maintainability, and real-world performance.",
        features: [
            "Custom Web & Mobile App Development",
            "SaaS Platform Development",
            "Business Automation & Workflow Tools",
            "ERP, CRM & Management Systems",
            "Cloud Deployment & DevOps",
            "Ongoing Maintenance & Support",
        ],
        tools: ["Python", "Django", "React Native", "Flutter", "AWS", "PostgreSQL"],
    },
    {
        id: "graphic-design",
        title: "Graphic Design",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        tagline: "Visual identities that make your brand unforgettable.",
        description:
            "Great design communicates. We create striking visual identities, marketing materials, UI/UX designs, and brand assets that leave a lasting impression and build deep trust with your audience. Every design decision is grounded in strategy — not just aesthetics — to ensure your brand stands out in a crowded market.",
        features: [
            "Logo & Complete Brand Identity Design",
            "Social Media Design & Content Templates",
            "Print & Marketing Collateral",
            "UI/UX Design & Interactive Prototypes",
            "Packaging & Product Design",
            "Infographics & Custom Illustrations",
        ],
        tools: ["Figma", "Adobe Illustrator", "Photoshop", "InDesign", "Canva Pro"],
    },
    {
        id: "digital-solutions",
        title: "Digital Solutions",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        tagline: "End-to-end digital strategies that grow your business online.",
        description:
            "We provide complete digital solutions — from strategy and branding to marketing and analytics. Whether you're starting fresh or scaling up, we help you build a powerful digital presence that drives real, measurable results. Our team works as an extension of yours, invested in your long-term growth.",
        features: [
            "Digital Marketing Strategy & Consulting",
            "Search Engine Optimization (SEO)",
            "Social Media Management & Growth",
            "Email Marketing Campaigns",
            "Data Analytics & Performance Reporting",
            "Brand Strategy & Positioning",
        ],
        tools: ["Google Analytics", "Meta Ads", "Mailchimp", "SEMrush", "HubSpot", "Ahrefs"],
    },
];

export default function ServicesPage() {
    const [activeSection, setActiveSection] = useState("web-dev");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: "-30% 0px -60% 0px" }
        );
        services.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observerRef.current?.observe(el);
        });
        return () => observerRef.current?.disconnect();
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setSidebarOpen(false);
    };

    return (
        <div
            className="min-h-screen text-gray-300"
            style={{ background: "linear-gradient(135deg, #0a111e 0%, #111929 60%, #192940 100%)" }}
        >

            {/* ── Hero Banner ── */}
            <div className="relative overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-800/10 rounded-full blur-[100px]" />
                </div>
                <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                        <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-amber-400">Services</span>
                    </div>
                    {/* Amber bar */}
                    <div className="w-12 h-0.5 bg-amber-400 mb-6" />
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
                        Our Services
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mt-4">
                        From pixels to products — we deliver{" "}
                        <span className="text-amber-400 font-medium">end-to-end creative</span> and
                        technical solutions that elevate your brand.
                    </p>
                </div>
            </div>

            {/* ── Body: Sidebar + Content ── */}
            <div className="max-w-7xl mx-auto px-6 py-12 flex gap-10 relative">

                {/* Mobile toggle */}
                <button
                    className="fixed bottom-6 right-6 z-50 md:hidden flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#111929] font-semibold px-4 py-3 rounded-full shadow-lg shadow-amber-900/30 transition-all"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    Services
                </button>

                {/* ── Sidebar ── */}
                <aside
                    className={`
            fixed md:sticky top-0 md:top-24 left-0 h-full md:h-fit w-72 md:w-64 z-40
            md:bg-transparent backdrop-blur-xl md:backdrop-blur-none
            border-r border-white/10 md:border-0
            transition-transform duration-300 overflow-y-auto md:overflow-visible
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            pt-16 md:pt-0 px-4 md:px-0
          `}
                    style={{ background: sidebarOpen ? "rgba(13,21,32,0.97)" : undefined }}
                >
                    <button
                        className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-white"
                        onClick={() => setSidebarOpen(false)}
                    >✕</button>

                    <div className="sticky top-24">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-4 px-3">
                            <div className="w-1 h-5 bg-amber-400 rounded-full" />
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                                Our Services
                            </p>
                        </div>

                        <nav className="space-y-1">
                            {services.map(({ id, title, icon }) => (
                                <button
                                    key={id}
                                    onClick={() => scrollTo(id)}
                                    className={`
                    w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center gap-3
                    ${activeSection === id
                                            ? "bg-amber-400/10 text-amber-400 border-l-2 border-amber-400 pl-[10px] font-medium"
                                            : "text-gray-500 hover:text-gray-200 hover:bg-white/5"}
                  `}
                                >
                                    <span className={activeSection === id ? "text-amber-400" : "text-gray-600"}>
                                        {icon}
                                    </span>
                                    {title}
                                </button>
                            ))}
                        </nav>

                        {/* CTA in sidebar */}
                        <div className="mt-8 px-3">
                            <div className="rounded-xl border border-amber-400/20 p-4 text-center"
                                style={{ background: "rgba(251,191,36,0.05)" }}>
                                <p className="text-gray-400 text-xs mb-3 leading-relaxed">
                                    Ready to work together?
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-block w-full bg-amber-400 hover:bg-amber-300 text-[#111929] font-semibold text-xs px-4 py-2.5 rounded-lg transition-all text-center"
                                >
                                    Get a Free Quote
                                </Link>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* ── Main Content ── */}
                <main className="flex-1 min-w-0 space-y-16">
                    {services.map((service, index) => (
                        <section key={service.id} id={service.id} className="scroll-mt-24">

                            {/* Section header */}
                            <div className="flex items-start gap-4 mb-6">
                                <div
                                    className="flex-shrink-0 w-12 h-12 rounded-xl border border-amber-400/20 flex items-center justify-center text-amber-400"
                                    style={{ background: "rgba(251,191,36,0.08)" }}
                                >
                                    {service.icon}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-xs font-semibold text-amber-400/60 uppercase tracking-widest">
                                            0{index + 1}
                                        </span>
                                        <div className="h-px w-6 bg-amber-400/30" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                                        {service.title}
                                    </h2>
                                    <p className="text-amber-400 text-sm mt-1">{service.tagline}</p>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-400 leading-relaxed mb-8">
                                {service.description}
                            </p>

                            {/* Features + Tools grid */}
                            <div className="grid md:grid-cols-2 gap-6">

                                {/* What's included */}
                                <div
                                    className="rounded-xl border border-white/8 p-6"
                                    style={{ background: "rgba(255,255,255,0.02)" }}
                                >
                                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                        <div className="w-1 h-4 bg-amber-400 rounded-full" />
                                        What's Included
                                    </h3>
                                    <ul className="space-y-3">
                                        {service.features.map((f, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                                                <span className="mt-1.5 w-1.5 h-1.5 flex-shrink-0 rounded-full bg-amber-400" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Tools / stack */}
                                <div
                                    className="rounded-xl border border-white/8 p-6"
                                    style={{ background: "rgba(255,255,255,0.02)" }}
                                >
                                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                        <div className="w-1 h-4 bg-amber-400 rounded-full" />
                                        Tools & Technologies
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {service.tools.map((tool, i) => (
                                            <span
                                                key={i}
                                                className="text-xs font-medium text-amber-400 border border-amber-400/20 px-3 py-1.5 rounded-full"
                                                style={{ background: "rgba(251,191,36,0.06)" }}
                                            >
                                                {tool}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Quote link */}
                                    <Link
                                        href="/contact"
                                        className="mt-6 inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
                                    >
                                        Get a quote for this service
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            {/* Divider between sections */}
                            {index < services.length - 1 && (
                                <div className="mt-16 border-t border-white/5" />
                            )}
                        </section>
                    ))}

                    {/* Bottom CTA */}
                    <div
                        className="rounded-2xl border border-amber-400/20 p-10 text-center mt-8"
                        style={{
                            background: "linear-gradient(135deg, rgba(251,191,36,0.07) 0%, rgba(25,41,64,0.6) 100%)",
                        }}
                    >
                        <div className="w-12 h-0.5 bg-amber-400 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-3">
                            Ready to Start Your Project?
                        </h3>
                        <p className="text-gray-400 mb-6 max-w-lg mx-auto">
                            Let's talk about your vision. Get a free consultation and custom quote from our team today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#111929] font-semibold px-7 py-3 rounded-full transition-all hover:shadow-lg hover:shadow-amber-900/30"
                            >
                                Contact Us
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <a
                                href="mailto:vv797538@gmail.com"
                                className="inline-flex items-center justify-center gap-2 border border-amber-400/30 text-amber-400 hover:border-amber-400 font-semibold px-7 py-3 rounded-full transition-all"
                            >
                                Send an Email
                            </a>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
