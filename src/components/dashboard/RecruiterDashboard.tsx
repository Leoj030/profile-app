import Link from "next/link";
import {
    EyeOpenIcon,
    DownloadIcon,
    DotsVerticalIcon,
} from "@radix-ui/react-icons";
import { createClient } from "@/lib/supabase/server";

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

export default async function RecruiterDashboard() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch user's jobs
    const { data: jobs } = await supabase
        .from("job_posts")
        .select("id, status")
        .eq("recruiter_id", user?.id);

    const activeJobsCount = jobs?.filter(j => j.status === 'active' || j.status === 'published').length || jobs?.length || 0;
    const jobIds = jobs?.map(j => j.id) || [];

    // Fetch applicants for these jobs
    let applicantsData: any[] = [];
    if (jobIds.length > 0) {
        const { data: apps } = await supabase
            .from("job_applications")
            .select(`
                id,
                full_name,
                current_position,
                years_experience,
                created_at,
                job_post_id,
                status,
                job_posts !inner (
                    title
                )
            `)
            .in("job_post_id", jobIds)
            .order("created_at", { ascending: false });
        
        applicantsData = apps || [];
    }

    const STATS = [
        {
            label: "Active Jobs",
            value: activeJobsCount.toString(),
            sub: "Currently open",
            subColor: "text-emerald-400",
            iconBg: "bg-blue-500/20",
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="3" y="5" width="14" height="12" rx="2" stroke="#60a5fa" strokeWidth="1.5" />
                    <path d="M7 5V3a3 3 0 0 1 6 0v2" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            ),
        },
        {
            label: "Total Applicants",
            value: applicantsData.length.toString(),
            sub: "Across all jobs",
            subColor: "text-emerald-400",
            iconBg: "bg-orange-500/20",
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="7" cy="7" r="3.5" stroke="#fb923c" strokeWidth="1.5" />
                    <circle cx="14" cy="7" r="3.5" stroke="#fb923c" strokeWidth="1.5" />
                    <path d="M1 17c0-3 2.5-5 6-5m6 5c0-3 2.5-5 6-5" stroke="#fb923c" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            ),
        },
        {
            label: "Avg. Match Score",
            value: "N/A",
            sub: "Pending evaluation integration",
            subColor: "text-slate-500",
            iconBg: "bg-emerald-500/20",
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M2 14l4-4 4 4 8-10" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            label: "Avg. Experience",
            value: applicantsData.length > 0 
                ? (applicantsData.reduce((acc, a) => acc + (a.years_experience || 0), 0) / applicantsData.length).toFixed(1) + " yrs"
                : "0 yrs",
            sub: "Candidate pool",
            subColor: "text-indigo-400",
            iconBg: "bg-indigo-500/20",
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="#818cf8" strokeWidth="1.5" />
                    <path d="M10 5v5l3 3" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
    ];

    return (
        <>
            {/* Header row */}
            <section className="mb-10 flex items-start justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
                        Recruiter Dashboard
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Manage your hiring pipeline and track applicants
                    </p>
                </div>
                <Link
                    href="/dashboard/post-job"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-500/10 active:scale-[0.98]"
                >
                    <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                        <path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                    </svg>
                    Post New Job
                </Link>
            </section>

            {/* Stat Cards */}
            <section className="mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {STATS.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-slate-900/60 border border-slate-800/50 rounded-2xl p-5 backdrop-blur-sm"
                    >
                        <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center mb-4`}>
                            {stat.icon}
                        </div>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
                            {stat.label}
                        </p>
                        <p className="text-2xl font-black text-white">{stat.value}</p>
                        <p className={`text-xs mt-1 ${stat.subColor}`}>{stat.sub}</p>
                    </div>
                ))}
            </section>

            {/* Tab labels */}
            <section className="mb-6">
                <div className="flex items-center gap-1">
                    <span className="px-4 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-400 text-xs font-bold border border-indigo-500/30">
                        Applicants
                    </span>
                    <span className="px-4 py-1.5 rounded-lg text-slate-500 text-xs font-medium hover:text-slate-300 transition-colors cursor-pointer">
                        Active Jobs
                    </span>
                    <span className="px-4 py-1.5 rounded-lg text-slate-500 text-xs font-medium hover:text-slate-300 transition-colors cursor-pointer">
                        Analytics
                    </span>
                </div>
            </section>

            {/* Applicants Panel */}
            <section>
                <div className="bg-slate-900/60 border border-slate-800/50 rounded-2xl overflow-hidden backdrop-blur-sm">
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
                    {applicantsData.length === 0 ? (
                        <div className="p-8 text-center text-slate-500 text-sm">
                            No applicants found yet. Create more jobs to attract candidates!
                        </div>
                    ) : (
                        applicantsData.map((applicant, index) => {
                            const dateApplied = new Date(applicant.created_at).toLocaleDateString();
                            const jobTitle = applicant.job_posts?.title || "Unknown Job";
                            const colorClass = COLORS[index % COLORS.length];

                            return (
                                <div
                                    key={applicant.id}
                                    className={`flex items-center gap-4 px-6 py-4 hover:bg-slate-800/30 transition-colors ${
                                        index !== applicantsData.length - 1
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
        </>
    );
}
