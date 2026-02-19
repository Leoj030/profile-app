"use client";

import { useState } from "react";
import {
    ScanSearch,
    Zap,
    CheckCircle2,
    FileText,
    ShieldCheck,
    Link as LinkIcon,
    Filter,
    Layers,
    BarChart3,
} from "lucide-react";

const JOB_SEEKER_FEATURES = [
    {
        title: "AI-Powered Analysis",
        description:
            "Get deep insights into your resume's strengths and weaknesses using advanced AI.",
        icon: ScanSearch,
    },
    {
        title: "Instant Results",
        description:
            "Receive your performance score and improvement tips in seconds, not hours.",
        icon: Zap,
    },
    {
        title: "ATS Checks",
        description:
            "Ensure your resume passes through Applicant Tracking Systems with high scores.",
        icon: CheckCircle2,
    },
    {
        title: "Content Analysis",
        description:
            "Optimize your keywords and formatting for better reach and readability.",
        icon: FileText,
    },
    {
        title: "Privacy Protected",
        description:
            "Your data is encrypted and handled with the utmost security and confidentiality.",
        icon: ShieldCheck,
    },
];

const RECRUITER_FEATURES = [
    {
        title: "Seamless Integration",
        description:
            "Connect effortlessly with your existing ATS and popular hiring platforms.",
        icon: LinkIcon,
    },
    {
        title: "AI-Powered Screening",
        description:
            "Automatically filter candidates based on precise skill matching and experience.",
        icon: Filter,
    },
    {
        title: "Bulk Processing",
        description:
            "Evaluate hundreds of resumes simultaneously with our high-speed processing engine.",
        icon: Layers,
    },
    {
        title: "Quality Metrics",
        description:
            "Get actionable data on candidate performance and cultural fit for your team.",
        icon: BarChart3,
    },
];

export default function FeaturesSection() {
    const [view, setView] = useState<"seekers" | "recruiters">("seekers");

    const features =
        view === "seekers" ? JOB_SEEKER_FEATURES : RECRUITER_FEATURES;

    return (
        <section
            id="features"
            className="py-24 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto flex flex-col items-center"
        >
            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    Powerful Features for Everyone
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Whether you&apos;re looking for your dream job or the
                    perfect candidate, we have the tools you need.
                </p>
            </div>

            {/* Toggle Switch */}
            <div className="flex bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800 mb-16 relative w-fit backdrop-blur-sm">
                <button
                    onClick={() => setView("seekers")}
                    className={`relative z-10 w-36 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                        view === "seekers"
                            ? "text-white"
                            : "text-slate-400 hover:text-slate-200"
                    }`}
                >
                    Job Seekers
                </button>
                <button
                    onClick={() => setView("recruiters")}
                    className={`relative z-10 w-36 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                        view === "recruiters"
                            ? "text-white"
                            : "text-slate-400 hover:text-slate-200"
                    }`}
                >
                    Recruiters
                </button>
                <div
                    className={`absolute inset-y-1.5 transition-all duration-300 ease-out bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg w-36 ${
                        view === "seekers" ? "left-1.5" : "left-[147px]"
                    }`}
                />
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full animate-in fade-in duration-500">
                {features.map((feature, index) => (
                    <div
                        key={`${view}-${index}`}
                        className="group bg-slate-900/40 p-8 rounded-3xl border border-slate-800 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(79,70,229,0.1)] backdrop-blur-sm"
                    >
                        <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <feature.icon className="w-7 h-7 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-200 transition-colors">
                            {feature.title}
                        </h3>
                        <p className="text-slate-400 leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
