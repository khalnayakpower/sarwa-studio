"use client";

import { useState, useEffect, useRef } from "react";

const sections = [
    { id: "intro", title: "Privacy Policy" },
    { id: "scope", title: "1. Scope and Consent" },
    { id: "personal-info", title: "2. Personal Information" },
    { id: "info-collect", title: "3. Information We Collect" },
    { id: "info-you-give", title: "4. Information You Give Us" },
    { id: "technical", title: "5. Technical Management" },
    { id: "cookies", title: "6. Cookie and Its Usage" },
    { id: "third-party-sources", title: "7. Info From Other Sources" },
    { id: "use-retention", title: "8. Use and Retention" },
    { id: "disclosure", title: "9. Disclosure" },
    { id: "choices", title: "10. Choices" },
    { id: "access", title: "11. Access Rights" },
    { id: "contact", title: "12. Contact Information" },
    { id: "optout", title: "13. Opt-Out & Unsubscribe" },
    { id: "security", title: "14. Security Measures" },
    { id: "children", title: "15. Children's Privacy" },
    { id: "third-party", title: "16. Third Party Practices" },
    { id: "grievance", title: "17. Grievance Officer" },
    { id: "changes", title: "18. Changes to Policy" },
    { id: "disclaimer", title: "19. Disclaimer" },
];

export default function PrivacyPolicy() {
    const [activeSection, setActiveSection] = useState("intro");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-30% 0px -60% 0px" }
        );

        sections.forEach(({ id }) => {
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
        <div className="min-h-screen bg-gradient-to-br from-[#0d1520] via-[#111929] to-[#0d1520] text-gray-300">

            {/* Hero Banner */}
            <div className="relative overflow-hidden border-b border-white/5"
                style={{ background: "linear-gradient(135deg, #0a111e 0%, #111929 50%, #192940 100%)" }}
            >
                {/* Ambient glow accents */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-800/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                        <span>Home</span>
                        <span>/</span>
                        <span className="text-amber-400">Privacy Policy</span>
                    </div>

                    {/* Amber accent bar */}
                    <div className="w-12 h-0.5 bg-amber-400 mb-6" />

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-400 text-lg mt-4">
                        Last Updated On:{" "}
                        <span className="text-amber-400 font-medium">5th March 2025</span>
                    </p>
                    <p className="text-gray-500 mt-3 max-w-2xl leading-relaxed">
                        Protecting your privacy is at the very core of our ethos at Sarwa
                        Studio. Please take a moment to read our Privacy Policy.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 flex gap-10 relative">

                {/* Mobile sidebar toggle */}
                <button
                    className="fixed bottom-6 right-6 z-50 md:hidden flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#111929] font-semibold px-4 py-3 rounded-full shadow-lg shadow-amber-900/30 transition-all"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    Contents
                </button>

                {/* Sidebar */}
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
                    {/* Mobile close */}
                    <button
                        className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-white"
                        onClick={() => setSidebarOpen(false)}
                    >
                        ✕
                    </button>

                    <div className="sticky top-24">
                        {/* Accent bar header */}
                        <div className="flex items-center gap-3 mb-4 px-3">
                            <div className="w-1 h-5 bg-amber-400 rounded-full" />
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                                On This Page
                            </p>
                        </div>

                        <nav className="space-y-0.5">
                            {sections.map(({ id, title }) => (
                                <button
                                    key={id}
                                    onClick={() => scrollTo(id)}
                                    className={`
                    w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200
                    ${activeSection === id
                                            ? "bg-amber-400/10 text-amber-400 border-l-2 border-amber-400 pl-[10px] font-medium"
                                            : "text-gray-500 hover:text-gray-200 hover:bg-white/5"
                                        }
                  `}
                                >
                                    {title}
                                </button>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0 space-y-12">

                    {/* Intro */}
                    <section id="intro" className="scroll-mt-24">
                        <div className="text-gray-400 leading-relaxed space-y-4">
                            <p>
                                Privacy is a fundamental right of every individual. At{" "}
                                <span className="text-amber-400 font-semibold">Sarwa Studio</span>,
                                we always strive to protect your privacy. We take privacy very
                                seriously, and strongly feel you should too.
                            </p>
                            <p>
                                This Privacy Policy is an electronic record in the form of an
                                electronic contract formed under applicable data protection laws.
                                This Privacy Policy does not require any physical, electronic or
                                digital signature.
                            </p>
                            <p>
                                This Privacy Policy describes the information that Sarwa Studio
                                collects about you, how we use and protect this information which
                                you provide us when you use our website. Please take a moment to
                                read our Privacy Policy so that you know what choices you can make
                                about how we use this information.
                            </p>
                            <p>
                                The terms{" "}
                                <span className="text-white font-medium">"We" / "Us" / "Our"</span>{" "}
                                refer to Sarwa Studio and the terms{" "}
                                <span className="text-white font-medium">"You" / "Your" / "Yourself"</span>{" "}
                                refer to the users.
                            </p>
                            <p>
                                By using our website, you indicate that you understand and agree to
                                this Privacy Policy. If you do not agree, please do not use this
                                website.
                            </p>
                        </div>
                    </section>

                    <Divider />

                    {/* Section 1 */}
                    <section id="scope" className="scroll-mt-24">
                        <SectionHeading number="1" title="Scope and Consent" />
                        <div className="text-gray-400 leading-relaxed space-y-4">
                            <p>
                                You accept this Privacy Policy when you access or use our services,
                                content, features, technologies or functionality offered through our
                                website (hereinafter referred to as "Services").
                            </p>
                            <p>
                                By using our Services, you are accepting this Privacy Policy and
                                consenting to our collection, use, disclosure, retention, transfer
                                and protection of your information as described in this Privacy
                                Policy.
                            </p>
                            <p>
                                Your privacy is of utmost importance to us.{" "}
                                <span className="text-white font-medium">
                                    We do not publish, sell or rent your personal information to third
                                    parties for their marketing purposes without your explicit consent.
                                </span>
                            </p>
                        </div>
                    </section>

                    <Divider />

                    {/* Section 2 */}
                    <section id="personal-info" className="scroll-mt-24">
                        <SectionHeading number="2" title="Personal Information" />
                        <div className="text-gray-400 leading-relaxed space-y-4">
                            <p>
                                "Personal Information" is information relating to an identified or
                                identifiable natural person. We do not consider Personal Information
                                to include information that has been made anonymous or aggregated so
                                that it can no longer be used to identify a specific person.
                            </p>
                            <p>
                                We collect, use, disclose, transfer, and store personal information
                                when needed to provide our Services and for our operational and
                                business purposes as described in this Privacy Policy.
                            </p>
                        </div>
                    </section>

                    <Divider />

                    {/* Section 3 */}
                    <section id="info-collect" className="scroll-mt-24">
                        <SectionHeading number="3" title="Information We Collect" />
                        <div className="text-gray-400 leading-relaxed space-y-4">
                            <p>
                                When you use our website, we collect and store your Personal
                                Information received from you. Our primary goal is to provide a safe,
                                secure, efficient, and smooth experience while using our Services.
                            </p>
                            <p>
                                We also collect information sent by your computer and other access
                                devices, including: IP address, device type, geo-location, page views,
                                referral URL, and standard web log data.
                            </p>
                            <PolicyList
                                items={[
                                    "We will be transparent about how we collect and use your information.",
                                    "If we have collected your information for a particular purpose, we will not use it for anything else without your consent.",
                                    "We will continue to review and assess the quality of our information.",
                                    "We will observe the rights granted to you under applicable privacy and data protection laws.",
                                    "We will ensure that when we outsource any processes, sub-contractors have appropriate security measures in place.",
                                    "We may transfer your personal information within Sarwa Studio only to the extent necessary for fulfillment of purpose.",
                                    "We have necessary procedures and controls to ensure personal information is protected no matter where it is stored.",
                                ]}
                            />
                        </div>
                    </section>

                    <Divider />

                    {/* Section 4 */}
                    <section id="info-you-give" className="scroll-mt-24">
                        <SectionHeading number="4" title="Information You Give Us When You Use Our Services" />
                        <PolicyList
                            items={[
                                "Identifying information such as your name, email, phone number, and company name when you contact us or register.",
                                "Project details and requirements shared through our inquiry forms or direct communications.",
                                "Billing and payment information if applicable, retained in accordance with applicable data protection laws.",
                                "Additional information as required due to amendments in applicable data protection laws from time to time.",
                            ]}
                        />
                    </section>

                    <Divider />

                    {/* Section 5 */}
                    <section id="technical" className="scroll-mt-24">
                        <SectionHeading number="5" title="Technical and Functional Management of the Website" />
                        <p className="text-gray-400 leading-relaxed">
                            When you use our website, we record data such as your IP-address,
                            operating system, access dates and times, location details, pages
                            viewed, and device information. We use this data to deliver the
                            functionalities of the website, resolve technical difficulties, and
                            provide appropriate services.
                        </p>
                    </section>

                    <Divider />

                    {/* Section 6 */}
                    <section id="cookies" className="scroll-mt-24">
                        <SectionHeading number="6" title="Cookie and Its Usage" />
                        <PolicyList
                            items={[
                                '"Cookies" are pieces of information stored by your web browser on your computer\'s hard disk for record-keeping purposes. Cookies only identify your computer, not you personally.',
                                "We use cookies to store your preferences, record session information, and tailor our Services to your needs.",
                                "Most web browsers allow you to turn off cookies; however, doing so will limit your use of our Services.",
                            ]}
                        />
                    </section>

                    <Divider />

                    {/* Section 7 */}
                    <section id="third-party-sources" className="scroll-mt-24">
                        <SectionHeading number="7" title="Personal Information From Other Sources" />
                        <p className="text-gray-400 leading-relaxed">
                            If you give us personal information about someone else, you must do so
                            only with their explicit and prior consent. You should inform them how
                            we collect, use, disclose, and retain their personal information
                            according to our Privacy Policy.
                        </p>
                    </section>

                    <Divider />

                    {/* Section 8 */}
                    <section id="use-retention" className="scroll-mt-24">
                        <SectionHeading number="8" title="Use and Retention of Personal Information" />
                        <div className="space-y-4">
                            <p className="text-gray-400 leading-relaxed">We may use the information we collect about you to:</p>
                            <PolicyList
                                items={[
                                    "Provide you with, maintain, and improve our Services — including web development, 3D animation, video editing, software solutions, graphic design, and all digital solutions.",
                                    "Process transactions and send communications through email on your registered email address.",
                                    "Verify your identity, including during account creation and password reset processes.",
                                    "Manage risk, or to detect, prevent, and/or remediate fraud or other potentially prohibited or illegal activities.",
                                    "Detect, prevent or remediate violations of policies or applicable Terms of Use.",
                                    "Perform internal operations including troubleshooting, data analysis, and monitoring usage trends.",
                                    "Send you communications about services, promotions, and updates where permissible.",
                                    "Personalize and improve the Services, including to provide or recommend relevant features and content.",
                                ]}
                            />
                            <p className="text-gray-400 leading-relaxed">
                                We retain your Personal Information as long as necessary in accordance
                                with applicable data protection laws. Subject to applicable law, we
                                shall delete your Personal Information upon your written request.
                            </p>
                        </div>
                    </section>

                    <Divider />

                    {/* Section 9 */}
                    <section id="disclosure" className="scroll-mt-24">
                        <SectionHeading number="9" title="Disclosure of Personal Information" />
                        <PolicyList
                            items={[
                                "We may disclose your Personal Information only to the extent directly relevant and necessary to deliver our Services. We do not disclose your Personal Information to third parties for promotional purposes without your explicit consent.",
                                "We may be required to disclose your Personal Information with government authorities for verification of identity or investigation of offences as required under applicable law.",
                                "All your private communications and Personal Information will never be disclosed in any manner other than described in this Privacy Policy.",
                                "If Sarwa Studio were to merge with or be acquired by another company, we may share information in accordance with this Privacy Policy.",
                            ]}
                        />
                    </section>

                    <Divider />

                    {/* Section 10 */}
                    <section id="choices" className="scroll-mt-24">
                        <SectionHeading number="10" title="Choices" />
                        <PolicyList
                            items={[
                                "You may correct your information at any time by contacting us. If you wish to withdraw consent, please email us at privacy@sarwastudio.com and we will process your request within 15 business days.",
                                "When you sign in to your account on our Services, we may give you the option to stay signed in. If you are using a public or shared computer, we encourage you not to stay signed in.",
                                "You can typically end your signed-in session by signing out and/or clearing your cookies.",
                                "If you withdraw your consent, you may not have access to all of our Services.",
                            ]}
                        />
                    </section>

                    <Divider />

                    {/* Section 11 */}
                    <section id="access" className="scroll-mt-24">
                        <SectionHeading number="11" title="Access Rights" />
                        <p className="text-gray-400 leading-relaxed">
                            To protect your privacy and security, we will verify your identity
                            before granting access or making changes to your personally-identifying
                            information.
                        </p>
                    </section>

                    <Divider />

                    {/* Section 12 */}
                    <section id="contact" className="scroll-mt-24">
                        <SectionHeading number="12" title="Contact Information" />
                        <p className="text-gray-400 leading-relaxed">
                            We may seek permission for our Services to collect and sync contact
                            information from your system and device as per the permission system
                            used through the operating system.
                        </p>
                    </section>

                    <Divider />

                    {/* Section 13 */}
                    <section id="optout" className="scroll-mt-24">
                        <SectionHeading number="13" title="Opt-Out & Unsubscribe" />
                        <p className="text-gray-400 leading-relaxed">
                            You may opt out of receiving promotional and marketing messages from
                            us by following the instructions in those messages or by emailing us
                            at{" "}
                            <a
                                href="mailto:unsubscribe@sarwastudio.com"
                                className="text-amber-400 hover:text-amber-300 underline transition-colors"
                            >
                                unsubscribe@sarwastudio.com
                            </a>
                            . If you opt out, we may still send you non-promotional communications
                            such as those about your account or Services you have requested.
                        </p>
                    </section>

                    <Divider />

                    {/* Section 14 */}
                    <section id="security" className="scroll-mt-24">
                        <SectionHeading number="14" title="Security and Storage Measures" />
                        <div className="space-y-4">
                            <p className="text-gray-400 leading-relaxed">
                                We maintain the integrity and security of your Personal Information.
                                We use industry-standard protocols and GDPR regulations to protect
                                your Personal Information.
                            </p>
                            <PolicyList
                                items={[
                                    "We seek to store your Personal Information in secure operating environments not accessible to the general public. However, no data transmission over the Internet can be guaranteed to be 100% secure. If you believe your information has been compromised, please contact us at privacy@sarwastudio.com.",
                                    "We will not be held responsible for events arising from unauthorized access beyond our reasonable control. We will investigate and notify you of any breach related to data transmissions from our Services.",
                                ]}
                            />
                        </div>
                    </section>

                    <Divider />

                    {/* Section 15 */}
                    <section id="children" className="scroll-mt-24">
                        <SectionHeading number="15" title="Children's Privacy" />
                        <p className="text-gray-400 leading-relaxed">
                            Our Services are generally not aimed at children under the age of 13.
                            If we become aware that we have inadvertently collected Personal
                            Information from a child, we will take steps to delete that
                            information.
                        </p>
                    </section>

                    <Divider />

                    {/* Section 16 */}
                    <section id="third-party" className="scroll-mt-24">
                        <SectionHeading number="16" title="Third Party Privacy Practices" />
                        <p className="text-gray-400 leading-relaxed">
                            This Privacy Policy addresses only the use and disclosure of Personal
                            Information we collect from you. If you are directed to a third-party
                            website, their privacy policy and practices will apply. We cannot
                            guarantee the privacy or security of your information once you provide
                            it to a third party.
                        </p>
                    </section>

                    <Divider />

                    {/* Section 17 */}
                    <section id="grievance" className="scroll-mt-24">
                        <SectionHeading number="17" title="Grievance Officer" />
                        <div className="space-y-4">
                            <p className="text-gray-400 leading-relaxed">
                                In case of any feedback or grievances in relation to the collection,
                                storage, use, or disclosure of your Personal Information under this
                                Privacy Policy, please contact:
                            </p>
                            <div
                                className="border border-amber-400/20 rounded-xl p-6 space-y-2"
                                style={{ background: "rgba(251,191,36,0.05)" }}
                            >
                                <p className="text-white font-semibold">Sarwa Studio</p>
                                <p className="text-gray-400">Grievance Officer</p>
                                <p className="text-gray-500 text-sm">
                                    Email:{" "}
                                    <a
                                        href="mailto:privacy@sarwastudio.com"
                                        className="text-amber-400 hover:text-amber-300 transition-colors"
                                    >
                                        privacy@sarwastudio.com
                                    </a>
                                </p>
                                <p className="text-gray-500 text-sm">
                                    Website:{" "}
                                    <a
                                        href="https://sarwastudio.com"
                                        className="text-amber-400 hover:text-amber-300 transition-colors"
                                    >
                                        sarwastudio.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </section>

                    <Divider />

                    {/* Section 18 */}
                    <section id="changes" className="scroll-mt-24">
                        <SectionHeading number="18" title="Changes to This Privacy Policy" />
                        <p className="text-gray-400 leading-relaxed">
                            We reserve the right to change this Privacy Policy at any time by
                            posting the amended terms on this website and indicating the effective
                            date. If we make any material changes, we will notify you by sending
                            an email or posting a notice on this site. We request you to
                            periodically review the Privacy Policy from time to time.
                        </p>
                    </section>

                    <Divider />

                    {/* Section 19 */}
                    <section id="disclaimer" className="scroll-mt-24">
                        <SectionHeading number="19" title="Disclaimer" />
                        <div
                            className="border border-amber-400/20 rounded-xl p-6"
                            style={{ background: "rgba(251,191,36,0.04)" }}
                        >
                            <p className="text-gray-500 uppercase text-sm leading-relaxed tracking-wide">
                                WE MAKE NO WARRANTIES OR REPRESENTATIONS, EXPRESS OR IMPLIED. WE DO
                                NOT HAVE ANY METHOD TO ASSESS OR VERIFY THE VERACITY OF YOUR
                                INFORMATION PROVIDED OR WHETHER IT IS CURRENT OR ACCURATE. SARWA
                                STUDIO DOES NOT GUARANTEE THE ACCURACY, COMPLETENESS, TIMELINESS, OR
                                CORRECT SEQUENCING OF ANY INFORMATION. USE OF THIS WEBSITE IS AT YOUR
                                OWN RISK.
                            </p>
                        </div>
                    </section>

                    {/* CTA */}
                    <div
                        className="mt-16 rounded-2xl border border-amber-400/20 p-10 text-center"
                        style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.07) 0%, rgba(25,41,64,0.6) 100%)" }}
                    >
                        <div className="w-12 h-0.5 bg-amber-400 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-3">
                            Have Questions About Your Privacy?
                        </h3>
                        <p className="text-gray-400 mb-6 max-w-lg mx-auto">
                            Our team is here to help. Reach out to us and we'll respond within 15
                            business days.
                        </p>
                        <a
                            href="mailto:privacy@sarwastudio.com"
                            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#111929] font-semibold px-6 py-3 rounded-full transition-all hover:shadow-lg hover:shadow-amber-900/30"
                        >
                            Contact Us
                        </a>
                    </div>
                </main>
            </div>
        </div>
    );
}

/* ── Reusable Sub-components ── */

function SectionHeading({ number, title }: { number: string; title: string }) {
    return (
        <h2 className="text-xl md:text-2xl font-bold text-white mb-5 flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-lg border border-amber-400/30 text-amber-400 text-sm font-bold flex items-center justify-center mt-0.5"
                style={{ background: "rgba(251,191,36,0.1)" }}
            >
                {number}
            </span>
            {title}
        </h2>
    );
}

function Divider() {
    return <div className="border-t border-white/5" />;
}

function PolicyList({ items }: { items: string[] }) {
    return (
        <ul className="space-y-3 mt-3">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-2 w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-gray-400 leading-relaxed">{item}</span>
                </li>
            ))}
        </ul>
    );
}
