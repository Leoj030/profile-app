"use client";

import { Button } from "../ui/Button";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function HeaderButton() {
    const router = useRouter();

    async function handleGetStarted() {
        const supabase = await createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${process.env.NEXT_PUBLIC_BACKEND_BASE}/auth/callback`,
                },
            });

            if (error) console.error("Sign-in error:", error.message);
            return;
        }

        const { data: profile } = await supabase
            .from("profiles")
            .select("id")
            .eq("id", user.id)
            .single();

        if (profile) {
            router.push("/dashboard");
        } else {
            router.push("/get-started");
        }
    }

    return (
        <section className="items-center justify-center gap-4 relative hidden lg:flex">
            <Link href={"/signin"}>
                <Button className="px-5 py-2.5 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl font-semibold transition-all active:scale-95">
                    Sign In
                </Button>
            </Link>
            <Button 
                onClick={handleGetStarted}
                className="px-6 py-2.5 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] active:scale-95 transition-all"
            >
                Get Started
            </Button>
        </section>
    );
}
