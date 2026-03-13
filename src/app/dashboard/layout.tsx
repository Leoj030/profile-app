import { getCurrentUser } from "@/lib/supabase/auth/getCurrentUser";
import { createClient } from "@/lib/supabase/server";
import DashboardHeader from "@/components/DashboardHeader";
import getFile from "@/lib/supabase/getFile";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getCurrentUser();
    const supabase = await createClient();

    const displayName =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email ||
        "User";

    // Fetch profile pic reference
    let avatarUrl: string | undefined;
    const { data: profile } = await supabase
        .from("profiles")
        .select("profile_pic_reference")
        .eq("id", user.id)
        .single();

    if (profile?.profile_pic_reference) {
        try {
            avatarUrl = await getFile("UserProfilePic", profile.profile_pic_reference);
        } catch {
            // Fallback to no avatar
        }
    }

    return (
        <>
            <DashboardHeader avatarUrl={avatarUrl} displayName={displayName} />
            {children}
        </>
    );
}
