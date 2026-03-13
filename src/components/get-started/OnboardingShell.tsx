"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StepIndicator from "./StepIndicator";
import AvatarStep from "./AvatarStep";
import UsernameStep from "./UsernameStep";
import PathStep, { type UserPath } from "./PathStep";
import { completeOnboarding } from "@/app/actions/onboarding/completeOnboarding";

type OnboardingData = {
    avatar: File | null;
    username: string;
    path: UserPath | null;
};

const STEP_LABELS = ["Avatar", "Username", "Path"];

export default function OnboardingShell() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState<"forward" | "back">("forward");
    const [data, setData] = useState<OnboardingData>({
        avatar: null,
        username: "",
        path: null,
    });
    const [done, setDone] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const goForward = () => {
        setDirection("forward");
        setStep((s) => s + 1);
    };
    const goBack = () => {
        setDirection("back");
        setStep((s) => s - 1);
    };

    const handleAvatarDone = (avatarFile: File | null) => {
        setData((d) => ({ ...d, avatar: avatarFile }));
        goForward();
    };
    const handleUsernameDone = (username: string) => {
        setData((d) => ({ ...d, username }));
        goForward();
    };
    const handlePathDone = async (path: UserPath) => {
        setData((d) => ({ ...d, path }));
        setSubmitting(true);
        setError(null);

        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("path", path);
        if (data.avatar) {
            formData.append("avatar", data.avatar);
        }

        const result = await completeOnboarding(formData);

        if (result.error) {
            setError(result.error);
            setSubmitting(false);
            return;
        }

        setSubmitting(false);
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
                <button
                    onClick={() => router.push("/dashboard")}
                    className="mt-2 px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-xl transition-colors duration-200 cursor-pointer"
                >
                    Go to Dashboard
                </button>
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

            {/* Error message */}
            {error && (
                <div className="w-full max-w-xs text-center">
                    <p className="text-red-400 text-sm">{error}</p>
                </div>
            )}

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
                    <PathStep
                        onFinish={handlePathDone}
                        onBack={goBack}
                        submitting={submitting}
                    />
                )}
            </div>
        </div>
    );
}
