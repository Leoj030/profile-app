"use client";

import React, { useRef, useState, useEffect } from "react";
import {
    CheckCircledIcon,
    CrossCircledIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    FileTextIcon,
    TargetIcon,
    LightningBoltIcon,
    MixIcon,
    ExitIcon,
    HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
import { EvaluationData, ModuleData, CheckResult } from "./types";
import Link from "next/link";

// --- Constants ---

const MODULE_DESCRIPTIONS = {
    "Structure & Oranization":
        "Analyzes the resume's structural integrity to ensure ATS parsers can accurately map your history and contact details.",
    "Language & Mechanics":
        "Polishes grammar and tone, removing linguistic fluff to ensure a professional and impactful narrative.",
    "Impact & Metrics":
        "Evaluates how effectively you quantify achievements, ensuring your experience resonates with human recruiters.",
    "ATS Keyword Optimization":
        "Ensures industry-standard terms are present to bridge the gap between niche skills and high-level recruiter searches.",
};

const MODULE_ICONS = {
    "Structure & Oranization": FileTextIcon,
    "Language & Mechanics": MixIcon,
    "Impact & Metrics": LightningBoltIcon,
    "ATS Keyword Optimization": TargetIcon,
};

// --- Sub-components ---

const ScoreGaugeMini = ({ score }: { score: number }) => (
    <div
        className={`radial-progress text-indigo-500 bg-slate-900 border-2 border-slate-800 shadow-md`}
        style={
            {
                "--value": score,
                "--size": "2.8rem",
                "--thickness": "4px",
            } as React.CSSProperties
        }
    >
        <span className="text-white font-bold text-[10px]">{score}</span>
    </div>
);

const AccordionItem = ({
    title,
    data,
    icon: Icon,
    isOpen,
    onToggle,
    onScrollTo,
}: {
    title: string;
    data: ModuleData;
    icon: React.ElementType;
    isOpen: boolean;
    onToggle: () => void;
    onScrollTo: (key: string) => void;
}) => {
    const checks = Object.entries(data).filter(
        ([key]) => key !== "module_score",
    );

    return (
        <div className="border-b border-slate-800/50">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-900/40 transition-colors group"
            >
                <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-400" />
                    <span className="text-[13px] font-semibold text-slate-300 group-hover:text-white transition-colors">
                        {title}
                    </span>
                </div>
                {isOpen ? (
                    <ChevronUpIcon className="w-4 h-4 text-slate-500" />
                ) : (
                    <ChevronDownIcon className="w-4 h-4 text-slate-500" />
                )}
            </button>

            {isOpen && (
                <div className="bg-slate-900/20 px-4 pb-4 space-y-1.5 pt-1">
                    {checks.map(([key, result]) => {
                        const checkResult = result as CheckResult;
                        return (
                            <button
                                key={key}
                                onClick={() => onScrollTo(key)}
                                className={`w-full text-left text-[10px] p-2 rounded-md border transition-all hover:translate-x-1 ${
                                    checkResult.passed
                                        ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400/80 hover:bg-emerald-500/10"
                                        : "border-rose-500/20 bg-rose-500/5 text-rose-400/80 hover:bg-rose-500/10"
                                }`}
                            >
                                <span className="capitalize">
                                    {key.replace(/_/g, " ")}
                                </span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const FeedbackSection = ({
    moduleTitle,
    name,
    result,
    scrollRef,
}: {
    moduleTitle: string;
    name: string;
    result: CheckResult;
    scrollRef: (el: HTMLDivElement | null) => void;
}) => (
    <div
        ref={scrollRef}
        className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 mb-6 backdrop-blur-sm animate-fade-in scroll-mt-24"
    >
        <div className="flex items-start gap-4 mb-5">
            <div className="mt-1">
                {result.passed ? (
                    <CheckCircledIcon className="w-6 h-6 text-emerald-500" />
                ) : (
                    <CrossCircledIcon className="w-6 h-6 text-rose-500" />
                )}
            </div>
            <div className="flex-1">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-1">
                    {moduleTitle} Result
                </span>
                <h4 className="text-xl font-bold text-white capitalize tracking-tight mb-2">
                    {name.replace(/_/g, " ")}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {result.feedback}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {(result.weak_verbs_found ||
                        result.found_pronouns ||
                        result.found_buzzwords ||
                        result.niche_skills_found) && (
                        <div>
                            <h5 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-indigo-500" />
                                Context Analysis
                            </h5>
                            <div className="flex flex-wrap gap-2">
                                {result.weak_verbs_found?.map((v: string) => (
                                    <span
                                        key={v}
                                        className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold"
                                    >
                                        {v}
                                    </span>
                                ))}
                                {result.found_pronouns?.map((v: string) => (
                                    <span
                                        key={v}
                                        className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold"
                                    >
                                        {v}
                                    </span>
                                ))}
                                {result.found_buzzwords?.map((v: string) => (
                                    <span
                                        key={v}
                                        className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold"
                                    >
                                        {v}
                                    </span>
                                ))}
                                {result.niche_skills_found?.map((v: string) => (
                                    <span
                                        key={v}
                                        className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold"
                                    >
                                        {v}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {(result.suggested_improvements ||
                        result.suggested_umbrella_terms ||
                        result.corrections_needed) && (
                        <div>
                            <h5 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-emerald-500" />
                                Growth Roadmap
                            </h5>
                            <ul className="space-y-2.5">
                                {result.suggested_improvements?.map(
                                    (s: string, i: number) => (
                                        <li
                                            key={i}
                                            className="text-[11px] text-slate-300 flex items-start gap-2.5 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/50"
                                        >
                                            <span className="text-emerald-500 font-bold">
                                                ➔
                                            </span>
                                            {s}
                                        </li>
                                    ),
                                )}
                                {result.suggested_umbrella_terms?.map(
                                    (s: string, i: number) => (
                                        <li
                                            key={i}
                                            className="text-[11px] text-slate-300 flex items-start gap-2.5 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/50"
                                        >
                                            <span className="text-indigo-400 font-bold">
                                                #
                                            </span>
                                            Recommended Category:{" "}
                                            <span className="text-white font-bold px-1.5 py-0.5 bg-indigo-500/20 rounded border border-indigo-500/30 ml-1">
                                                {s}
                                            </span>
                                        </li>
                                    ),
                                )}
                                {result.missing &&
                                    result.missing.length > 0 && (
                                        <li className="text-[11px] text-rose-400 flex flex-col gap-2 bg-rose-500/5 p-3 rounded-xl border border-rose-500/20">
                                            <span className="font-bold flex items-center gap-2 uppercase tracking-tighter">
                                                <CrossCircledIcon className="w-3 h-3" />{" "}
                                                Missing Sections:
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {result.missing.map((m) => (
                                                    <span
                                                        key={m}
                                                        className="px-2 py-0.5 bg-rose-500/10 border border-rose-500/20 rounded text-[10px]"
                                                    >
                                                        {m}
                                                    </span>
                                                ))}
                                            </div>
                                        </li>
                                    )}
                                {result.is_fresh_grad !== undefined && (
                                    <li className="text-[11px] text-amber-400 flex items-center gap-2 bg-amber-500/5 p-2.5 rounded-xl border border-amber-500/20">
                                        <LightningBoltIcon className="w-3 h-3" />
                                        <span>
                                            Candidate Status:{" "}
                                            <span className="font-bold">
                                                {result.is_fresh_grad
                                                    ? "Fresh Graduate"
                                                    : "Experienced Professional"}
                                            </span>
                                        </span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
);

// --- Main View ---

export default function EvaluationView({
    data,
    pdfUrl = "/CV.pdf",
}: {
    data: EvaluationData;
    pdfUrl?: string;
}) {
    const [openAccordion, setOpenAccordion] = useState<string | null>(
        "Structure & Oranization",
    );
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [pdfWidth, setPdfWidth] = useState(600);

    // Callback ref pattern for dynamic elements
    const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const setItemRef = (key: string) => (el: HTMLDivElement | null) => {
        itemRefs.current[key] = el;
    };

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            setSidebarOpen(!mobile);
            setPdfWidth(Math.min(window.innerWidth - (mobile ? 40 : 100), 600));
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const overallScore = Math.round(
        Object.values(data).reduce(
            (acc, mod) => acc + (mod.module_score as number),
            0,
        ) / Object.keys(data).length,
    );

    const handleScrollTo = (key: string) => {
        const el = itemRefs.current[key];
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            if (isMobile) setSidebarOpen(false);
        }
    };

    return (
        <div className="flex h-screen bg-[#050810] text-slate-300 font-sans overflow-hidden">
            {/* 
                Structure:
                - Sidebar: h-full, potentially overflow-y-auto
                - Main: h-full, overflow-y-auto (the ONLY main scrollbar)
            */}
            {/* Mobile Menu Toggle */}
            {isMobile && !isSidebarOpen && (
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="fixed bottom-6 right-6 z-50 p-4 bg-indigo-600 rounded-2xl shadow-2xl text-white animate-bounce-subtle"
                >
                    <HamburgerMenuIcon className="w-6 h-6" />
                </button>
            )}

            {/* Sidebar Navigation */}
            <aside
                className={`
                fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-800/80 bg-[#070b14] flex flex-col 
                transition-transform duration-500 ease-out lg:relative lg:translate-x-0
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
            >
                <div className="p-6 border-b border-slate-800/50 bg-linear-to-b from-slate-900/50 to-transparent">
                    <div className="flex items-center justify-between mb-8">
                        <Link
                            href="/resume-evaluation"
                            className="flex items-center gap-2 group"
                        >
                            <ExitIcon className="w-4 h-4 text-slate-500 group-hover:text-white rotate-180" />
                            <span className="text-[10px] font-black text-slate-500 group-hover:text-slate-300 uppercase tracking-widest">
                                Back to Upload
                            </span>
                        </Link>
                        {isMobile && (
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="text-slate-500 hover:text-white"
                            >
                                <ChevronDownIcon className="w-5 h-5 rotate-90" />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <ScoreGaugeMini score={overallScore} />
                        <div>
                            <h2 className="text-xl font-black text-white tracking-tighter">
                                ProFile{" "}
                                <span className="text-indigo-500">AI</span>
                            </h2>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-1">
                                Evaluation Finalist
                            </p>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex justify-between items-end mb-1">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                Master Score
                            </span>
                            <span className="text-xs font-black text-indigo-400">
                                {overallScore}%
                            </span>
                        </div>
                        <div className="h-2 w-full bg-slate-950 rounded-full border border-slate-800/50 overflow-hidden p-px">
                            <div
                                className="h-full bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all duration-1000"
                                style={{ width: `${overallScore}%` }}
                            />
                        </div>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto custom-scrollbar">
                    {Object.entries(data).map(([moduleName, moduleData]) => {
                        const Icon =
                            MODULE_ICONS[
                                moduleName as keyof typeof MODULE_ICONS
                            ] || FileTextIcon;
                        return (
                            <AccordionItem
                                key={moduleName}
                                title={moduleName}
                                data={moduleData}
                                icon={Icon}
                                isOpen={openAccordion === moduleName}
                                onToggle={() =>
                                    setOpenAccordion(
                                        openAccordion === moduleName
                                            ? null
                                            : moduleName,
                                    )
                                }
                                onScrollTo={handleScrollTo}
                            />
                        );
                    })}
                </nav>

                <div className="p-5 border-t border-slate-800/50 bg-slate-950/40">
                    <button className="w-full py-3.5 bg-linear-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-500/10 active:scale-[0.98]">
                        Download Report
                    </button>
                </div>
            </aside>

            {/* Main Content Pane */}
            <main className="flex-1 overflow-y-auto custom-scrollbar relative">
                {/* Visual Section: PDF Layer */}
                <section className="w-full py-16 px-6 lg:px-12 flex flex-col items-center border-b border-slate-800/40 bg-linear-to-b from-slate-900/10 to-transparent">
                    <div className="max-w-4xl w-full text-center mb-10">
                        <h2 className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-4">
                            Live Preview Analysis
                        </h2>
                        <h1 className="text-3xl lg:text-5xl font-black text-white mb-6">
                            Visual Resume Integrity
                        </h1>
                        <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed">
                            Our AI matches your feedback directly to your resume
                            structure. Scroll down for a deep dive into each
                            improvement category.
                        </p>
                    </div>

                    <div className="relative group max-w-full">
                        <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-[#050810] shadow-2xl rounded-sm overflow-hidden transform transition-all duration-700 hover:scale-[1.01] origin-top max-w-full border border-slate-800/50 flex flex-col items-center">
                            <Document
                                file={pdfUrl}
                                className="flex flex-col items-center"
                                loading={
                                    <div className="p-20 text-slate-500 font-bold italic animate-pulse">
                                        Scanning Resume Document...
                                    </div>
                                }
                                error={
                                    <div className="p-20 text-rose-500 font-bold border border-rose-500/20 bg-rose-500/5 rounded-xl">
                                        Error loading PDF.
                                    </div>
                                }
                            >
                                <Page
                                    pageNumber={1}
                                    width={pdfWidth}
                                    className="shadow-inner"
                                    renderAnnotationLayer={false}
                                    renderTextLayer={false}
                                />
                            </Document>
                        </div>
                    </div>
                </section>

                {/* Feedback Section: Detailed Analysis */}
                <section className="max-w-5xl mx-auto py-20 px-6 lg:px-12">
                    <div className="mb-20">
                        <h3 className="text-4xl font-black text-white mb-4 tracking-tighter">
                            Analysis{" "}
                            <span className="text-indigo-500 italic">Core</span>
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                            Each module below represents a critical barrier in
                            modern hiring. From ATS algorithms to direct
                            recruiter oversight, we cover it all.
                        </p>
                    </div>

                    {Object.entries(data).map(([moduleName, moduleData]) => {
                        const Icon =
                            MODULE_ICONS[
                                moduleName as keyof typeof MODULE_ICONS
                            ] || LightningBoltIcon;
                        const description =
                            MODULE_DESCRIPTIONS[
                                moduleName as keyof typeof MODULE_DESCRIPTIONS
                            ] || "";

                        return (
                            <div key={moduleName} className="mb-24 last:mb-0">
                                <header className="flex flex-col md:flex-row md:items-end gap-6 mb-10 border-b border-slate-800/50 pb-8">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 shadow-inner">
                                                <Icon className="w-6 h-6 text-indigo-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-white tracking-tight">
                                                    {moduleName}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                        Section Status:
                                                    </span>
                                                    <span
                                                        className={`text-[10px] font-bold uppercase ${moduleData.module_score >= 80 ? "text-emerald-400" : "text-amber-400"}`}
                                                    >
                                                        {moduleData.module_score >=
                                                        80
                                                            ? "Optimized"
                                                            : "Warning"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-400 font-medium leading-relaxed bg-slate-900/40 p-5 rounded-2xl border border-slate-800/30">
                                            {description}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center sm:items-end gap-2">
                                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
                                            Internal Score
                                        </span>
                                        <div className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-2xl font-black text-indigo-400 shadow-xl shadow-indigo-500/5">
                                            {moduleData.module_score}
                                            <span className="text-[10px] text-slate-600 ml-1">
                                                /100
                                            </span>
                                        </div>
                                    </div>
                                </header>

                                <div className="grid grid-cols-1 gap-6">
                                    {Object.entries(
                                        moduleData as Record<
                                            string,
                                            CheckResult | number
                                        >,
                                    ).map(([key, result]) => {
                                        if (key === "module_score") return null;
                                        return (
                                            <FeedbackSection
                                                key={key}
                                                moduleTitle={moduleName}
                                                name={key}
                                                result={result as CheckResult}
                                                scrollRef={setItemRef(key)}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </section>

                <footer className="py-20 text-center border-t border-slate-800/30 opacity-50">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">
                        ProFile AI Resume Analyst • 2026 Edition
                    </p>
                </footer>
            </main>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #1e293b;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #334155;
                }

                @keyframes bounce-subtle {
                    0%,
                    100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-5px);
                    }
                }
                .animate-bounce-subtle {
                    animation: bounce-subtle 3s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
}
