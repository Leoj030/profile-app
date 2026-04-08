"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface JobPost {
    id: string;
    title: string;
    company: string;
    location: string;
    job_type: string;
    status: string;
    created_at: string;
    application_deadline: string | null;
}

const STATUS_COLORS: Record<string, string> = {
    draft: "bg-slate-500/20 text-slate-400 border-slate-500/30",
    active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    published: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    closed: "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

export default function ActiveJobPostsPanel({ jobIds }: { jobIds: string[] }) {
    const [jobs, setJobs] = useState<JobPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [shareModal, setShareModal] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        async function fetchJobs() {
            if (jobIds.length === 0) {
                setLoading(false);
                return;
            }
            const supabase = await createClient();
            const { data } = await supabase
                .from("job_posts")
                .select("id, title, company, location, job_type, status, created_at, application_deadline")
                .in("id", jobIds)
                .order("created_at", { ascending: false });

            setJobs(data || []);
            setLoading(false);
        }
        fetchJobs();
    }, [jobIds]);

    function handleShare(jobId: string) {
        setShareModal(jobId);
        setCopied(false);
    }

    function copyLink(jobId: string) {
        const url = `${window.location.origin}/job-post/${jobId}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <section>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-sm">
                {/* Header */}
                <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-slate-800/40">
                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-white">Your Job Posts</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Click a job to view or edit it</p>
                    </div>
                </div>

                {/* Job Rows */}
                {loading ? (
                    <div className="p-8 text-center text-slate-500 text-sm">Loading job posts...</div>
                ) : jobs.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-sm">
                        No job posts yet.{" "}
                        <Link href="/dashboard/post-job" className="text-indigo-400 hover:underline">
                            Post your first job
                        </Link>
                    </div>
                ) : (
                    jobs.map((job, index) => {
                        const dateCreated = new Date(job.created_at).toLocaleDateString();
                        const statusColor = STATUS_COLORS[job.status] || STATUS_COLORS.draft;

                        return (
                            <div
                                key={job.id}
                                className={`flex items-center gap-4 px-6 py-4 hover:bg-slate-800/30 transition-colors ${
                                    index !== jobs.length - 1 ? "border-b border-slate-800/40" : ""
                                }`}
                            >
                                {/* Company Icon */}
                                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500/30 to-indigo-600/30 border border-purple-500/20 flex items-center justify-center text-sm font-black text-white shrink-0">
                                    {job.company[0]}
                                </div>

                                {/* Job Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/job-post/${job.id}`}
                                            className="text-sm font-semibold text-white hover:text-indigo-400 transition-colors truncate"
                                        >
                                            {job.title}
                                        </Link>
                                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border shrink-0 ${statusColor}`}>
                                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                                        {job.company} · {job.location} · {job.job_type}
                                    </p>
                                    <p className="text-[11px] text-slate-600 mt-0.5">
                                        Posted {dateCreated}
                                        {job.application_deadline && ` · Deadline: ${new Date(job.application_deadline).toLocaleDateString()}`}
                                    </p>
                                </div>

                                {/* Share Button */}
                                <button
                                    onClick={() => handleShare(job.id)}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold hover:bg-indigo-500/20 transition-colors shrink-0"
                                    title="Share job post"
                                >
                                    <svg width="12" height="12" viewBox="0 0 15 15" fill="none">
                                        <path d="M7.5 2.5C7.5 2.77614 7.27614 3 7 3H3.5C3.22386 3 3 3.22386 3 3.5V11.5C3 11.7761 3.22386 12 3.5 12H11.5C11.7761 12 12 11.7761 12 11.5V8C12 7.72386 12.2239 7.5 12.5 7.5C12.7761 7.5 13 7.72386 13 8V11.5C13 12.3284 12.3284 13 11.5 13H3.5C2.67157 13 2 12.3284 2 11.5V3.5C2 2.67157 2.67157 2 3.5 2H7C7.27614 2 7.5 2.22386 7.5 2.5Z" fill="currentColor"/>
                                        <path d="M9 1C8.72386 1 8.5 1.22386 8.5 1.5C8.5 1.77614 8.72386 2 9 2H12.2929L7.14645 7.14645C6.95118 7.34171 6.95118 7.65829 7.14645 7.85355C7.34171 8.04882 7.65829 8.04882 7.85355 7.85355L13 2.70711V6C13 6.27614 13.2239 6.5 13.5 6.5C13.7761 6.5 14 6.27614 14 6V1.5C14 1.22386 13.7761 1 13.5 1H9Z" fill="currentColor"/>
                                    </svg>
                                    Share
                                </button>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Share Modal */}
            {shareModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 w-full max-w-md shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-white">Share Job Post</h3>
                            <button
                                onClick={() => setShareModal(null)}
                                className="text-slate-500 hover:text-slate-300 transition-colors"
                            >
                                <svg width="16" height="16" viewBox="0 0 15 15" fill="none">
                                    <path d="M11.7816 4.03156C12.0062 3.80702 12.0062 3.44295 11.7816 3.21841C11.5571 2.99387 11.193 2.99387 10.9685 3.21841L7.50005 6.68682L4.03164 3.21841C3.8071 2.99387 3.44303 2.99387 3.21849 3.21841C2.99395 3.44295 2.99395 3.80702 3.21849 4.03156L6.6869 7.49997L3.21849 10.9684C2.99395 11.1929 2.99395 11.557 3.21849 11.7815C3.44303 12.0061 3.8071 12.0061 4.03164 11.7815L7.50005 8.31314L10.9685 11.7815C11.193 12.0061 11.5571 12.0061 11.7816 11.7815C12.0062 11.557 12.0062 11.1929 11.7816 10.9684L8.31324 7.49997L11.7816 4.03156Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                readOnly
                                value={`${typeof window !== 'undefined' ? window.location.origin : ''}/job-post/${shareModal}`}
                                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-sm text-slate-300 focus:outline-none"
                            />
                            <button
                                onClick={() => copyLink(shareModal)}
                                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors shrink-0"
                            >
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
