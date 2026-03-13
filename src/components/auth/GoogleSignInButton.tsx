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
        <Button 
            className="w-full h-12 flex items-center justify-center gap-3 bg-[#ffffff] hover:bg-slate-100 text-slate-800 rounded-xl font-semibold shadow-md active:scale-[0.98] transition-all border border-slate-200" 
            onClick={signInWithGoogle}
        >
            <LogosGoogleIcon className="w-5 h-5"/>
            Sign in with Google
        </Button>
    );
}
