import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone, service, budget, message } = body;

        // Validation
        if (!name?.trim() || !email?.trim() || !message?.trim()) {
            return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
        }

        const { error } = await supabase.from("submissions").insert({
            id: Date.now().toString(),
            name: name.trim().slice(0, 100),
            email: email.trim().slice(0, 200),
            phone: phone?.trim().slice(0, 30) || "",
            service: service || "Not specified",
            budget: budget || "Not specified",
            message: message.trim().slice(0, 2000),
            read: false,
        });

        if (error) {
            console.error("Supabase insert error:", error);
            return NextResponse.json({ error: "Failed to save submission." }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error." }, { status: 500 });
    }
}
