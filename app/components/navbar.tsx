"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav
            className="sticky top-0 z-50 w-full border-b border-white/5"
            style={{ background: "linear-gradient(90deg, #0d1520 0%, #111929 50%, #192940 100%)" }}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Logo */}
                <Link href="/">
                    <Image
                        className="brightness-0 invert"
                        src="/images/sarwa-studio.svg"
                        alt="Sarwa Studio"
                        width={200}
                        height={40}
                        priority
                    />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-8 text-gray-300 font-medium items-center">
                    <Link
                        href="/services"
                        className="hover:text-amber-400 transition-colors duration-200"
                    >
                        Services
                    </Link>
                    <Link
                        href="/about"
                        className="hover:text-amber-400 transition-colors duration-200"
                    >
                        About
                    </Link>
                    <Link
                        href="/blogs"
                        className="hover:text-amber-400 transition-colors duration-200"
                    >
                        Blogs
                    </Link>
                    <Link
                        href="/contact"
                        className="border border-amber-400 text-amber-400 font-semibold px-4 py-2 rounded-md hover:bg-amber-400 hover:text-[#111929] transition-all duration-200"
                    >
                        Contact
                    </Link>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden text-gray-300 hover:text-amber-400 transition-colors"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div
                    className="md:hidden px-6 pb-6 pt-2 space-y-4 border-t border-white/5"
                    style={{ background: "#111929" }}
                >
                    {[
                        { name: "Services", href: "/services" },
                        { name: "About", href: "/about" },
                        { name: "Blogs", href: "/blogs" },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 text-gray-300 hover:text-amber-400 transition-colors py-1"
                            onClick={() => setMenuOpen(false)}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="inline-block border border-amber-400 text-amber-400 font-semibold px-4 py-2 rounded-md hover:bg-amber-400 hover:text-[#111929] transition-all duration-200"
                        onClick={() => setMenuOpen(false)}
                    >
                        Contact
                    </Link>
                </div>
            )}
        </nav>
    );
}