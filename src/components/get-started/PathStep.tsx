"use client";

import { useState } from "react";

export type UserPath = "job_seeker" | "recruiter";

interface PathStepProps {
    onFinish: (path: UserPath) => void;
    onBack: () => void;
}

const PATHS: {
    id: UserPath;
    label: string;
    description: string;
    icon: React.ReactNode;
    gradient: string;
}[] = [
    {
        id: "job_seeker",
        label: "Job Seeker",
        description:
            "Find your dream role, polish your resume, and track your applications",
        gradient: "from-violet-600/30 to-purple-700/20",
        icon: (
            <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                className="text-purple-400"
            >
                <rect
                    x="4"
                    y="10"
                    width="20"
                    height="14"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
                <path
                    d="M9 10V7a5 5 0 0 1 10 0v3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <circle cx="14" cy="17" r="2" fill="currentColor" />
            </svg>
        ),
    },
    {
        id: "recruiter",
        label: "Recruiter",
        description:
            "Source top talent, evaluate resumes, and build your dream team faster",
        gradient: "from-blue-600/30 to-cyan-700/20",
        icon: (
            <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                className="text-blue-400"
            >
                <circle
                    cx="10"
                    cy="10"
                    r="5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
                <circle
                    cx="20"
                    cy="10"
                    r="5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
                <path
                    d="M2 24c0-4 3.6-7 8-7M18 24c0-4 3.6-7 8-7M14 17a7 7 0 0 1 4 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
];

export default function PathStep({ onFinish, onBack }: PathStepProps) {
    const [selected, setSelected] = useState<UserPath | null>(null);

    const handleFinish = () => {
        if (!selected) return;
        onFinish(selected);
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full">
            {/* Header */}
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                    Choose your path
                </h2>
                <p className="text-white/50 text-sm">
                    We&apos;ll tailor your experience based on your goal
                </p>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-3 w-full max-w-xs">
                {PATHS.map((path) => {
                    const isDisabled = path.id === "recruiter";

                    return (
                        <button
                            key={path.id}
                            disabled={isDisabled}
                            onClick={() => !isDisabled && setSelected(path.id)}
                            className={`
                                relative flex items-start gap-4 p-5 rounded-2xl border text-left
                                transition-all duration-200 group
                                bg-linear-to-br ${path.gradient}
                                ${
                                    isDisabled
                                        ? "opacity-60 cursor-not-allowed border-white/5 grayscale-[0.8]"
                                        : selected === path.id
                                          ? path.id === "job_seeker"
                                              ? "border-purple-500/60 ring-2 ring-purple-500/20 cursor-pointer"
                                              : "border-blue-500/60 ring-2 ring-blue-500/20 cursor-pointer"
                                          : "border-white/8 hover:border-white/20 cursor-pointer"
                                }
                            `}
                        >
                            <div
                                className={`
                                mt-0.5 p-2.5 rounded-xl shrink-0 transition-all duration-200
                                ${path.id === "job_seeker" ? "bg-purple-500/15" : "bg-blue-500/15"}
                            `}
                            >
                                {path.icon}
                            </div>

                            <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                    <p className="text-white font-semibold text-sm">
                                        {path.label}
                                    </p>
                                    {isDisabled && (
                                        <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] uppercase tracking-wider text-white/50 border border-white/10">
                                            Coming Soon
                                        </span>
                                    )}
                                </div>
                                <p className="text-white/45 text-xs leading-relaxed">
                                    {path.description}
                                </p>
                            </div>

                            {/* Selection indicator */}
                            {!isDisabled && (
                                <div
                                    className={`
                                    w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center
                                    transition-all duration-200
                                    ${
                                        selected === path.id
                                            ? path.id === "job_seeker"
                                                ? "border-purple-400 bg-purple-500"
                                                : "border-blue-400 bg-blue-500"
                                            : "border-white/20"
                                    }
                                `}
                                >
                                    {selected === path.id && (
                                        <svg
                                            width="10"
                                            height="10"
                                            viewBox="0 0 10 10"
                                            fill="none"
                                        >
                                            <path
                                                d="M2 5L4.5 7.5L8.5 3"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Actions */}
            <div className="w-full max-w-xs flex flex-col gap-2">
                <button
                    onClick={handleFinish}
                    disabled={!selected}
                    className={`
                        w-full py-3 rounded-xl font-semibold text-sm tracking-wide
                        transition-all duration-200 cursor-pointer
                        ${
                            selected
                                ? "bg-purple-600 hover:bg-purple-500 text-white"
                                : "bg-white/5 text-white/20 cursor-not-allowed"
                        }
                    `}
                >
                    Get started
                </button>
                <button
                    onClick={onBack}
                    className="w-full py-3 rounded-xl text-sm text-white/40 hover:text-white/70 transition-colors duration-200 cursor-pointer"
                >
                    Back
                </button>
            </div>
        </div>
    );
}
