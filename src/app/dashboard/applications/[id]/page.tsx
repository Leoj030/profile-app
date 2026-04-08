import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
    DownloadIcon, 
    ExternalLinkIcon,
    CalendarIcon,
    EnvelopeClosedIcon,
    IdCardIcon,
    BackpackIcon,
    LinkedInLogoIcon,
    Link2Icon,
    PersonIcon
} from "@radix-ui/react-icons";

export default async function ApplicationDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: application } = await supabase
        .from("job_applications")
        .select(`
            *,
            job_posts (
                title,
                company
            )
        `)
        .eq("id", id)
        .single();

    if (!application) {
        notFound();
    }

    let resumeUrl = null;
    if (application.resume_reference) {
        const { data } = supabase.storage
            .from("ApplicationResumes")
            .getPublicUrl(application.resume_reference);
        resumeUrl = data?.publicUrl;
    }

    const { 
        full_name, 
        email, 
        phone, 
        linkedin_url, 
        portfolio_url, 
        current_position, 
        current_company, 
        years_experience, 
        cover_letter, 
        created_at, 
        job_posts, 
        match_score,
        status
    } = application;

    const jobTitle = job_posts?.title || "Unknown Job";
    const dateApplied = new Date(created_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    const getInitials = (name: string) => {
        if (!name) return "??";
        const parts = name.split(" ");
        if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
        return name.substring(0, 2).toUpperCase();
    };

    function getMatchBadge(score: number | null) {
        if (score === null) return "bg-slate-500/20 text-slate-400 border-slate-500/30";
        if (score >= 85) return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
        if (score >= 70) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
        return "bg-rose-500/20 text-rose-400 border-rose-500/30";
    }

    return (
        <div className="min-h-screen bg-[#1a2340] text-slate-300 font-sans pt-32 pb-20">
            {/* Ambient Background Grid */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(103,95,174,0.12) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10">
                
                {/* Back Navigation */}
                <Link 
                    href="/dashboard" 
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors mb-8 group"
                >
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    Back to Dashboard
                </Link>

                {/* Profile Header */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-sm shadow-2xl mb-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-indigo-500/20 shrink-0">
                                {getInitials(full_name)}
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                                    {full_name}
                                </h1>
                                <p className="text-lg text-indigo-400 font-medium mb-1">
                                    {current_position || "No role specified"}
                                    {current_company && <span className="text-slate-500"> at {current_company}</span>}
                                </p>
                                <div className="flex items-center gap-2 mt-3 flex-wrap">
                                    <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
                                        Applied for: {jobTitle}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full border text-xs font-bold ${getMatchBadge(match_score)}`}>
                                        Match Score: {match_score ? `${match_score}%` : "Pending"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3 min-w-[140px] shrink-0">
                            {resumeUrl && (
                                <a 
                                    href={resumeUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold transition-colors border border-slate-700/50"
                                >
                                    <DownloadIcon className="w-4 h-4" />
                                    Resume
                                </a>
                            )}
                            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20">
                                Shortlist Candidate
                            </button>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Left Column - Contact & Fast Facts */}
                    <div className="space-y-6">
                        {/* Contact Info */}
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
                                <IdCardIcon className="w-4 h-4 text-indigo-400" />
                                Contact Details
                            </h3>
                            <ul className="space-y-4 text-sm">
                                <li className="flex items-start gap-3">
                                    <EnvelopeClosedIcon className="w-4 h-4 text-slate-500 mt-0.5" />
                                    <div>
                                        <p className="text-slate-500 text-xs mb-0.5">Email Address</p>
                                        <a href={`mailto:${email}`} className="text-indigo-400 hover:text-indigo-300 transition-colors">
                                            {email}
                                        </a>
                                    </div>
                                </li>
                                {phone && (
                                    <li className="flex items-start gap-3">
                                        <PersonIcon className="w-4 h-4 text-slate-500 mt-0.5" />
                                        <div>
                                            <p className="text-slate-500 text-xs mb-0.5">Phone Number</p>
                                            <span className="text-slate-300">{phone}</span>
                                        </div>
                                    </li>
                                )}
                                {linkedin_url && (
                                    <li className="flex items-start gap-3">
                                        <LinkedInLogoIcon className="w-4 h-4 text-slate-500 mt-0.5" />
                                        <div>
                                            <p className="text-slate-500 text-xs mb-0.5">LinkedIn</p>
                                            <a href={linkedin_url} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
                                                Profile Link <ExternalLinkIcon className="w-3 h-3" />
                                            </a>
                                        </div>
                                    </li>
                                )}
                                {portfolio_url && (
                                    <li className="flex items-start gap-3">
                                        <Link2Icon className="w-4 h-4 text-slate-500 mt-0.5" />
                                        <div>
                                            <p className="text-slate-500 text-xs mb-0.5">Portfolio</p>
                                            <a href={portfolio_url} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
                                                External Link <ExternalLinkIcon className="w-3 h-3" />
                                            </a>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>

                        {/* Fast Facts */}
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
                                <BackpackIcon className="w-4 h-4 text-indigo-400" />
                                Application Data
                            </h3>
                            <ul className="space-y-4 text-sm">
                                <li className="flex items-center justify-between">
                                    <span className="text-slate-500">Date Applied</span>
                                    <span className="text-slate-300 font-medium">{dateApplied}</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-slate-500">Experience</span>
                                    <span className="text-slate-300 font-medium">
                                        {years_experience !== null ? `${years_experience} Years` : "Unspecified"}
                                    </span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-slate-500">Status</span>
                                    <span className={`font-medium capitalize ${status === 'shortlisted' ? 'text-emerald-400' : 'text-blue-400'}`}>
                                        {status || "New"}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column - Cover Letter */}
                    <div className="md:col-span-2">
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm h-full">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2 pb-4 border-b border-slate-800/60">
                                <EnvelopeClosedIcon className="w-4 h-4 text-indigo-400" />
                                Cover Letter / Additional Info
                            </h3>
                            
                            {cover_letter ? (
                                <div className="prose prose-invert prose-slate max-w-none text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                                    {cover_letter}
                                </div>
                            ) : (
                                <div className="h-40 flex items-center justify-center border-2 border-dashed border-slate-800/60 rounded-xl">
                                    <p className="text-slate-500 text-sm">No cover letter provided.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
