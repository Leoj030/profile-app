'use client'

import { Button } from "@/components/ui/Button";
import { LogosGoogleIcon } from "@/components/GoogleIcon";
import { createClient } from "@/lib/supabase/client";

export function GoogleSignInButton() {
    async function signInWithGoogle() {
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
    return (
        <Button className="btn btn-primary btn-wide" onClick={signInWithGoogle}>
            <LogosGoogleIcon className="w-4 h-4"/>
            Signin with Google
        </Button>
    );
}
