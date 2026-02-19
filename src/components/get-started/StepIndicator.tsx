interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
    labels?: string[];
}

export default function StepIndicator({
    currentStep,
    totalSteps,
    labels,
}: StepIndicatorProps) {
    return (
        <div className="flex items-center justify-center gap-3">
            {Array.from({ length: totalSteps }).map((_, i) => {
                const step = i + 1;
                const isCompleted = step < currentStep;
                const isCurrent = step === currentStep;

                return (
                    <div key={i} className="flex items-center gap-3">
                        <div className="flex flex-col items-center gap-1.5">
                            <div
                                className={`
                                    w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold
                                    transition-all duration-500 ease-out
                                    ${
                                        isCompleted
                                            ? "bg-purple-500 text-white scale-90"
                                            : isCurrent
                                              ? "bg-purple-600 text-white ring-4 ring-purple-500/30 scale-110"
                                              : "bg-white/10 text-white/30"
                                    }
                                `}
                            >
                                {isCompleted ? (
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                    >
                                        <path
                                            d="M2.5 7L5.5 10L11.5 4"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                ) : (
                                    step
                                )}
                            </div>
                            {labels?.[i] && (
                                <span
                                    className={`text-[10px] font-medium tracking-wide transition-colors duration-300 ${isCurrent ? "text-purple-400" : "text-white/30"}`}
                                >
                                    {labels[i]}
                                </span>
                            )}
                        </div>

                        {i < totalSteps - 1 && (
                            <div className="w-12 h-px mb-5 bg-white/10 relative overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-purple-500 transition-transform duration-500 ease-out origin-left"
                                    style={{
                                        transform: isCompleted
                                            ? "scaleX(1)"
                                            : "scaleX(0)",
                                    }}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
