"use client";

import { Button } from "../ui/Button";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { type User } from "@supabase/supabase-js";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function HeaderButton() {
    const router = useRouter();
    const pathname = usePathname();
    const isJobPostPage = pathname?.startsWith("/job-post");
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<{ username?: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function fetchUser() {
            const supabase = await createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
                const { data: profile } = await supabase
                    .from("profiles")
                    .select("id, username")
                    .eq("id", user.id)
                    .single();
                setProfile(profile);
            }
            setLoading(false);
        }
        fetchUser();
    }, []);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    async function handleLogout() {
        const supabase = await createClient();
        await supabase.auth.signOut();
        router.push("/signin");
        setUser(null);
        setProfile(null);
    }

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
            .select("user_role")
            .eq("id", user.id)
            .single();

        if (profile?.user_role) {
            router.push("/dashboard");
        } else {
            router.push("/get-started");
        }
    }

    if (loading) {
        return <div className="hidden lg:flex w-32 h-10 animate-pulse bg-slate-800/50 rounded-xl"></div>;
    }

    if (user) {
        const displayName = profile?.username || user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
        const initials = displayName
            .split(" ")
            .map((w: string) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

        return (
            <section className="items-center justify-center gap-4 relative hidden lg:flex">
                <Link href={"/dashboard"}>
                    <Button className="px-5 py-2.5 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl font-semibold transition-all active:scale-95 flex items-center gap-2">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                            <path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
                        </svg>
                        Dashboard
                    </Button>
                </Link>
                
                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen((prev) => !prev)}
                        className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-700 hover:border-purple-500/60 transition-all cursor-pointer focus:outline-none"
                    >
                        <div className="w-full h-full bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                            {initials}
                        </div>
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl shadow-black/40 overflow-hidden animate-fade-in z-50">
                            <div className="px-4 py-3 border-b border-slate-800/60">
                                <p className="text-sm font-semibold text-white truncate">{displayName}</p>
                            </div>
                            <div className="py-1">
                                <Link
                                    href="/dashboard"
                                    onClick={() => setDropdownOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        );
    }

    return (
        <section className="items-center justify-center gap-4 relative hidden lg:flex">
            <Link href={"/signin"}>
                <Button className="px-5 py-2.5 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl font-semibold transition-all active:scale-95">
                    Sign In
                </Button>
            </Link>
            {!isJobPostPage && (
                <Button 
                    onClick={handleGetStarted}
                    className="px-6 py-2.5 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] active:scale-95 transition-all"
                >
                    Get Started
                </Button>
            )}
        </section>
    );
}
