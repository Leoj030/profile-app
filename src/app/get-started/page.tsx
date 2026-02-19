import OnboardingShell from "@/components/get-started/OnboardingShell";

export const metadata = {
    title: "Get Started · ProFile",
    description: "Set up your ProFile account",
};

export default function GetStarted() {
    return (
        /**
         * Full-screen fixed overlay so this page sits above the root layout's
         * Header and Footer — no layout.tsx changes needed.
         */
        <div className="fixed inset-0 z-200 bg-[#0f1629] flex flex-col items-center justify-center overflow-y-auto">
            {/* Subtle background radial dots (matching global .hero style) */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(103,95,174,0.18) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            {/* Ambient glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-purple-700/10 blur-[120px] pointer-events-none" />

            {/* Card */}
            <div className="relative z-10 w-full max-w-md mx-auto px-6 py-14">
                {/* Logo */}
                <div className="flex justify-center mb-12">
                    <span className="montserrat-alternates text-3xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-violet-300">
                        ProFile
                    </span>
                </div>

                {/* Glass card */}
                <div className="bg-white/3 border border-white/8 rounded-3xl px-8 py-10 backdrop-blur-sm shadow-2xl shadow-black/40">
                    <OnboardingShell />
                </div>

                {/* Footer note */}
                <p className="text-center text-white/20 text-xs mt-8">
                    By continuing, you agree to our{" "}
                    <a
                        href="#"
                        className="underline underline-offset-2 hover:text-white/50 transition-colors"
                    >
                        Terms
                    </a>{" "}
                    and{" "}
                    <a
                        href="#"
                        className="underline underline-offset-2 hover:text-white/50 transition-colors"
                    >
                        Privacy Policy
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}
