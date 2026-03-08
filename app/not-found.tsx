"use client";

import Link from "next/link";

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`opacity-0 animate-fadeUp ${className}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      {children}
    </div>
  );
}

export default function NotFound() {
  return (
    <div
      className="min-h-screen text-gray-300 flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #0a111e 0%, #111929 60%, #192940 100%)",
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-800/8 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <Reveal delay={0}>
          <div className="mb-6">
            <span className="inline-block text-7xl md:text-9xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              404
            </span>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Page Not Found
          </h1>
        </Reveal>

        <Reveal delay={300}>
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been
            moved or deleted. Let's get you back on track.
          </p>
        </Reveal>

        <Reveal delay={450}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-400/50 transition-all duration-300 transform hover:scale-105"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-gray-400 hover:text-gray-200 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </Reveal>

        {/* Additional Info */}
        <Reveal delay={600}>
          <div className="mt-16 pt-12 border-t border-white/10">
            <p className="text-sm text-gray-500 mb-6">Need help? Here are some useful links:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy-policy" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </div>


    </div>
  );
}
