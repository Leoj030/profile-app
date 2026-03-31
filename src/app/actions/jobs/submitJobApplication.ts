"use server";

import { createClient } from "@/lib/supabase/server";
import uploadFile from "@/lib/supabase/uploadFile";
import post from "@/lib/supabase/post";

export async function submitJobApplication(formData: FormData) {
    const supabase = await createClient();

    // Attach applicant_id if logged in (optional — guests can also apply)
    const { data: { user } } = await supabase.auth.getUser();

    const job_post_id = formData.get("job_post_id") as string;
    const full_name = formData.get("full_name") as string;
    const email = formData.get("email") as string;
    const phone = (formData.get("phone") as string) || null;
    const linkedin_url = (formData.get("linkedin_url") as string) || null;
    const portfolio_url = (formData.get("portfolio_url") as string) || null;
    const cover_letter = (formData.get("cover_letter") as string) || null;
    const years_experience = formData.get("years_experience")
        ? Number(formData.get("years_experience"))
        : null;
    const current_position = (formData.get("current_position") as string) || null;
    const current_company = (formData.get("current_company") as string) || null;
    const resume = formData.get("resume") as File | null;

    if (!job_post_id || !full_name || !email) {
        return { error: "Name and email are required." };
    }

    let resume_reference: string | null = null;

    if (resume && resume.size > 0) {
        if (resume.size > 5 * 1024 * 1024) {
            return { error: "Resume must be smaller than 5 MB." };
        }

        const ext = resume.name.split(".").pop() || "pdf";
        const filename = `${job_post_id}_${Date.now()}.${ext}`;

        try {
            await uploadFile({
                file: resume,
                bucketName: "ApplicationResumes",
                filename,
                filetype: resume.type,
            });
            resume_reference = filename;
        } catch (err) {
            console.error("Resume upload error:", err);
            return { error: "Failed to upload resume. Please try again." };
        }
    }

    try {
        await post(
            {
                job_post_id,
                applicant_id: user?.id ?? null,
                full_name,
                email,
                phone,
                linkedin_url,
                portfolio_url,
                cover_letter,
                resume_reference,
                years_experience,
                current_position,
                current_company,
            },
            "job_applications"
        );
    } catch (err) {
        console.error("Application insert error:", err);
        return { error: "Failed to submit application. Please try again." };
    }

    return { success: true };
}
