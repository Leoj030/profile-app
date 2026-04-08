import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/supabase/auth/getCurrentUser";
import { createClient } from "@/lib/supabase/server";
import PostJobForm from "@/components/dashboard/PostJobForm";

export const metadata = {
    title: "Post a Job | Dashboard",
    description: "Create and publish a new job posting to attract top talent.",
};

export default async function PostJobPage() {
    const user = await getCurrentUser();
    const supabase = await createClient();

    const { data: profile } = await supabase
        .from("profiles")
        .select("user_role")
        .eq("id", user.id)
        .single();

    if (profile?.user_role !== 2) {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen bg-[#1a2340] text-slate-300 font-sans pt-32 pb-20">
            {/* Background grid */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(103,95,174,0.12) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 py-10">
                {/* Page Header */}
                <section className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <a
                            href="/dashboard"
                            className="text-slate-500 hover:text-slate-300 transition-colors text-sm flex items-center gap-1.5"
                        >
                            <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                                <path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                            </svg>
                            Back to Dashboard
                        </a>
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
                        Post a New Job
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Fill in the details below to attract the right candidates.
                    </p>
                </section>

                {/* Form */}
                <PostJobForm />
            </div>
        </div>
    );
}
