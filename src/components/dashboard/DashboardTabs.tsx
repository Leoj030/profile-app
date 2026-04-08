"use client";

import { useState } from "react";
import ApplicantsPanel from "./ApplicantsPanel";
import ActiveJobPostsPanel from "./ActiveJobPostsPanel";

export default function DashboardTabs({ applicants, jobIds }: { applicants: any[]; jobIds: string[] }) {
    const [activeTab, setActiveTab] = useState<"applicants" | "jobs">("applicants");

    return (
        <>
            {/* Tab labels */}
            <section className="mb-6">
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setActiveTab("applicants")}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                            activeTab === "applicants"
                                ? "bg-indigo-600/20 text-indigo-400 border-indigo-500/30"
                                : "text-slate-500 hover:text-slate-300 border-transparent"
                        }`}
                    >
                        Applicants
                    </button>
                    <button
                        onClick={() => setActiveTab("jobs")}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                            activeTab === "jobs"
                                ? "bg-indigo-600/20 text-indigo-400 border-indigo-500/30"
                                : "text-slate-500 hover:text-slate-300 border-transparent"
                        }`}
                    >
                        Active Job Posts
                    </button>
                </div>
            </section>

            {/* Tab content */}
            {activeTab === "applicants" ? (
                <ApplicantsPanel applicants={applicants} />
            ) : (
                <ActiveJobPostsPanel jobIds={jobIds} />
            )}
        </>
    );
}
