"use client";

import { useEffect, useRef, useState } from "react";

// Lightweight particle burst on click
interface Particle {
    id: number;
    x: number;
    y: number;
    angle: number;
    speed: number;
    life: number;
}

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
    const pos = useRef({ x: -100, y: -100 });
    const ring = useRef({ x: -100, y: -100 });
    const trail = useRef(Array.from({ length: 6 }, () => ({ x: -100, y: -100 })));
    const raf = useRef<number>(0);
    const tick = useRef(0);

    const [clicking, setClicking] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY };
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }
        };

        const onDown = (e: MouseEvent) => {
            setClicking(true);
            // Spawn burst particles
            const burst: Particle[] = Array.from({ length: 10 }, (_, i) => ({
                id: Date.now() + i,
                x: e.clientX,
                y: e.clientY,
                angle: (i / 10) * Math.PI * 2,
                speed: 2 + Math.random() * 3,
                life: 1,
            }));
            setParticles((p) => [...p, ...burst]);
            setTimeout(() => {
                setParticles((p) => p.filter((x) => !burst.find((b) => b.id === x.id)));
            }, 600);
        };

        const onUp = () => setClicking(false);

        const onOver = (e: MouseEvent) => {
            const t = e.target as HTMLElement;
            setHovering(!!(t.closest("a") || t.closest("button") || t.closest("[data-hover]")));
        };

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mousedown", onDown);
        window.addEventListener("mouseup", onUp);
        window.addEventListener("mouseover", onOver);

        const animate = () => {
            tick.current++;

            // Ring lerp
            ring.current.x += (pos.current.x - ring.current.x) * 0.13;
            ring.current.y += (pos.current.y - ring.current.y) * 0.13;
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
            }

            // Trail: each segment chases the one ahead
            trail.current[0].x += (pos.current.x - trail.current[0].x) * 0.35;
            trail.current[0].y += (pos.current.y - trail.current[0].y) * 0.35;
            for (let i = 1; i < trail.current.length; i++) {
                trail.current[i].x += (trail.current[i - 1].x - trail.current[i].x) * 0.35;
                trail.current[i].y += (trail.current[i - 1].y - trail.current[i].y) * 0.35;
            }
            trailRefs.current.forEach((el, i) => {
                if (el) {
                    const scale = 1 - i * 0.14;
                    const opacity = 0.6 - i * 0.09;
                    el.style.transform = `translate(${trail.current[i].x}px, ${trail.current[i].y}px) scale(${scale})`;
                    el.style.opacity = String(opacity);
                }
            });

            raf.current = requestAnimationFrame(animate);
        };
        raf.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("mouseup", onUp);
            window.removeEventListener("mouseover", onOver);
            cancelAnimationFrame(raf.current);
        };
    }, []);

    const dotSize = clicking ? 5 : hovering ? 12 : 8;
    const ringSize = clicking ? 28 : hovering ? 54 : 38;

    return (
        <>
            <style>{`
        @keyframes spin-ring {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes particle-out {
          0%   { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
        .cursor-dot {
          transition: width 120ms ease, height 120ms ease, margin 120ms ease, box-shadow 120ms ease;
        }
        .cursor-ring-inner {
          transition: width 180ms ease, height 180ms ease, margin 180ms ease, border-color 180ms ease;
        }
        .cursor-ring-spinner {
          animation: spin-ring 1.4s linear infinite;
          transition: opacity 180ms ease;
        }
        .cursor-ring-pulse {
          animation: pulse-glow 1.2s ease-in-out infinite;
        }
      `}</style>

            {/* Trail dots */}
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    ref={(el) => { trailRefs.current[i] = el; }}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        pointerEvents: "none",
                        zIndex: 9990,
                        willChange: "transform",
                        width: `${7 - i}px`,
                        height: `${7 - i}px`,
                        borderRadius: "50%",
                        background: i % 2 === 0
                            ? `rgba(251,191,36,${0.55 - i * 0.08})`
                            : `rgba(249,115,22,${0.45 - i * 0.07})`,
                        marginLeft: `-${(7 - i) / 2}px`,
                        marginTop: `-${(7 - i) / 2}px`,
                        boxShadow: `0 0 ${6 - i}px rgba(251,191,36,0.5)`,
                    }}
                />
            ))}

            {/* Main dot */}
            <div
                ref={dotRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                    zIndex: 9999,
                    willChange: "transform",
                    mixBlendMode: "difference",
                }}
            >
                <div
                    className="cursor-dot"
                    style={{
                        width: `${dotSize}px`,
                        height: `${dotSize}px`,
                        background: clicking
                            ? "#f97316"
                            : hovering
                                ? "#fbbf24"
                                : "#fde68a",
                        borderRadius: clicking ? "3px" : "50%",
                        marginLeft: `-${dotSize / 2}px`,
                        marginTop: `-${dotSize / 2}px`,
                        boxShadow: clicking
                            ? "0 0 14px 4px rgba(249,115,22,0.9)"
                            : hovering
                                ? "0 0 18px 5px rgba(251,191,36,1)"
                                : "0 0 10px 3px rgba(251,191,36,0.7)",
                    }}
                />
            </div>

            {/* Ring */}
            <div
                ref={ringRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                    zIndex: 9998,
                    willChange: "transform",
                }}
            >
                {/* Outer dashed spinning ring — only on hover */}
                {hovering && (
                    <div
                        style={{
                            position: "absolute",
                            width: `${ringSize + 18}px`,
                            height: `${ringSize + 18}px`,
                            marginLeft: `-${(ringSize + 18) / 2}px`,
                            marginTop: `-${(ringSize + 18) / 2}px`,
                            borderRadius: "50%",
                            border: "1.5px dashed rgba(251,191,36,0.55)",
                        }}
                        className="cursor-ring-spinner"
                    />
                )}

                {/* Main ring */}
                <div
                    className="cursor-ring-inner"
                    style={{
                        width: `${ringSize}px`,
                        height: `${ringSize}px`,
                        borderRadius: "50%",
                        border: `1.5px solid ${clicking
                            ? "rgba(249,115,22,0.9)"
                            : hovering
                                ? "rgba(251,191,36,0.8)"
                                : "rgba(251,191,36,0.45)"
                            }`,
                        marginLeft: `-${ringSize / 2}px`,
                        marginTop: `-${ringSize / 2}px`,
                        background: hovering
                            ? "rgba(251,191,36,0.06)"
                            : "transparent",
                        boxShadow: hovering
                            ? "0 0 24px 6px rgba(251,191,36,0.18), inset 0 0 12px rgba(251,191,36,0.08)"
                            : clicking
                                ? "0 0 18px 4px rgba(249,115,22,0.25)"
                                : "none",
                    }}
                />

                {/* Corner accent ticks */}
                {[0, 90, 180, 270].map((deg) => (
                    <div
                        key={deg}
                        style={{
                            position: "absolute",
                            width: "5px",
                            height: "1.5px",
                            background: hovering ? "rgba(251,191,36,0.9)" : "rgba(251,191,36,0.5)",
                            borderRadius: "2px",
                            top: "50%",
                            left: "50%",
                            transformOrigin: `${-(ringSize / 2 + 2)}px 0`,
                            transform: `rotate(${deg}deg) translateX(${-(ringSize / 2 + 2)}px)`,
                            transition: "background 180ms ease",
                        }}
                    />
                ))}
            </div>

            {/* Click burst particles */}
            {particles.map((p) => {
                const tx = Math.cos(p.angle) * 30 * p.speed;
                const ty = Math.sin(p.angle) * 30 * p.speed;
                return (
                    <div
                        key={p.id}
                        style={{
                            position: "fixed",
                            top: p.y,
                            left: p.x,
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            pointerEvents: "none",
                            zIndex: 9997,
                            background: p.id % 2 === 0 ? "#fbbf24" : "#f97316",
                            marginLeft: "-2.5px",
                            marginTop: "-2.5px",
                            animation: "particle-out 0.55s ease-out forwards",
                            // @ts-ignore
                            "--tx": `${tx}px`,
                            "--ty": `${ty}px`,
                            boxShadow: "0 0 6px rgba(251,191,36,0.8)",
                        }}
                    />
                );
            })}
        </>
    );
}