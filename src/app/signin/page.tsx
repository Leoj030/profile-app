import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function LoginPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen bg-[#0f1629] text-slate-300 font-sans flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] -z-10" />

            {/* Main Card */}
            <div className="w-full max-w-md relative z-10">
                <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800/60 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col items-center">
                    {/* Logo/Icon */}
                    <div className="w-16 h-16 bg-linear-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/10">
                        <h1 className="montserrat-alternates text-3xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            P
                        </h1>
                    </div>

                    <h1 className="text-3xl font-black text-white text-center tracking-tight mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-slate-400 text-center mb-10 text-sm">
                        Sign in to access your dashboard and resume evaluations
                    </p>

                    <div className="w-full">
                        <GoogleSignInButton />
                    </div>

                    <p className="text-xs text-slate-500 text-center mt-8">
                        By continuing, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    );
}
