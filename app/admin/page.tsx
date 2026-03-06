"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Submission {
    id: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    budget: string;
    message: string;
    createdAt: string;
    read: boolean;
}

function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return "just now";
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    return `${d}d ago`;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [subs, setSubs] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [authed, setAuthed] = useState(false);
    const [selected, setSelected] = useState<Submission | null>(null);
    const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
    const [search, setSearch] = useState("");
    const [deleting, setDeleting] = useState<string | null>(null);

    const fetchSubs = useCallback(async () => {
        const res = await fetch("/api/admin/submissions");
        if (res.status === 401) { router.push("/admin/login"); return; }
        const data = await res.json();
        setSubs(data.submissions || []);
        setAuthed(true);
        setLoading(false);
    }, [router]);

    useEffect(() => { fetchSubs(); }, [fetchSubs]);

    const markRead = async (id: string) => {
        await fetch("/api/admin/submissions", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        setSubs((s) => s.map((x) => x.id === id ? { ...x, read: true } : x));
    };

    const deleteSub = async (id: string) => {
        setDeleting(id);
        await fetch("/api/admin/submissions", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        setSubs((s) => s.filter((x) => x.id !== id));
        if (selected?.id === id) setSelected(null);
        setDeleting(null);
    };

    const logout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
    };

    const openSub = (s: Submission) => {
        setSelected(s);
        if (!s.read) markRead(s.id);
    };

    const filtered = subs.filter((s) => {
        if (filter === "unread" && s.read) return false;
        if (filter === "read" && !s.read) return false;
        if (search) {
            const q = search.toLowerCase();
            return s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.service.toLowerCase().includes(q);
        }
        return true;
    });

    const unread = subs.filter((x) => !x.read).length;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a111e" }}>
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                    <p className="text-gray-500 text-sm">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (!authed) return null;

    return (
        <div className="min-h-screen text-gray-300 flex flex-col" style={{ background: "#0a111e" }}>

            {/* ─── Top Nav ─── */}
            <header className="border-b border-white/6 px-6 py-4 flex items-center justify-between sticky top-16 z-40"
                style={{ background: "rgba(10,17,30,0.95)", backdropFilter: "blur(12px)" }}>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/15 border border-amber-400/25 flex items-center justify-center text-amber-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-white font-semibold text-sm leading-none">Admin Dashboard</p>
                        <p className="text-gray-600 text-xs mt-0.5">Sarwa Studio</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {unread > 0 && (
                        <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-400 text-[#111929] rounded-full">
                            {unread} new
                        </span>
                    )}
                    <Link href="/" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">← Site</Link>
                    <button onClick={logout}
                        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-400 border border-white/8 hover:border-red-400/30 px-3 py-1.5 rounded-lg transition-all">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            </header>

            {/* ─── Stats Bar ─── */}
            <div className="px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-white/5"
                style={{ background: "rgba(255,255,255,0.01)" }}>
                {[
                    { label: "Total Leads", value: subs.length, icon: "📬" },
                    { label: "Unread", value: unread, icon: "🔔", highlight: unread > 0 },
                    { label: "Read", value: subs.filter((x) => x.read).length, icon: "✓" },
                    { label: "Services", value: [...new Set(subs.map((x) => x.service))].length, icon: "🛠" },
                ].map((s) => (
                    <div key={s.label}
                        className={`rounded-xl border p-4 ${s.highlight ? "border-amber-400/25 bg-amber-400/5" : "border-white/6"}`}
                        style={!s.highlight ? { background: "rgba(255,255,255,0.02)" } : {}}>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-500">{s.label}</span>
                            <span className="text-base">{s.icon}</span>
                        </div>
                        <p className={`text-2xl font-bold ${s.highlight ? "text-amber-400" : "text-white"}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* ─── Main ─── */}
            <div className="flex flex-1 overflow-hidden">

                {/* List panel */}
                <div className={`flex flex-col border-r border-white/5 ${selected ? "hidden lg:flex w-96" : "flex flex-1 lg:w-96 lg:flex-none"}`}>

                    {/* Toolbar */}
                    <div className="p-4 space-y-3 border-b border-white/5">
                        {/* Search */}
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                value={search} onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name, email, service..."
                                className="w-full bg-white/4 border border-white/8 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-amber-400/40 transition-all"
                            />
                        </div>
                        {/* Filter pills */}
                        <div className="flex gap-2">
                            {(["all", "unread", "read"] as const).map((f) => (
                                <button key={f} onClick={() => setFilter(f)}
                                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-all ${filter === f ? "bg-amber-400 text-[#111929]" : "border border-white/8 text-gray-500 hover:border-amber-400/30 hover:text-gray-300"}`}>
                                    {f}
                                </button>
                            ))}
                            <span className="ml-auto text-xs text-gray-600 self-center">{filtered.length} total</span>
                        </div>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto">
                        {filtered.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center px-6">
                                <div className="text-4xl mb-3">📭</div>
                                <p className="text-gray-500 text-sm">No submissions found</p>
                            </div>
                        ) : (
                            filtered.map((s) => (
                                <button key={s.id} onClick={() => openSub(s)}
                                    className={`w-full text-left px-4 py-4 border-b border-white/4 hover:bg-white/3 transition-colors flex gap-3 items-start ${selected?.id === s.id ? "bg-amber-400/6 border-l-2 border-l-amber-400" : ""}`}>
                                    {/* Avatar */}
                                    <div className="w-9 h-9 rounded-full bg-amber-400/15 border border-amber-400/20 flex items-center justify-center text-amber-400 font-bold text-xs flex-shrink-0 mt-0.5">
                                        {s.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2 mb-0.5">
                                            <p className={`text-sm font-semibold truncate ${!s.read ? "text-white" : "text-gray-400"}`}>{s.name}</p>
                                            <span className="text-xs text-gray-600 flex-shrink-0">{timeAgo(s.createdAt)}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 truncate">{s.email}</p>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <span className="text-xs bg-white/5 border border-white/8 text-gray-500 px-2 py-0.5 rounded-full truncate max-w-[120px]">{s.service}</span>
                                            {!s.read && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />}
                                        </div>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Detail panel */}
                {selected ? (
                    <div className="flex-1 overflow-y-auto p-6 lg:p-8">
                        <div className="max-w-2xl mx-auto">
                            {/* Back (mobile) */}
                            <button onClick={() => setSelected(null)}
                                className="lg:hidden flex items-center gap-1.5 text-gray-500 hover:text-gray-300 text-sm mb-6 transition-colors">
                                ← Back
                            </button>

                            {/* Header */}
                            <div className="flex items-start justify-between gap-4 mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-amber-400/15 border border-amber-400/25 flex items-center justify-center text-amber-400 font-bold text-xl">
                                        {selected.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h2 className="text-white font-bold text-xl">{selected.name}</h2>
                                        <a href={`mailto:${selected.email}`} className="text-amber-400 text-sm hover:underline">{selected.email}</a>
                                    </div>
                                </div>
                                <button onClick={() => {
                                    if (confirm("Delete this submission?")) deleteSub(selected.id);
                                }}
                                    className="flex items-center gap-1.5 text-xs border border-red-400/25 text-red-400/70 hover:bg-red-400/10 hover:text-red-400 hover:border-red-400/40 px-3 py-1.5 rounded-lg transition-all"
                                    disabled={deleting === selected.id}>
                                    {deleting === selected.id
                                        ? <svg className="w-3.5 h-3.5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-25" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                        : <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>}
                                    Delete
                                </button>
                            </div>

                            {/* Meta grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                                {[
                                    { label: "Phone", value: selected.phone || "Not provided" },
                                    { label: "Service", value: selected.service },
                                    { label: "Budget", value: selected.budget },
                                    { label: "Submitted", value: new Date(selected.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) },
                                    { label: "Status", value: selected.read ? "Read" : "Unread" },
                                ].map((m) => (
                                    <div key={m.label} className="rounded-xl border border-white/6 px-4 py-3" style={{ background: "rgba(255,255,255,0.02)" }}>
                                        <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">{m.label}</p>
                                        <p className="text-white text-sm font-medium">{m.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Message */}
                            <div className="rounded-xl border border-white/6 p-5 mb-6" style={{ background: "rgba(255,255,255,0.02)" }}>
                                <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">Message</p>
                                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-3">
                                <a href={`mailto:${selected.email}`}
                                    className="group inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#111929] font-semibold px-5 py-2.5 rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-amber-500/20">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    Reply via Email
                                </a>
                                {selected.phone && (
                                    <a href={`tel:${selected.phone}`}
                                        className="inline-flex items-center gap-2 border border-white/8 text-gray-300 hover:border-amber-400/30 hover:text-amber-400 px-5 py-2.5 rounded-xl text-sm transition-all">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                        Call
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="hidden lg:flex flex-1 items-center justify-center text-center">
                        <div>
                            <div className="text-6xl mb-4">📩</div>
                            <p className="text-gray-500">Select a submission to view details</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
