"use client";

import { useState } from "react";
import Link from "next/link";
import StepIndicator from "./StepIndicator";
import AvatarStep from "./AvatarStep";
import UsernameStep from "./UsernameStep";
import PathStep, { type UserPath } from "./PathStep";

type OnboardingData = {
    avatar: string;
    username: string;
    path: UserPath | null;
};

const STEP_LABELS = ["Avatar", "Username", "Path"];

export default function OnboardingShell() {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState<"forward" | "back">("forward");
    const [data, setData] = useState<OnboardingData>({
        avatar: "",
        username: "",
        path: null,
    });
    const [done, setDone] = useState(false);

    const goForward = () => {
        setDirection("forward");
        setStep((s) => s + 1);
    };
    const goBack = () => {
        setDirection("back");
        setStep((s) => s - 1);
    };

    const handleAvatarDone = (avatar: string) => {
        setData((d) => ({ ...d, avatar }));
        goForward();
    };
    const handleUsernameDone = (username: string) => {
        setData((d) => ({ ...d, username }));
        goForward();
    };
    const handlePathDone = (path: UserPath) => {
        setData((d) => ({ ...d, path }));
        setDone(true);
    };

    // Success screen
    if (done) {
        return (
            <div className="flex flex-col items-center gap-6 text-center">
                <div className="w-20 h-20 rounded-full bg-purple-600/20 flex items-center justify-center ring-4 ring-purple-500/30">
                    <svg
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                        className="text-purple-400"
                    >
                        <path
                            d="M7 18L14 25L29 11"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-white">
                        You&apos;re all set!
                    </h2>
                    <p className="text-white/50 text-sm max-w-xs">
                        Welcome to ProFile,{" "}
                        <span className="text-purple-300 font-medium">
                            @{data.username}
                        </span>
                        . Your journey as a{" "}
                        <span className="text-purple-300 font-medium">
                            {data.path === "job_seeker"
                                ? "Job Seeker"
                                : "Recruiter"}
                        </span>{" "}
                        starts now.
                    </p>
                </div>
                <Link
                    href="/"
                    className="mt-2 px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-xl transition-colors duration-200"
                >
                    Go to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-10 w-full">
            {/* Step Indicator */}
            <StepIndicator
                currentStep={step}
                totalSteps={3}
                labels={STEP_LABELS}
            />

            {/* Step Content with fade transition */}
            <div
                key={`${step}-${direction}`}
                className="w-full flex flex-col items-center animate-fade-in"
            >
                {step === 1 && <AvatarStep onNext={handleAvatarDone} />}
                {step === 2 && (
                    <UsernameStep onNext={handleUsernameDone} onBack={goBack} />
                )}
                {step === 3 && (
                    <PathStep onFinish={handlePathDone} onBack={goBack} />
                )}
            </div>
        </div>
    );
}
