"use server";

import { createClient } from "@/lib/supabase/server";
import post from "@/lib/supabase/post";

export async function createJobPost(formData: FormData) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Not authenticated" };
    }

    // Verify recruiter role
    const { data: profile } = await supabase
        .from("profiles")
        .select("user_role")
        .eq("id", user.id)
        .single();

    if (profile?.user_role !== 2) {
        return { error: "Unauthorized: Recruiter role required" };
    }

    const title = formData.get("title") as string;
    const company = formData.get("company") as string;
    const location = formData.get("location") as string;
    const job_type = formData.get("job_type") as string;
    const experience_level = formData.get("experience_level") as string;
    const salary_currency = (formData.get("salary_currency") as string) || "USD";
    const salary_min = formData.get("salary_min") ? Number(formData.get("salary_min")) : null;
    const salary_max = formData.get("salary_max") ? Number(formData.get("salary_max")) : null;
    const description = formData.get("description") as string;
    const requirements = formData.get("requirements") as string;
    const nice_to_have = (formData.get("nice_to_have") as string) || null;
    const application_deadline = (formData.get("application_deadline") as string) || null;
    const skillsRaw = (formData.get("skills") as string) || "[]";
    const status = (formData.get("status") as string) || "draft";

    if (!title || !company || !location || !job_type || !experience_level || !description || !requirements) {
        return { error: "Please fill in all required fields." };
    }

    let skills: string[] = [];
    try {
        skills = JSON.parse(skillsRaw);
    } catch {
        skills = [];
    }

    try {
        const newId = await post(
            {
                recruiter_id: user.id,
                title,
                company,
                location,
                job_type,
                experience_level,
                salary_currency,
                salary_min,
                salary_max,
                description,
                requirements,
                nice_to_have,
                application_deadline: application_deadline || null,
                skills,
                status,
            },
            "job_posts"
        );

        return { success: true, id: newId as string };
    } catch (err) {
        console.error("Job post insert error:", err);
        return { error: "Failed to create job post. Please try again." };
    }
}
