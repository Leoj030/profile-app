import Link from "next/link";
import {
    EyeOpenIcon,
    DownloadIcon,
    DotsVerticalIcon,
} from "@radix-ui/react-icons";

function getMatchBadge(score: number | null) {
    if (score === null) return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    if (score >= 85) return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    if (score >= 70) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-rose-500/20 text-rose-400 border-rose-500/30";
}

function getInitials(name: string) {
    if (!name) return "??";
    const parts = name.split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
}

const COLORS = [
    "bg-emerald-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-blue-500",
    "bg-orange-500",
    "bg-indigo-500",
];

export default function ApplicantsPanel({ applicants }: { applicants: any[] }) {
    return (
        <section>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-sm">
                {/* Search + Filters */}
                <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-slate-800/40">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <svg
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                                width="14"
                                height="14"
                                viewBox="0 0 15 15"
                                fill="none"
                            >
                                <path
                                    d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search applicants..."
                                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* Applicant Rows */}
                {applicants.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-sm">
                        No applicants found yet. Create more jobs to attract candidates!
                    </div>
                ) : (
                    applicants.map((applicant, index) => {
                        const dateApplied = new Date(applicant.created_at).toLocaleDateString();
                        const jobTitle = applicant.job_posts?.title || "Unknown Job";
                        const colorClass = COLORS[index % COLORS.length];

                        return (
                            <div
                                key={applicant.id}
                                className={`flex items-center gap-4 px-6 py-4 hover:bg-slate-800/30 transition-colors ${
                                    index !== applicants.length - 1
                                        ? "border-b border-slate-800/40"
                                        : ""
                                }`}
                            >
                                {/* Avatar */}
                                <div
                                    className={`w-10 h-10 rounded-full ${colorClass} flex items-center justify-center text-white text-sm font-bold shrink-0`}
                                >
                                    {getInitials(applicant.full_name)}
                                </div>

                                {/* Name + Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-semibold text-white">
                                            {applicant.full_name}
                                        </p>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                                        {applicant.current_position || "No role specified"} · Applying for: <span className="text-indigo-400">{jobTitle}</span>
                                    </p>
                                    <p className="text-[11px] text-slate-600 mt-0.5">
                                        {applicant.years_experience ? `${applicant.years_experience} years experience` : "Entry level"} · Applied {dateApplied}
                                    </p>
                                </div>

                                {/* Match Score + Status */}
                                <div className="flex flex-col items-end gap-1 shrink-0">
                                    <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${getMatchBadge(applicant.match_score)}`}>
                                        {applicant.match_score ? `Match: ${applicant.match_score}%` : "Match: Pending"}
                                    </span>
                                    <span className={`text-[11px] font-medium ${applicant.status === 'shortlisted' ? 'text-emerald-400' : 'text-blue-400'}`}>
                                        {applicant.status || "New"}
                                    </span>
                                </div>

                                {/* Action Icons */}
                                <div className="flex items-center gap-2 shrink-0 ml-2">
                                    <Link
                                        href={`/dashboard/applications/${applicant.id}`}
                                        className="p-1.5 text-slate-500 hover:text-indigo-400 transition-colors"
                                        title="View Application"
                                    >
                                        <EyeOpenIcon className="w-3.5 h-3.5" />
                                    </Link>
                                    <button className="p-1.5 text-slate-500 hover:text-indigo-400 transition-colors">
                                        <DownloadIcon className="w-3.5 h-3.5" />
                                    </button>
                                    <button className="p-1.5 text-slate-500 hover:text-slate-300 transition-colors">
                                        <DotsVerticalIcon className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
}
