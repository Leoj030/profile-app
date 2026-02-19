"use client";

import { Button } from "../ui/Button";
import Link from "next/link";

export default function HeaderButton() {
    return (
        <section className="items-center justify-center gap-4 relative hidden lg:flex">
            <Link href={"/signin"}>
                <Button className="px-5 py-2.5 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl font-semibold transition-all active:scale-95">
                    Sign In
                </Button>
            </Link>
            <Link href={"/get-started"}>
                <Button className="px-6 py-2.5 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] active:scale-95 transition-all">
                    Get Started
                </Button>
            </Link>
        </section>
    );
}
