import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DashboardTabs from "./DashboardTabs";

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
                        className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 backdrop-blur-sm"
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

            {/* Tabs */}
            <DashboardTabs applicants={applicantsData} jobIds={jobIds} />
        </>
    );
}
