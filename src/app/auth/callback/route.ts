import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (user) {
                // Check if the user has a complete profile (with user_role set)
                const { data: profile } = await supabase
                    .from("profiles")
                    .select("id, user_role")
                    .eq("id", user.id)
                    .single();

                if (profile && profile.user_role) {
                    // Returning/onboarded user → dashboard
                    return NextResponse.redirect(`${origin}/dashboard`);
                } else {
                    // First-time / incomplete onboarding → get-started
                    return NextResponse.redirect(`${origin}/get-started`);
                }
            }
        }
    }

    // Fallback
    return NextResponse.redirect(`${origin}/signin`);
}
