"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const router = useRouter();
    const [form, setForm] = useState({ username: "", password: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
    const [error, setError] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [attempts, setAttempts] = useState(0);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (attempts >= 5) {
            setError("Too many failed attempts. Please wait 5 minutes.");
            return;
        }
        setStatus("loading");
        setError("");
        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) {
                setAttempts((a) => a + 1);
                setError(data.error || "Invalid credentials.");
                setStatus("error");
                return;
            }
            router.push("/admin");
        } catch {
            setError("Network error. Please try again.");
            setStatus("error");
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{ background: "linear-gradient(135deg, #0a111e 0%, #111929 60%, #192940 100%)" }}
        >
            {/* Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-[140px]" />
                <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-blue-600/6 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Lock icon */}
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
                    <p className="text-gray-500 text-sm">Sarwa Studio — Secure Dashboard</p>
                </div>

                <form onSubmit={submit}
                    className="rounded-2xl border border-white/8 p-8 space-y-5"
                    style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)" }}>

                    {/* Username */}
                    <div>
                        <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Username</label>
                        <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>
                            <input
                                type="text" autoComplete="username" required
                                value={form.username} onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                                placeholder="admin"
                                className="w-full bg-white/4 border border-white/8 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber-400/50 transition-all"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Password</label>
                        <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>
                            <input
                                type={showPw ? "text" : "password"} autoComplete="current-password" required
                                value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                                placeholder="••••••••"
                                className="w-full bg-white/4 border border-white/8 rounded-xl pl-10 pr-11 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber-400/50 transition-all"
                            />
                            <button type="button" onClick={() => setShowPw((v) => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                                {showPw
                                    ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                    : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                            </button>
                        </div>
                    </div>

                    {/* Error */}
                    {status === "error" && (
                        <div className="flex items-center gap-3 rounded-xl border border-red-500/25 bg-red-500/8 px-4 py-3">
                            <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Attempt warning */}
                    {attempts > 0 && attempts < 5 && (
                        <p className="text-amber-400/70 text-xs text-center">{5 - attempts} attempt{5 - attempts !== 1 ? "s" : ""} remaining</p>
                    )}

                    <button type="submit" disabled={status === "loading" || attempts >= 5}
                        className="group w-full relative overflow-hidden inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#111929] font-bold px-8 py-3.5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                        <span className="absolute inset-0 bg-gradient-to-r from-amber-300/0 via-white/20 to-amber-300/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        {status === "loading"
                            ? <><svg className="w-4 h-4 animate-spin mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>Verifying...</>
                            : "Sign In to Dashboard"}
                    </button>
                </form>

                <p className="text-center text-gray-600 text-xs mt-6">
                    Sarwa Studio Admin Portal · Protected Access Only
                </p>
            </div>
        </div>
    );
}
