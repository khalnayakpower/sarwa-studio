import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// In production, store these in environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "sarwa@2025";
const SESSION_SECRET = process.env.SESSION_SECRET || "sarwa-studio-secret-2025-xk9m";

export function generateToken(): string {
    return crypto.randomBytes(32).toString("hex");
}

export function hashPassword(pwd: string): string {
    return crypto.createHmac("sha256", SESSION_SECRET).update(pwd).digest("hex");
}

export function createSessionToken(): string {
    const payload = `${ADMIN_USERNAME}:${Date.now()}:${SESSION_SECRET}`;
    return crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
}

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ error: "Credentials required." }, { status: 400 });
        }

        // Constant-time comparison to prevent timing attacks
        const userOk = crypto.timingSafeEqual(
            Buffer.from(username),
            Buffer.from(ADMIN_USERNAME)
        );
        const passOk = crypto.timingSafeEqual(
            Buffer.from(hashPassword(password)),
            Buffer.from(hashPassword(ADMIN_PASSWORD))
        );

        if (!userOk || !passOk) {
            // Delay to slow brute force
            await new Promise((r) => setTimeout(r, 800));
            return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
        }

        const token = createSessionToken();
        const res = NextResponse.json({ success: true });
        res.cookies.set("sarwa_session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 8, // 8 hours
            path: "/",
        });
        // Store valid token in a cookie too (server validates the HMAC)
        res.cookies.set("sarwa_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 8,
            path: "/",
        });
        return res;
    } catch {
        return NextResponse.json({ error: "Server error." }, { status: 500 });
    }
}
