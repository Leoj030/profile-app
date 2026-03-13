import Link from "next/link";
import {
    FileTextIcon,
    PlusIcon,
    UploadIcon,
    EyeOpenIcon,
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
function getScoreBadge(score: number) {
    if (score >= 80)
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    if (score >= 60)
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-rose-500/20 text-rose-400 border-rose-500/30";
}

// Format a date string nicely
function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-CA"); // YYYY-MM-DD
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

export default function SeekerDashboard({
    totalEvaluations,
    recentEvaluations,
}: SeekerDashboardProps) {
    return (
        <>
            {/* Greeting */}
            <section className="mb-10">
                <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
                    My Dashboard
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                    Track your resume evaluations and improvements
                </p>
            </section>

            {/* Stat Card — Total Evaluations */}
            <section className="mb-10">
                <div className="bg-slate-900/60 border border-slate-800/50 rounded-2xl p-6 max-w-xs backdrop-blur-sm">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                        <FileTextIcon className="w-5 h-5 text-blue-400" />
                    </div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
                        Total Evaluations
                    </p>
                    <p className="text-3xl font-black text-white">
                        {totalEvaluations}
                    </p>
                </div>
            </section>

            {/* Quick Actions */}
            <section className="mb-10">
                <div className="bg-slate-900/60 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm">
                    <h2 className="text-lg font-bold text-white mb-5">
                        Quick Actions
                    </h2>
                    <div className="space-y-3">
                        <Link
                            href="/create-resume"
                            className="flex items-center gap-3 w-full px-5 py-3.5 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-500/10 active:scale-[0.98]"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Create Resume
                        </Link>
                        <Link
                            href="/resume-evaluation"
                            className="flex items-center gap-3 w-full px-5 py-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 text-slate-300 hover:text-white font-medium text-sm transition-all"
                        >
                            <UploadIcon className="w-4 h-4" />
                            Upload New Resume
                        </Link>
                    </div>
                </div>
            </section>

            {/* Recent Evaluations */}
            <section>
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-white">
                        Recent Evaluations
                    </h2>
                    {totalEvaluations > 5 && (
                        <Link
                            href="/dashboard/evaluations"
                            className="text-xs text-slate-500 hover:text-indigo-400 font-medium transition-colors"
                        >
                            View All
                        </Link>
                    )}
                </div>

                {recentEvaluations.length === 0 ? (
                    <div className="bg-slate-900/60 border border-slate-800/50 rounded-2xl p-10 text-center backdrop-blur-sm">
                        <FileTextIcon className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                        <p className="text-slate-500 text-sm">
                            No evaluations yet. Upload a resume to get started!
                        </p>
                    </div>
                ) : (
                    <div className="bg-slate-900/60 border border-slate-800/50 rounded-2xl overflow-hidden backdrop-blur-sm">
                        {recentEvaluations.map((evalItem, index) => {
                            const score = getOverallScore(evalItem.result);
                            const badgeClass = getScoreBadge(score);

                            return (
                                <div
                                    key={evalItem.id}
                                    className={`flex items-center gap-4 px-6 py-4 hover:bg-slate-800/30 transition-colors ${
                                        index !==
                                        recentEvaluations.length - 1
                                            ? "border-b border-slate-800/40"
                                            : ""
                                    }`}
                                >
                                    <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                                        <FileTextIcon className="w-4 h-4 text-indigo-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-white truncate">
                                            {getDisplayName(
                                                evalItem.reference_id
                                            )}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            {formatDate(evalItem.created_at)}
                                        </p>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-lg text-xs font-bold border ${badgeClass}`}
                                    >
                                        {score}/100
                                    </span>
                                    <Link
                                        href={`/resume-evaluation/result?id=${evalItem.id}`}
                                        className="text-slate-500 hover:text-indigo-400 transition-colors p-1"
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
