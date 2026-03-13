import Link from "next/link";
import {
    EyeOpenIcon,
    DownloadIcon,
    DotsVerticalIcon,
} from "@radix-ui/react-icons";

// --- Mock Data ---

const MOCK_STATS = [
    {
        label: "Active Jobs",
        value: "12",
        sub: "+2 this week",
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
        value: "247",
        sub: "+34 this week",
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
        value: "84%",
        sub: "+5% from last month",
        subColor: "text-emerald-400",
        iconBg: "bg-emerald-500/20",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 14l4-4 4 4 8-10" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "Time to Hire",
        value: "14 days",
        sub: "-3 days improved",
        subColor: "text-emerald-400",
        iconBg: "bg-orange-500/20",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="#fb923c" strokeWidth="1.5" />
                <path d="M10 5v5l3 3" stroke="#fb923c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
];

const MOCK_APPLICANTS = [
    {
        id: "1",
        name: "Sarah Johnson",
        initials: "SJ",
        color: "bg-emerald-500",
        starred: true,
        role: "Senior Software Engineer",
        experience: "8 years experience",
        applied: "Applied 2025-10-15",
        matchScore: 92,
        status: "Shortlisted",
        statusColor: "text-emerald-400",
    },
    {
        id: "2",
        name: "Michael Chen",
        initials: "MC",
        color: "bg-purple-500",
        starred: true,
        role: "Senior Software Engineer",
        experience: "6 years experience",
        applied: "Applied 2025-10-14",
        matchScore: 88,
        status: "Reviewing",
        statusColor: "text-yellow-400",
    },
    {
        id: "3",
        name: "Emily Rodriguez",
        initials: "ER",
        color: "bg-pink-500",
        starred: false,
        role: "Product Manager",
        experience: "5 years experience",
        applied: "Applied 2025-10-13",
        matchScore: 85,
        status: "Reviewing",
        statusColor: "text-yellow-400",
    },
    {
        id: "4",
        name: "David Kim",
        initials: "DK",
        color: "bg-blue-500",
        starred: false,
        role: "Frontend Developer",
        experience: "4 years experience",
        applied: "Applied 2025-10-12",
        matchScore: 78,
        status: "New",
        statusColor: "text-blue-400",
    },
];

function getMatchBadge(score: number) {
    if (score >= 85) return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    if (score >= 70) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-rose-500/20 text-rose-400 border-rose-500/30";
}

export default function RecruiterDashboard() {
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
                    href="#"
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
                {MOCK_STATS.map((stat) => (
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

            {/* Tab labels (static, mock) */}
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
                        <select className="px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-sm text-slate-400 focus:outline-none appearance-none cursor-pointer">
                            <option>All Status</option>
                            <option>Shortlisted</option>
                            <option>Reviewing</option>
                            <option>New</option>
                        </select>
                        <select className="px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-sm text-slate-400 focus:outline-none appearance-none cursor-pointer">
                            <option>All Jobs</option>
                            <option>Software Engineer</option>
                            <option>Product Manager</option>
                        </select>
                    </div>

                    {/* Applicant Rows */}
                    {MOCK_APPLICANTS.map((applicant, index) => (
                        <div
                            key={applicant.id}
                            className={`flex items-center gap-4 px-6 py-4 hover:bg-slate-800/30 transition-colors ${
                                index !== MOCK_APPLICANTS.length - 1
                                    ? "border-b border-slate-800/40"
                                    : ""
                            }`}
                        >
                            {/* Avatar */}
                            <div
                                className={`w-10 h-10 rounded-full ${applicant.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}
                            >
                                {applicant.initials}
                            </div>

                            {/* Name + Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-semibold text-white">
                                        {applicant.name}
                                    </p>
                                    {applicant.starred && (
                                        <svg width="12" height="12" viewBox="0 0 15 15" fill="#eab308">
                                            <path d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45665 4.70426 9.55439 4.77523 9.66628 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.8137C11.8039 13.0729 11.5243 13.2764 11.2975 13.14L7.6564 10.9586C7.55905 10.9002 7.441 10.9002 7.34365 10.9586L3.70252 13.14C3.47573 13.2764 3.19612 13.0729 3.2589 12.8137L4.2476 8.72118C4.27369 8.61176 4.23642 8.49692 4.15105 8.42374L0.914787 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.33377 4.78422C5.44566 4.77523 5.5434 4.70426 5.58662 4.60039L7.22303 0.665992Z" />
                                        </svg>
                                    )}
                                </div>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    {applicant.role}
                                </p>
                                <p className="text-[11px] text-slate-600 mt-0.5">
                                    {applicant.experience} · {applicant.applied}
                                </p>
                            </div>

                            {/* Match Score + Status */}
                            <div className="flex flex-col items-end gap-1 shrink-0">
                                <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${getMatchBadge(applicant.matchScore)}`}>
                                    Match: {applicant.matchScore}%
                                </span>
                                <span className={`text-[11px] font-medium ${applicant.statusColor}`}>
                                    {applicant.status}
                                </span>
                            </div>

                            {/* Action Icons */}
                            <div className="flex items-center gap-2 shrink-0 ml-2">
                                <button className="p-1.5 text-slate-500 hover:text-indigo-400 transition-colors">
                                    <EyeOpenIcon className="w-3.5 h-3.5" />
                                </button>
                                <button className="p-1.5 text-slate-500 hover:text-indigo-400 transition-colors">
                                    <DownloadIcon className="w-3.5 h-3.5" />
                                </button>
                                <button className="p-1.5 text-slate-500 hover:text-slate-300 transition-colors">
                                    <DotsVerticalIcon className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
