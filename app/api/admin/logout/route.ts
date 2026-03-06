import { NextResponse } from "next/server";

export async function POST() {
    const res = NextResponse.json({ success: true });
    res.cookies.set("sarwa_session", "", { maxAge: 0, path: "/" });
    res.cookies.set("sarwa_token", "", { maxAge: 0, path: "/" });
    return res;
}
