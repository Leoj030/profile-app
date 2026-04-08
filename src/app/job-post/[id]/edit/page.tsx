import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PostJobForm from "@/components/dashboard/PostJobForm";

interface JobPost {
    id: string;
    title: string;
    company: string;
    location: string;
    job_type: string;
    experience_level: string;
    salary_min: number | null;
    salary_max: number | null;
    salary_currency: string;
    description: string;
    requirements: string;
    nice_to_have: string | null;
    application_deadline: string | null;
    skills: string[];
    status: string;
    recruiter_id: string;
    created_at: string;
}

export default async function EditJobPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    // Check authentication
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        // Not authenticated - redirect to sign in
        redirect(`/signin?redirect=/job-post/${id}/edit`);
    }

    // Fetch the job post
    const { data: job, error } = await supabase
        .from("job_posts")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !job) {
        notFound();
    }

    // Check ownership
    if (job.recruiter_id !== user.id) {
        // Not the owner - redirect to public view
        redirect(`/job-post/${id}`);
    }

    // Verify recruiter role
    const { data: profile } = await supabase
        .from("profiles")
        .select("user_role")
        .eq("id", user.id)
        .single();

    if (profile?.user_role !== 2) {
        redirect("/dashboard");
    }

    const post = job as JobPost;

    return (
        <div className="min-h-screen bg-[#1a2340] text-slate-300 font-sans">
            {/* Background grid */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(103,95,174,0.12) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            <main className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 pt-32 pb-12">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
                        Edit Job Post
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Update the details for &quot;{post.title}&quot;
                    </p>
                </div>

                {/* Form */}
                <PostJobForm
                    job={{
                        id: post.id,
                        title: post.title,
                        company: post.company,
                        location: post.location,
                        job_type: post.job_type,
                        experience_level: post.experience_level,
                        salary_min: post.salary_min,
                        salary_max: post.salary_max,
                        salary_currency: post.salary_currency,
                        description: post.description,
                        requirements: post.requirements,
                        nice_to_have: post.nice_to_have,
                        application_deadline: post.application_deadline,
                        skills: post.skills || [],
                        status: post.status,
                    }}
                />
            </main>
        </div>
    );
}
