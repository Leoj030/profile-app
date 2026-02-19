import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="hero relative z-10 flex flex-col items-center pt-32 lg:pt-48 w-full min-h-[70vh] justify-center overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] -z-10" />

            <div className="max-w-4xl px-4 flex flex-col items-center text-center">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] hero-animation">
                    Where AI Meets{" "}
                    <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent whitespace-nowrap">
                        Careers
                    </span>
                    <br />
                    <span className="text-slate-300 mt-4 block">
                        Smarter Resumes, Better Hiring
                    </span>
                </h1>

                <p className="mt-8 text-lg sm:text-xl text-slate-400 font-normal max-w-2xl hero-animation-delay-1 leading-relaxed">
                    Elevate your professional journey with AI-driven resume
                    optimization and intelligent screening tools designed for
                    the modern job market.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12 w-full hero-animation-delay-2">
                    <Link
                        href="/get-started"
                        className="w-full sm:w-auto"
                    >
                        <Button className="w-full px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-semibold text-lg transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] active:scale-95">
                            Get Started
                        </Button>
                    </Link>
                    <Link href="/resume-evaluation" className="w-full sm:w-auto">
                        <Button className="w-full px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 text-white border border-slate-700 rounded-xl font-semibold text-lg transition-all backdrop-blur-sm active:scale-95">
                            Check Resume
                        </Button>
                    </Link>
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
        </section>
    );
}
