"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ResultSkeleton() {
    const searchParams = useSearchParams();
    const [dots, setDots] = useState("");

    useEffect(() => {
        const id = searchParams.get("id");
        if (id) {
            // Once we have an ID, reload the page to let the Server Component handle the fetch
            window.location.reload();
        }
    }, [searchParams]);

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? "" : prev + ".");
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex h-screen bg-[#050810] text-slate-300 font-sans overflow-hidden">
            {/* Sidebar Skeleton */}
            <aside className="fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-800/80 bg-[#070b14] flex flex-col lg:flex">
                <div className="p-6 border-b border-slate-800/50">
                    <div className="h-4 w-24 bg-slate-800 rounded animate-pulse mb-8" />
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-11 h-11 rounded-full bg-slate-800 animate-pulse" />
                        <div className="space-y-2">
                            <div className="h-5 w-28 bg-slate-800 rounded animate-pulse" />
                            <div className="h-3 w-20 bg-slate-800 rounded animate-pulse" />
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-6 space-y-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-10 w-full bg-slate-800/50 rounded animate-pulse" />
                    ))}
                </div>
            </aside>

            {/* Main Content Skeleton */}
            <main className="flex-1 lg:ml-72 overflow-y-auto">
                <section className="w-full py-16 px-6 lg:px-12 flex flex-col items-center">
                    <div className="max-w-4xl w-full text-center mb-10 space-y-4 flex flex-col items-center">
                        <div className="h-3 w-32 bg-indigo-500/20 rounded animate-pulse" />
                        <div className="h-10 w-64 bg-slate-800 rounded animate-pulse" />
                        <div className="h-4 w-96 bg-slate-800/50 rounded animate-pulse mt-4" />
                    </div>

                    <div className="w-full max-w-2xl h-[600px] border border-slate-800/50 bg-[#070b14] rounded-sm flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 max-w-full -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-indigo-500/5 to-transparent" />
                        
                        <div className="flex flex-col items-center gap-4 text-slate-500">
                            <svg className="w-12 h-12 animate-spin text-indigo-500/30" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="font-bold tracking-widest uppercase text-xs">
                                Synthesizing Report{dots}
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
