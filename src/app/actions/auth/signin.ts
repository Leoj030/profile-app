'use server';

import { createClient } from "@/lib/supabase/server";

export async function signInWithGoogle() {
    const supabase = await createClient();
        
    const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            queryParams: {
                prompt: 'select_account',
            },
            redirectTo: `${process.env.NEXT_PUBLIC_BACKEND_BASE}/auth/callback`,
        },
    });

    if (error) throw new Error(error.message);
};