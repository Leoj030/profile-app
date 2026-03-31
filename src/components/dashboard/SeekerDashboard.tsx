import Link from "next/link";
import {
    FileTextIcon,
    PlusIcon,
    UploadIcon,
    EyeOpenIcon,
    ArrowRightIcon,
    ReaderIcon,
    StarIcon,
} from "@radix-ui/react-icons";

// Helper to compute overall score from result modules
function getOverallScore(result: Record<string, { module_score?: number }>) {
    const modules = ["module1", "module2", "module3", "module4"];
    let total = 0;
    let count = 0;
    for (const key of modules) {
        if (result[key]?.module_score != null) {
            total += result[key].module_score;
            count++;
        }
    }
    return count > 0 ? Math.round(total / count) : 0;
}

// Score badge color logic
function getScoreColor(score: number) {
    if (score >= 80) return { badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", ring: "#34d399", label: "Excellent" };
    if (score >= 60) return { badge: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", ring: "#facc15", label: "Good" };
    return { badge: "bg-rose-500/20 text-rose-400 border-rose-500/30", ring: "#f43f5e", label: "Needs Work" };
}

// Format a date string nicely
function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// Format relative time
function getRelativeTime(dateStr: string) {
    const now = new Date();
    const d = new Date(dateStr);
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateStr);
}

// Extract display name from reference_id
function getDisplayName(referenceId: string) {
    if (!referenceId) return "Untitled Resume";
    const parts = referenceId.split("-");
    if (parts.length > 1) {
        const name = parts.slice(1).join("-");
        return `${name}.pdf`;
    }
    return `${referenceId}.pdf`;
}

// Mini circular score chart (SVG)
function ScoreRing({ score, size = 48 }: { score: number; size?: number }) {
    const { ring } = getScoreColor(score);
    const r = (size - 6) / 2;
    const circ = 2 * Math.PI * r;
    const dash = (score / 100) * circ;
    return (
        <svg width={size} height={size} className="-rotate-90">
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={5} />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={ring}
                strokeWidth={5}
                strokeDasharray={`${dash} ${circ - dash}`}
                strokeLinecap="round"
            />
        </svg>
    );
}

type EvalRow = {
    id: string;
    result: Record<string, { module_score?: number }>;
    reference_id: string;
    created_at: string;
};

interface SeekerDashboardProps {
    totalEvaluations: number;
    recentEvaluations: EvalRow[];
}

// Compute average score across all recent evals
function getAverageScore(evals: EvalRow[]) {
    if (evals.length === 0) return 0;
    const total = evals.reduce((sum, e) => sum + getOverallScore(e.result), 0);
    return Math.round(total / evals.length);
}

// Get highest score
function getBestScore(evals: EvalRow[]) {
    if (evals.length === 0) return 0;
    return Math.max(...evals.map((e) => getOverallScore(e.result)));
}

export default function SeekerDashboard({ totalEvaluations, recentEvaluations }: SeekerDashboardProps) {
    const avgScore = getAverageScore(recentEvaluations);
    const bestScore = getBestScore(recentEvaluations);
    const { badge: avgBadge, label: avgLabel } = getScoreColor(avgScore);
    const { badge: bestBadge } = getScoreColor(bestScore);

    const STATS = [
        {
            label: "Total Evaluations",
            value: totalEvaluations,
            icon: <FileTextIcon className="w-5 h-5 text-indigo-400" />,
            iconBg: "bg-indigo-500/15 border border-indigo-500/20",
            sub: totalEvaluations > 0 ? "Keep optimizing!" : "Get started below",
        },
        {
            label: "Avg. Score",
            value: totalEvaluations > 0 ? `${avgScore}` : "—",
            suffix: totalEvaluations > 0 ? "/100" : "",
            icon: <StarIcon className="w-5 h-5 text-purple-400" />,
            iconBg: "bg-purple-500/15 border border-purple-500/20",
            badge: totalEvaluations > 0 ? { class: avgBadge, label: avgLabel } : null,
        },
        {
            label: "Best Score",
            value: totalEvaluations > 0 ? `${bestScore}` : "—",
            suffix: totalEvaluations > 0 ? "/100" : "",
            icon: <ReaderIcon className="w-5 h-5 text-pink-400" />,
            iconBg: "bg-pink-500/15 border border-pink-500/20",
            badge: totalEvaluations > 0 ? { class: bestBadge, label: "Personal Best" } : null,
        },
    ];

    return (
        <>
            {/* ── Hero Welcome Banner ── */}
            <section className="mb-10 relative">
                <div className="relative rounded-3xl overflow-hidden border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm px-8 py-10">
                    {/* Glow blobs */}
                    <div className="absolute -top-16 -left-16 w-72 h-72 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />
                    <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-indigo-600/10 rounded-full blur-[70px] pointer-events-none" />

                    <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                        <div>
                            {/* Pill label */}
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold tracking-wide mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                                Job Seeker
                            </span>
                            <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                                My Dashboard
                            </h1>
                            <p className="text-slate-400 text-sm mt-2 max-w-md">
                                Track your resume evaluations, monitor your AI scores, and optimize your career profile.
                            </p>
                        </div>

                        {/* CTA cluster */}
                        <div className="flex flex-col gap-2.5 sm:shrink-0">
                            <Link
                                href="/create-resume"
                                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-500/20 active:scale-[0.98] hover:shadow-purple-500/30"
                            >
                                <PlusIcon className="w-4 h-4" />
                                Create Resume
                            </Link>
                            <Link
                                href="/resume-evaluation"
                                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600/60 text-slate-300 hover:text-white font-medium text-sm transition-all"
                            >
                                <UploadIcon className="w-4 h-4" />
                                Evaluate Resume
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Stats Row ── */}
            <section className="mb-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {STATS.map((stat, i) => (
                    <div
                        key={i}
                        className="group bg-slate-900/50 border border-slate-800/50 rounded-2xl p-5 backdrop-blur-sm hover:border-slate-700/60 transition-all hover:bg-slate-900/70"
                    >
                        <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center mb-4`}>
                            {stat.icon}
                        </div>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1.5">
                            {stat.label}
                        </p>
                        <div className="flex items-baseline gap-1">
                            <p className="text-3xl font-black text-white">{stat.value}</p>
                            {stat.suffix && <span className="text-sm text-slate-500 font-medium">{stat.suffix}</span>}
                        </div>
                        {stat.badge ? (
                            <span className={`mt-2 inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${stat.badge.class}`}>
                                {stat.badge.label}
                            </span>
                        ) : stat.sub ? (
                            <p className="text-xs text-slate-600 mt-2">{stat.sub}</p>
                        ) : null}
                    </div>
                ))}
            </section>

            {/* ── Recent Evaluations ── */}
            <section>
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-lg font-bold text-white">Recent Evaluations</h2>
                        <p className="text-xs text-slate-500 mt-0.5">Your last {recentEvaluations.length} resume scans</p>
                    </div>
                    {totalEvaluations > 5 && (
                        <Link
                            href="/dashboard/evaluations"
                            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 font-medium transition-colors group"
                        >
                            View All
                            <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    )}
                </div>

                {recentEvaluations.length === 0 ? (
                    /* Empty State */
                    <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-12 text-center backdrop-blur-sm">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                            <FileTextIcon className="w-8 h-8 text-indigo-500/60" />
                        </div>
                        <p className="text-slate-300 font-semibold text-sm mb-1">No evaluations yet</p>
                        <p className="text-slate-500 text-xs mb-6">Upload your resume to get an AI-powered score and feedback.</p>
                        <Link
                            href="/resume-evaluation"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-500/20 active:scale-[0.98]"
                        >
                            <UploadIcon className="w-4 h-4" />
                            Upload a Resume
                        </Link>
                    </div>
                ) : (
                    <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl overflow-hidden backdrop-blur-sm">
                        {recentEvaluations.map((evalItem, index) => {
                            const score = getOverallScore(evalItem.result);
                            const { badge: badgeClass, label: scoreLabel } = getScoreColor(score);

                            return (
                                <div
                                    key={evalItem.id}
                                    className={`group flex items-center gap-4 px-6 py-4 hover:bg-slate-800/30 transition-all ${
                                        index !== recentEvaluations.length - 1 ? "border-b border-slate-800/40" : ""
                                    }`}
                                >
                                    {/* Score ring */}
                                    <div className="relative shrink-0">
                                        <ScoreRing score={score} size={44} />
                                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
                                            {score}
                                        </span>
                                    </div>

                                    {/* Name + date */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-100 truncate group-hover:text-white transition-colors">
                                            {getDisplayName(evalItem.reference_id)}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-0.5">{getRelativeTime(evalItem.created_at)}</p>
                                    </div>

                                    {/* Badge */}
                                    <span className={`hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border shrink-0 ${badgeClass}`}>
                                        {scoreLabel}
                                    </span>

                                    {/* Score pill */}
                                    <span className={`px-3 py-1 rounded-lg text-xs font-bold border shrink-0 ${badgeClass}`}>
                                        {score}/100
                                    </span>

                                    {/* View link */}
                                    <Link
                                        href={`/resume-evaluation/result?id=${evalItem.id}`}
                                        className="p-2 rounded-lg text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all shrink-0"
                                        title="View Result"
                                    >
                                        <EyeOpenIcon className="w-4 h-4" />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </>
    );
}
