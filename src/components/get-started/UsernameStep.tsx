"use client";

import { useState } from "react";

interface UsernameStepProps {
    onNext: (username: string) => void;
    onBack: () => void;
}

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;

export default function UsernameStep({ onNext, onBack }: UsernameStepProps) {
    const [username, setUsername] = useState("");
    const [touched, setTouched] = useState(false);

    const isValid = USERNAME_REGEX.test(username);
    const showError = touched && username.length > 0 && !isValid;
    const showSuccess = isValid && username.length > 0;

    const handleNext = () => {
        if (!isValid) {
            setTouched(true);
            return;
        }
        onNext(username.toLowerCase());
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleNext();
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full">
            {/* Header */}
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                    Set your username
                </h2>
                <p className="text-white/50 text-sm">
                    This is how others will find you on ProFile
                </p>
            </div>

            {/* Input */}
            <div className="w-full max-w-xs space-y-3">
                <div
                    className={`
                    relative flex items-center gap-2 px-4 py-3.5 rounded-xl border
                    transition-all duration-200 bg-white/5
                    ${
                        showError
                            ? "border-red-500/60 ring-2 ring-red-500/20"
                            : showSuccess
                              ? "border-purple-500/60 ring-2 ring-purple-500/20"
                              : "border-white/10 focus-within:border-purple-500/50 focus-within:ring-2 focus-within:ring-purple-500/15"
                    }
                `}
                >
                    <span className="text-white/30 text-sm font-medium select-none">
                        @
                    </span>
                    <input
                        type="text"
                        value={username}
                        maxLength={20}
                        placeholder="your_username"
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setTouched(true);
                        }}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent text-white placeholder-white/20 text-sm outline-none font-medium"
                        autoFocus
                    />
                    {showSuccess && (
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="text-purple-400 shrink-0"
                        >
                            <path
                                d="M3 8L6.5 11.5L13 5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </div>

                {/* Hint or Error */}
                <div className="min-h-[18px]">
                    {showError ? (
                        <p className="text-red-400 text-xs px-1">
                            3–20 characters · letters, numbers, and underscores
                            only
                        </p>
                    ) : (
                        <p className="text-white/25 text-xs px-1">
                            3–20 characters · letters, numbers, underscores
                        </p>
                    )}
                </div>
            </div>

            {/* Char count */}
            <div className="w-full max-w-xs flex justify-end -mt-5">
                <span
                    className={`text-xs transition-colors duration-200 ${username.length >= 18 ? "text-amber-400" : "text-white/20"}`}
                >
                    {username.length}/20
                </span>
            </div>

            {/* Actions */}
            <div className="w-full max-w-xs flex flex-col gap-2">
                <button
                    onClick={handleNext}
                    disabled={!isValid}
                    className={`
                        w-full py-3 rounded-xl font-semibold text-sm tracking-wide
                        transition-all duration-200 cursor-pointer
                        ${
                            isValid
                                ? "bg-purple-600 hover:bg-purple-500 text-white"
                                : "bg-white/5 text-white/20 cursor-not-allowed"
                        }
                    `}
                >
                    Continue
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
