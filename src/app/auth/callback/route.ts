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
        // Check if the user already has a profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", user.id)
          .single();

        if (profile) {
          // Returning user → dashboard
          return NextResponse.redirect(`${origin}/dashboard`);
        } else {
          // First-time user → onboarding
          return NextResponse.redirect(`${origin}/get-started`);
        }
      }
    }
  }

  // Fallback
  return NextResponse.redirect(`${origin}/signin`);
}
