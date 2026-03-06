import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function isAuthed(req: NextRequest): boolean {
    const cookie = req.cookies.get("sarwa_session");
    return !!(cookie?.value && cookie.value.length === 64);
}

// GET — fetch all submissions (newest first)
export async function GET(req: NextRequest) {
    if (!isAuthed(req)) {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { data, error } = await supabase
        .from("submissions")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Supabase fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch submissions." }, { status: 500 });
    }

    return NextResponse.json({ submissions: data });
}

// DELETE — remove a submission by id
export async function DELETE(req: NextRequest) {
    if (!isAuthed(req)) {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    try {
        const { id } = await req.json();
        const { error } = await supabase.from("submissions").delete().eq("id", id);
        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error." }, { status: 500 });
    }
}

// PATCH — mark a submission as read
export async function PATCH(req: NextRequest) {
    if (!isAuthed(req)) {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    try {
        const { id } = await req.json();
        const { error } = await supabase
            .from("submissions")
            .update({ read: true })
            .eq("id", id);
        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error." }, { status: 500 });
    }
}
