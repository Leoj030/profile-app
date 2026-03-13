"use server";

import { createClient } from "@/lib/supabase/server";
import uploadFile from "@/lib/supabase/uploadFile";
import post from "@/lib/supabase/post";

export async function completeOnboarding(formData: FormData) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Not authenticated" };
    }

    const username = formData.get("username") as string;
    const avatar = formData.get("avatar") as File | null;
    const path = formData.get("path") as string;

    if (!username) {
        return { error: "Username is required" };
    }

    let profilePicReference = "";

    // Upload avatar if provided
    if (avatar && avatar.size > 0) {
        const ext = avatar.name.split(".").pop() || "png";
        const filename = `${user.id}_${Date.now()}.${ext}`;

        try {
            await uploadFile({
                file: avatar,
                bucketName: "UserProfilePic",
                filename,
                filetype: avatar.type,
            });

            profilePicReference = filename;
        } catch (err) {
            console.error("Avatar upload error:", err);
            return { error: "Failed to upload profile picture" };
        }
    }

    // Insert profile into profiles table (user_role FK: 1=SEEKER, 2=RECRUITER)
    const roleId = path === "recruiter" ? 2 : 1;
    try {
        await post(
            {
                id: user.id,
                username,
                profile_pic_reference: profilePicReference,
                user_role: roleId,
            },
            "profiles"
        );
    } catch (err) {
        console.error("Profile insert error:", err);
        return { error: "Failed to save profile" };
    }

    return { success: true };
}
