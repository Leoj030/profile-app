"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface DashboardHeaderProps {
    avatarUrl?: string;
    displayName: string;
}

export default function DashboardHeader({ avatarUrl, displayName }: DashboardHeaderProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const initials = displayName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    async function handleLogout() {
        const supabase = await createClient();
        await supabase.auth.signOut();
        router.push("/signin");
    }

    return (
        <header className="w-full h-20 fixed top-0 left-0 bg-slate-950/20 flex justify-center items-center px-6 backdrop-blur-md border-b border-slate-800/50 z-50">
            <div className="container max-w-7xl flex justify-between items-center w-full">
                {/* Logo */}
                <Link href="/dashboard" className="group transition-transform duration-300 hover:scale-105">
                    <h1 className="montserrat-alternates text-2xl font-bold bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-indigo-300 group-hover:to-pink-300 transition-all">
                        ProFile
                    </h1>
                </Link>

                {/* Profile Avatar + Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen((prev) => !prev)}
                        className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-700 hover:border-purple-500/60 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                    >
                        {avatarUrl ? (
                            <Image
                                src={avatarUrl}
                                alt="Profile"
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                                {initials}
                            </div>
                        )}
                    </button>

                    {/* Dropdown */}
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl shadow-black/40 overflow-hidden animate-fade-in z-50">
                            <div className="px-4 py-3 border-b border-slate-800/60">
                                <p className="text-sm font-semibold text-white truncate">{displayName}</p>
                            </div>
                            <div className="py-1">
                                <Link
                                    href="/pricing"
                                    onClick={() => setDropdownOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                                >
                                    <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 0.877045C3.84 0.877045 0.877 3.84 0.877 7.5C0.877 11.16 3.84 14.123 7.5 14.123C11.16 14.123 14.123 11.16 14.123 7.5C14.123 3.84 11.16 0.877045 7.5 0.877045ZM7.5 3.5C7.776 3.5 8 3.724 8 4V4.5H8.5C8.776 4.5 9 4.724 9 5C9 5.276 8.776 5.5 8.5 5.5H6.5C6.224 5.5 6 5.724 6 6C6 6.276 6.224 6.5 6.5 6.5H8C8.828 6.5 9.5 7.172 9.5 8C9.5 8.728 8.978 9.337 8.292 9.467C8.195 9.486 8.098 9.5 8 9.5V10C8 10.276 7.776 10.5 7.5 10.5C7.224 10.5 7 10.276 7 10V9.5H6.5C6.224 9.5 6 9.276 6 9C6 8.724 6.224 8.5 6.5 8.5H8.5C8.776 8.5 9 8.276 9 8C9 7.724 8.776 7.5 8.5 7.5H7C6.172 7.5 5.5 6.828 5.5 6C5.5 5.272 6.022 4.663 6.708 4.533C6.805 4.514 6.902 4.5 7 4.5V4C7 3.724 7.224 3.5 7.5 3.5Z" fill="currentColor"/>
                                    </svg>
                                    Pricing
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
                                >
                                    <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 1C2.44772 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H7.5C7.77614 14 8 13.7761 8 13.5C8 13.2239 7.77614 13 7.5 13H3V2H7.5C7.77614 2 8 1.77614 8 1.5C8 1.22386 7.77614 1 7.5 1H3ZM10.6464 4.64645C10.4512 4.84171 10.4512 5.15829 10.6464 5.35355L12.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H12.2929L10.6464 9.64645C10.4512 9.84171 10.4512 10.1583 10.6464 10.3536C10.8417 10.5488 11.1583 10.5488 11.3536 10.3536L13.8536 7.85355C14.0488 7.65829 14.0488 7.34171 13.8536 7.14645L11.3536 4.64645C11.1583 4.45118 10.8417 4.45118 10.6464 4.64645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
                                    </svg>
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
