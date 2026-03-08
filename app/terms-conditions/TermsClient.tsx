"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const sections = [
    { id: "acceptance", label: "Acceptance of Terms" },
    { id: "services", label: "Services & Scope of Work" },
    { id: "payment", label: "Payment Terms" },
    { id: "refund", label: "Refund Policy" },
    { id: "revisions", label: "Revisions & Changes" },
    { id: "timeline", label: "Project Timeline" },
    { id: "ip", label: "Intellectual Property" },
    { id: "confidentiality", label: "Confidentiality" },
    { id: "client-duties", label: "Client Responsibilities" },
    { id: "limitation", label: "Limitation of Liability" },
    { id: "termination", label: "Project Termination" },
    { id: "disputes", label: "Disputes & Governing Law" },
    { id: "changes", label: "Changes to These Terms" },
    { id: "contact", label: "Contact Us" },
];

function useActiveSection(ids: string[]) {
    const [active, setActive] = useState(ids[0]);
    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActive(id); },
                { rootMargin: "-30% 0px -60% 0px" }
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, [ids]);
    return active;
}

function Section({ id, num, title, children }: { id: string; num: string; title: string; children: React.ReactNode }) {
    return (
        <section id={id} className="scroll-mt-24 pb-12 border-b border-white/5 last:border-0">
            <div className="flex items-start gap-4 mb-4">
                <span className="text-xs font-bold text-amber-400/50 mt-1 w-8 shrink-0">{num}</span>
                <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
            </div>
            <div className="ml-12 text-gray-400 text-sm leading-7 space-y-3">{children}</div>
        </section>
    );
}

function Highlight({ children }: { children: React.ReactNode }) {
    return (
        <span className="text-amber-400 font-semibold">{children}</span>
    );
}

function Notice({ children, type = "warning" }: { children: React.ReactNode; type?: "warning" | "info" }) {
    return (
        <div className={`rounded-xl border px-4 py-3 ${type === "warning" ? "border-amber-400/25 bg-amber-400/5 text-amber-200" : "border-blue-400/20 bg-blue-400/5 text-blue-200"}`}>
            {children}
        </div>
    );
}

export default function TermsPage() {
    const ids = sections.map((s) => s.id);
    const active = useActiveSection(ids);
    const [mobileOpen, setMobileOpen] = useState(false);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setMobileOpen(false);
    };

    return (
        <div className="min-h-screen text-gray-300" style={{ background: "linear-gradient(135deg, #0a111e 0%, #111929 60%, #192940 100%)" }}>

            {/* ── Hero ── */}
            <div className="border-b border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-amber-400/5 rounded-full blur-[100px]" />
                    <div className="absolute inset-0 opacity-[0.025]"
                        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "70px 70px" }} />
                </div>
                <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-amber-400">Terms &amp; Conditions</span>
                    </div>
                    <div className="w-12 h-0.5 bg-amber-400 mb-5" />
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Terms &amp; Conditions</h1>
                    <p className="text-gray-400 max-w-xl text-base">
                        Please read these terms carefully before engaging Sarwa Studio for any services. By proceeding with a project, you agree to the terms outlined below.
                    </p>
                    <p className="mt-4 text-xs text-gray-600">Last updated: March 5, 2026</p>
                </div>
            </div>

            {/* ── Mobile sidebar toggle ── */}
            <div className="lg:hidden sticky top-16 z-30 border-b border-white/5 px-4 py-3"
                style={{ background: "rgba(10,17,30,0.95)", backdropFilter: "blur(12px)" }}>
                <button onClick={() => setMobileOpen(!mobileOpen)}
                    className="flex items-center gap-2 text-sm text-amber-400 font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    {mobileOpen ? "Close" : "Jump to section"}
                </button>
                {mobileOpen && (
                    <ul className="mt-3 space-y-2 pb-2">
                        {sections.map((s) => (
                            <li key={s.id}>
                                <button onClick={() => scrollTo(s.id)}
                                    className={`text-sm w-full text-left px-3 py-1.5 rounded-lg transition-colors ${active === s.id ? "text-amber-400 bg-amber-400/8" : "text-gray-500 hover:text-gray-300"}`}>
                                    {s.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* ── Body ── */}
            <div className="max-w-7xl mx-auto px-6 py-12 flex gap-10 relative">

                {/* Sidebar */}
                <aside className="hidden lg:block w-64 shrink-0">
                    <div className="sticky top-24">
                        <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-4">On This Page</p>
                        <ul className="space-y-1">
                            {sections.map((s) => (
                                <li key={s.id}>
                                    <button onClick={() => scrollTo(s.id)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-2 group ${active === s.id ? "text-amber-400 bg-amber-400/8 font-medium" : "text-gray-500 hover:text-gray-300 hover:bg-white/3"}`}>
                                        {active === s.id && <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />}
                                        {s.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 rounded-xl border border-amber-400/15 p-4" style={{ background: "rgba(251,191,36,0.04)" }}>
                            <p className="text-xs text-gray-500 mb-2">Questions about our terms?</p>
                            <a href="mailto:vv797538@gmail.com" className="text-amber-400 text-xs font-medium hover:underline">
                                Contact us →
                            </a>
                        </div>
                    </div>
                </aside>

                {/* Content */}
                <main className="flex-1 min-w-0 space-y-12">

                    <Section id="acceptance" num="01" title="Acceptance of Terms">
                        <p>
                            By contacting Sarwa Studio, placing an order, making a payment, or using any of our services,
                            you confirm that you have read, understood, and agree to be bound by these Terms &amp; Conditions.
                        </p>
                        <p>
                            These terms constitute a legally binding agreement between you <Highlight>("Client")</Highlight> and
                            Sarwa Studio <Highlight>("Studio," "we," "us")</Highlight>. If you do not agree, please do not engage our services.
                        </p>
                    </Section>

                    <Section id="services" num="02" title="Services & Scope of Work">
                        <p>
                            Sarwa Studio provides creative and technical services including, but not limited to:
                        </p>
                        <ul className="list-disc list-inside space-y-1.5 ml-2">
                            <li>Website & web application development</li>
                            <li>3D animation and motion graphics</li>
                            <li>Video editing and post-production</li>
                            <li>Software & SaaS development</li>
                            <li>Graphic design and brand identity</li>
                            <li>Digital marketing and SEO</li>
                        </ul>
                        <p>
                            The exact scope, deliverables, timeline, and pricing are agreed upon in writing before any project begins.
                            Any work outside the agreed scope will require a <Highlight>separate written agreement and additional payment</Highlight>.
                        </p>
                    </Section>

                    <Section id="payment" num="03" title="Payment Terms">
                        <Notice type="warning">
                            <strong>Important:</strong> Projects will not begin until the advance payment has been received and confirmed.
                        </Notice>
                        <p>
                            Our standard payment structure is as follows:
                        </p>
                        <div className="rounded-xl border border-white/8 overflow-hidden" style={{ background: "rgba(255,255,255,0.03)" }}>
                            <div className="grid grid-cols-3 text-xs uppercase tracking-widest text-gray-600 px-4 py-2 border-b border-white/5">
                                <span>Milestone</span><span>Amount</span><span>When Due</span>
                            </div>
                            {[
                                ["Project Kickoff", "30% of total", "Before work begins"],
                                ["Mid-Delivery / Review", "40% of total", "Upon milestone approval"],
                                ["Final Delivery", "30% of total", "Before final files are released"],
                            ].map(([m, a, w], i) => (
                                <div key={i} className="grid grid-cols-3 px-4 py-3 border-b border-white/5 last:border-0 text-sm">
                                    <span className="text-white font-medium">{m}</span>
                                    <span className="text-amber-400 font-semibold">{a}</span>
                                    <span>{w}</span>
                                </div>
                            ))}
                        </div>
                        <p>
                            All payments are accepted via <Highlight>bank transfer, UPI, or other agreed methods</Highlight>.
                            Receipts/invoices will be issued for every payment. Final deliverables (source files, login credentials, etc.)
                            will only be handed over upon receipt of the full outstanding balance.
                        </p>
                        <p>
                            For ongoing/retainer projects, monthly invoices are issued at the start of each billing cycle and
                            are due within <Highlight>7 calendar days</Highlight>.
                        </p>
                    </Section>

                    <Section id="refund" num="04" title="Refund Policy">
                        <Notice type="warning">
                            <strong>No refunds will be issued once the advance (kickoff) payment has been made and work has begun.</strong>
                        </Notice>
                        <p>
                            The <Highlight>30% advance payment is non-refundable</Highlight> in all circumstances, as it covers
                            the initial time investment, planning, research, and resources committed to your project.
                        </p>
                        <p>
                            Refunds may be considered <em>only</em> in the following exceptional cases:
                        </p>
                        <ul className="list-disc list-inside space-y-1.5 ml-2">
                            <li>Sarwa Studio is unable to deliver the agreed services due to internal reasons</li>
                            <li>A written mutual agreement is reached before <strong>any</strong> work has commenced</li>
                        </ul>
                        <p>
                            Partial refunds for mid-project cancellations may be evaluated on a case-by-case basis, accounting
                            for work already completed. The Studio reserves the right to make the final determination.
                        </p>
                        <Notice type="info">
                            If you are unsatisfied with deliverables, we strongly encourage raising concerns during the
                            revision phase rather than requesting a refund, as we are committed to client satisfaction.
                        </Notice>
                    </Section>

                    <Section id="revisions" num="05" title="Revisions & Changes">
                        <p>
                            Every project includes a <Highlight>set number of revision rounds</Highlight> as specified in the project proposal.
                        </p>
                        <ul className="list-disc list-inside space-y-1.5 ml-2">
                            <li>Standard projects include <Highlight>2–3 revision rounds</Highlight> per deliverable</li>
                            <li>Revisions must be requested within <Highlight>7 days</Highlight> of receiving the deliverable</li>
                            <li>Revisions beyond the agreed rounds are billed at our standard hourly rate</li>
                            <li>Significant scope changes mid-project require a revised quote and timeline</li>
                        </ul>
                        <p>
                            A "revision" refers to minor adjustments (text, colour, layout tweaks). A complete redesign or
                            directional change is considered new work and will be quoted separately.
                        </p>
                    </Section>

                    <Section id="timeline" num="06" title="Project Timeline">
                        <p>
                            An estimated timeline is provided before the project begins. Timelines are subject to:
                        </p>
                        <ul className="list-disc list-inside space-y-1.5 ml-2">
                            <li>Timely payment of all milestone amounts</li>
                            <li>Prompt client feedback and approvals (response within 3–5 business days)</li>
                            <li>Availability of required content, assets, and access credentials from the client</li>
                        </ul>
                        <p>
                            Sarwa Studio is not liable for delays caused by the client's failure to provide approvals, content, or payments on time.
                            Delays caused by our team will be communicated proactively with a revised timeline.
                        </p>
                    </Section>

                    <Section id="ip" num="07" title="Intellectual Property">
                        <p>
                            Upon receipt of <Highlight>full and final payment</Highlight>, all rights to the completed deliverables
                            (designs, code, videos, etc.) are transferred to the client for the agreed use.
                        </p>
                        <p>
                            Until final payment is received, all work remains the exclusive intellectual property of Sarwa Studio.
                        </p>
                        <p>
                            Sarwa Studio reserves the right to display completed work in its portfolio, case studies, and
                            marketing materials unless explicitly agreed otherwise in writing.
                        </p>
                        <Notice type="info">
                            Third-party assets (stock photos, fonts, plugins, libraries) are subject to their own licences.
                            The client is responsible for ensuring compliance with relevant third-party licence terms.
                        </Notice>
                    </Section>

                    <Section id="confidentiality" num="08" title="Confidentiality">
                        <p>
                            Both parties agree to keep confidential any proprietary information, trade secrets, or sensitive
                            business data disclosed during the project. This obligation survives the termination of the agreement.
                        </p>
                        <p>
                            Sarwa Studio will not share your project details, business information, or data with any third party
                            without your explicit written consent, except where required by law.
                        </p>
                    </Section>

                    <Section id="client-duties" num="09" title="Client Responsibilities">
                        <p>The Client agrees to:</p>
                        <ul className="list-disc list-inside space-y-1.5 ml-2">
                            <li>Provide complete, accurate, and timely briefs, content, and feedback</li>
                            <li>Designate a single point of contact for approvals and communication</li>
                            <li>Make payments in accordance with the agreed schedule</li>
                            <li>Not share, resell, or redistribute deliverables before full payment is made</li>
                            <li>Ensure any content provided does not infringe on third-party rights</li>
                        </ul>
                        <p>Failure to fulfil these responsibilities may result in project delays or suspension without liability to Sarwa Studio.</p>
                    </Section>

                    <Section id="limitation" num="10" title="Limitation of Liability">
                        <p>
                            Sarwa Studio's total liability in connection with any project shall not exceed the
                            <Highlight> total amount paid by the Client</Highlight> for that specific project.
                        </p>
                        <p>
                            We are not liable for indirect, incidental, or consequential damages including but not limited to
                            loss of revenue, loss of data, or business interruption, even if advised of the possibility of such damages.
                        </p>
                        <p>
                            The Client is solely responsible for backing up their data and any existing systems before
                            any development or integration work begins.
                        </p>
                    </Section>

                    <Section id="termination" num="11" title="Project Termination">
                        <p>
                            Either party may terminate a project by providing <Highlight>written notice of 7 business days</Highlight>.
                        </p>
                        <p>
                            Upon termination by the Client:
                        </p>
                        <ul className="list-disc list-inside space-y-1.5 ml-2">
                            <li>All work completed up to the termination date will be invoiced at the agreed rate</li>
                            <li>The 30% advance is non-refundable</li>
                            <li>Any outstanding invoices must be settled within 7 days of the termination notice</li>
                            <li>Partially completed deliverables remain the property of Sarwa Studio until all dues are cleared</li>
                        </ul>
                        <p>
                            Sarwa Studio reserves the right to terminate a project immediately if the Client engages in abusive,
                            illegal, or unethical behaviour.
                        </p>
                    </Section>

                    <Section id="disputes" num="12" title="Disputes & Governing Law">
                        <p>
                            In the event of a dispute, both parties agree to first attempt resolution through
                            <Highlight> good-faith negotiation</Highlight> within 30 days of the dispute arising.
                        </p>
                        <p>
                            If unresolved, the dispute will be subject to the jurisdiction of the courts of
                            <Highlight> India</Highlight>, and governed by the laws of India.
                        </p>
                    </Section>

                    <Section id="changes" num="13" title="Changes to These Terms">
                        <p>
                            Sarwa Studio reserves the right to update these Terms &amp; Conditions at any time.
                            Updated terms will be published on this page with a revised "Last updated" date.
                        </p>
                        <p>
                            Continued engagement with our services after updates are published constitutes acceptance of the new terms.
                            We encourage clients to review this page periodically.
                        </p>
                    </Section>

                    <Section id="contact" num="14" title="Contact Us">
                        <p>
                            If you have any questions about these Terms &amp; Conditions, please reach out to us:
                        </p>
                        <div className="rounded-xl border border-white/8 p-5 space-y-3" style={{ background: "rgba(255,255,255,0.02)" }}>
                            <div className="flex items-center gap-3">
                                <span className="text-amber-400">📧</span>
                                <a href="mailto:vv797538@gmail.com" className="text-white hover:text-amber-400 transition-colors font-medium">
                                    vv797538@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-amber-400">📱</span>
                                <a href="tel:+916353935976" className="text-white hover:text-amber-400 transition-colors font-medium">
                                    +91 63539 35976
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-amber-400">📍</span>
                                <span className="text-gray-400">India — Remote Worldwide</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-4">
                            <Link href="/privacy-policy" className="border border-white/8 text-gray-400 hover:border-amber-400/30 hover:text-amber-400 px-4 py-2 rounded-lg text-sm transition-all">
                                Privacy Policy
                            </Link>
                            <Link href="/contact" className="bg-amber-400 hover:bg-amber-300 text-[#111929] font-semibold px-4 py-2 rounded-lg text-sm transition-all">
                                Get in Touch →
                            </Link>
                        </div>
                    </Section>

                </main>
            </div>
        </div>
    );
}
