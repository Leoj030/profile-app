import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import JobApplicationForm from "@/components/jobs/JobApplicationForm";

interface JobPost {
    id: string;
    title: string;
    company: string;
    location: string;
    job_type: string;
    experience_level: string;
    salary_min: number | null;
    salary_max: number | null;
    salary_currency: string;
    description: string;
    requirements: string;
    nice_to_have: string | null;
    skills: string[];
    application_deadline: string | null;
    status: string;
    created_at: string;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data } = await supabase
        .from("job_posts")
        .select("title, company, description")
        .eq("id", id)
        .eq("status", "active")
        .single();

    if (!data) return { title: "Job Not Found" };

    return {
        title: `${data.title} at ${data.company}`,
        description: data.description?.slice(0, 160),
    };
}

function formatSalary(min: number | null, max: number | null, currency: string) {
    if (!min && !max) return "Competitive / To be disclosed";
    const fmt = (n: number) =>
        new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(n);
    if (min && max) return `${fmt(min)} – ${fmt(max)}`;
    if (min) return `From ${fmt(min)}`;
    return `Up to ${fmt(max!)}`;
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

const badgeBase = "px-3 py-1 rounded-lg text-xs font-semibold border";

export default async function JobPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: job, error } = await supabase
        .from("job_posts")
        .select("*")
        .eq("id", id)
        .eq("status", "active")
        .single();

    if (error || !job) notFound();

    const post = job as JobPost;

    return (
        <div className="min-h-screen bg-[#0f1629] text-slate-300 font-sans">
            {/* Background grid */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(103,95,174,0.12) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            <main className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 pt-32 pb-12">
                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* ── LEFT: Job Details ── */}
                    <div className="flex-1 min-w-0 space-y-6">
                        {/* Header card */}
                        <div className="bg-slate-900/60 border border-slate-800/50 rounded-2xl p-7 backdrop-blur-sm">
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-purple-500/30 to-indigo-600/30 border border-purple-500/20 flex items-center justify-center text-2xl font-black text-white shrink-0">
                                    {post.company[0]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
                                        {post.title}
                                    </h1>
                                    <p className="text-slate-400 font-medium mt-1">{post.company}</p>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        <span className={`${badgeBase} bg-indigo-500/15 text-indigo-300 border-indigo-500/25`}>
                                            {post.job_type}
                                        </span>
                                        <span className={`${badgeBase} bg-slate-700/60 text-slate-300 border-slate-600/40`}>
                                            {post.experience_level}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Meta grid */}
                            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {/* Location */}
                                <div className="flex items-start gap-2.5">
                                    <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                                        <svg width="13" height="13" viewBox="0 0 15 15" fill="none">
                                            <path d="M7.5 2.5C5.29086 2.5 3.5 4.29086 3.5 6.5C3.5 8.84744 5.06151 10.5 7.5 13C9.93849 10.5 11.5 8.84744 11.5 6.5C11.5 4.29086 9.70914 2.5 7.5 2.5ZM7.5 8C8.32843 8 9 7.32843 9 6.5C9 5.67157 8.32843 5 7.5 5C6.67157 5 6 5.67157 6 6.5C6 7.32843 6.67157 8 7.5 8Z" fill="#94a3b8" fillRule="evenodd" clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-600 uppercase tracking-wider font-semibold">Location</p>
                                        <p className="text-sm text-slate-300 mt-0.5">{post.location}</p>
                                    </div>
                                </div>
                                {/* Posted */}
                                <div className="flex items-start gap-2.5">
                                    <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                                        <svg width="13" height="13" viewBox="0 0 15 15" fill="none">
                                            <path d="M4.5 1C4.22386 1 4 1.22386 4 1.5V2H3C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V3C13 2.44772 12.5523 2 12 2H11V1.5C11 1.22386 10.7761 1 10.5 1C10.2239 1 10 1.22386 10 1.5V2H5V1.5C5 1.22386 4.77614 1 4.5 1ZM3 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12V5H3V3ZM3 6H12V12H3V6Z" fill="#94a3b8" fillRule="evenodd" clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-600 uppercase tracking-wider font-semibold">Posted</p>
                                        <p className="text-sm text-slate-300 mt-0.5">{formatDate(post.created_at)}</p>
                                    </div>
                                </div>
                                {/* Salary */}
                                <div className="flex items-start gap-2.5">
                                    <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                                        <svg width="13" height="13" viewBox="0 0 15 15" fill="none">
                                            <path d="M7.5 1C3.91015 1 1 3.91015 1 7.5C1 11.0899 3.91015 14 7.5 14C11.0899 14 14 11.0899 14 7.5C14 3.91015 11.0899 1 7.5 1ZM7 5H8C8.55228 5 9 5.44772 9 6H10C10 4.89543 9.10457 4 8 4H7.5V3H6.5V4H6C4.89543 4 4 4.89543 4 6C4 7.10457 4.89543 8 6 8H9C9.55228 8 10 8.44772 10 9C10 9.55228 9.55228 10 9 10H6C5.44772 10 5 9.55228 5 9H4C4 10.1046 4.89543 11 6 11H7.5V12H8.5V11H9C10.1046 11 11 10.1046 11 9C11 7.89543 10.1046 7 9 7H6C5.44772 7 5 6.55228 5 6C5 5.44772 5.44772 5 6 5H7Z" fill="#94a3b8" fillRule="evenodd" clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-600 uppercase tracking-wider font-semibold">Salary</p>
                                        <p className="text-sm text-slate-300 mt-0.5">{formatSalary(post.salary_min, post.salary_max, post.salary_currency)}</p>
                                    </div>
                                </div>
                                {/* Deadline (conditional) */}
                                {post.application_deadline && (
                                    <div className="flex items-start gap-2.5">
                                        <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                                            <svg width="13" height="13" viewBox="0 0 15 15" fill="none">
                                                <path d="M4.5 1C4.22386 1 4 1.22386 4 1.5V2H3C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V3C13 2.44772 12.5523 2 12 2H11V1.5C11 1.22386 10.7761 1 10.5 1C10.2239 1 10 1.22386 10 1.5V2H5V1.5C5 1.22386 4.77614 1 4.5 1ZM3 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12V5H3V3ZM3 6H12V12H3V6Z" fill="#f87171" fillRule="evenodd" clipRule="evenodd"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-600 uppercase tracking-wider font-semibold">Deadline</p>
                                            <p className="text-sm text-rose-400 mt-0.5">{formatDate(post.application_deadline)}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>

                        {/* Description */}
                        <div className="bg-slate-900/60 border border-slate-800/50 rounded-2xl p-7 backdrop-blur-sm">
                            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Job Description</h2>
                            <p className="text-slate-300 text-sm leading-7 whitespace-pre-wrap">{post.description}</p>
                        </div>

                        {/* Requirements */}
                        <div className="bg-slate-900/60 border border-slate-800/50 rounded-2xl p-7 backdrop-blur-sm">
                            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Requirements</h2>
                            <p className="text-slate-300 text-sm leading-7 whitespace-pre-wrap">{post.requirements}</p>
                        </div>

                        {/* Nice to Have */}
                        {post.nice_to_have && (
                            <div className="bg-slate-900/60 border border-slate-800/50 rounded-2xl p-7 backdrop-blur-sm">
                                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Nice to Have</h2>
                                <p className="text-slate-300 text-sm leading-7 whitespace-pre-wrap">{post.nice_to_have}</p>
                            </div>
                        )}

                        {/* Skills */}
                        {post.skills && post.skills.length > 0 && (
                            <div className="bg-slate-900/60 border border-slate-800/50 rounded-2xl p-7 backdrop-blur-sm">
                                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Required Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {post.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── RIGHT: Application Form ── */}
                    <div className="w-full lg:w-[420px] shrink-0">
                        <div className="sticky top-6 bg-slate-900/70 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm">
                            <h2 className="text-base font-bold text-white mb-1">Apply for this Role</h2>
                            <p className="text-xs text-slate-500 mb-6">
                                Fill out the form below. You don&apos;t need an account to apply.
                            </p>
                            <JobApplicationForm jobPostId={post.id} jobTitle={post.title} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
