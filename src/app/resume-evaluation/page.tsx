import {
    CheckIcon,
    LightningBoltIcon,
    MagnifyingGlassIcon,
    MagicWandIcon,
} from "@radix-ui/react-icons";
import UploadZone from "./UploadZone";

export default function ResumeUploadPage() {
    return (
        <main className="min-h-screen bg-[#0f1629] text-slate-300 pt-32 pb-20 px-6 lg:px-12 hero relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-purple-600/10 rounded-full blur-[140px] animate-pulse" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full -translate-y-1/2 animate-pulse [animation-delay:1s]"></div>
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/15 blur-[150px] rounded-full translate-y-1/2 animate-pulse [animation-delay:2s]"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Hero Header */}
                <div className="text-center mb-20 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 text-[10px] font-black uppercase tracking-[0.3em]">
                        <LightningBoltIcon className="w-3 h-3" />
                        Next-Gen Career Intelligence
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none">
                        Elevate Your{" "}
                        <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Professional
                        </span>{" "}
                        Story
                    </h1>
                    <p className="text-slate-300 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
                        Upload your resume and reach your
                        full potential today.
                    </p>
                </div>

                {/* Upload Zone & Features Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left: Enhanced Upload Card */}
                    <div className="lg:col-span-7 group">
                        <div className="relative">
                            {/* Animated Border Gradient */}
                            <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>

                            <div className="relative bg-[#0c1120] border border-slate-700/80 rounded-3xl p-8 lg:p-12 shadow-2xl overflow-hidden">
                                <div className="absolute top-0 right-0 p-12 bg-indigo-500/5 blur-3xl rounded-full -mr-16 -mt-16"></div>

                                <UploadZone />

                                <div className="mt-8 flex items-center justify-center gap-8 border-t border-slate-700/50 pt-8">
                                    <div className="flex items-center gap-2 opacity-70">
                                        <CheckIcon className="w-4 h-4 text-emerald-400" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                                            AI Powered
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-70">
                                        <CheckIcon className="w-4 h-4 text-emerald-400" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                                            Resume Analysis
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-70">
                                        <CheckIcon className="w-4 h-4 text-emerald-400" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                                            Free to Use
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Feature Highlights */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="p-6 bg-slate-900/60 border border-slate-700/60 rounded-2xl hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-colors">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-2 bg-indigo-500/10 rounded-lg">
                                    <MagnifyingGlassIcon className="w-5 h-5 text-indigo-400" />
                                </div>
                                <h4 className="text-base font-bold text-white">
                                    ATS Shadow Check
                                </h4>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                See exactly how Top-tier ATS systems perceive
                                your resume. Uncover hidden parsing errors
                                before they reach companies.
                            </p>
                        </div>

                        <div className="p-6 bg-slate-900/60 border border-slate-700/60 rounded-2xl hover:border-purple-500/50 hover:bg-purple-500/5 transition-colors">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-2 bg-purple-500/10 rounded-lg">
                                    <MagicWandIcon className="w-5 h-5 text-purple-400" />
                                </div>
                                <h4 className="text-base font-bold text-white">
                                    Dynamic Keyword Bridge
                                </h4>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Our proprietary algorithms bridge the gap
                                between your niche technical skills and
                                high-level industry umbrella terms.
                            </p>
                        </div>

                        <div className="p-6 bg-slate-900/60 border border-slate-700/60 rounded-2xl hover:border-teal-500/50 hover:bg-teal-500/5 transition-colors">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-2 bg-teal-500/10 rounded-lg">
                                    <LightningBoltIcon className="w-5 h-5 text-teal-400" />
                                </div>
                                <h4 className="text-base font-bold text-white">
                                    Impact & Metrics Audit
                                </h4>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                We evaluate your experience descriptions to
                                ensure they carry maximum recruiter impact with
                                quantified achievements.
                            </p>
                        </div>

                        <div className="mt-12 text-center lg:text-left">
                            <div className="inline-block p-1 rounded-2xl bg-slate-900 border border-slate-800 mb-4">
                                <div className="flex -space-x-2 overflow-hidden">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 bg-slate-800 border border-slate-700"
                                        />
                                    ))}
                                    <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-slate-900 bg-indigo-600 text-[10px] font-bold text-white">
                                        +2k
                                    </div>
                                </div>
                            </div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-2">
                                Trusted by developers at top tech firms
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
