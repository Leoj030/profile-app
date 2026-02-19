import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

export default async function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-15 h-screen">
            <h1 className="text-4xl font-bold text-center">
                Sign in to access all the dashboard
            </h1>
            <GoogleSignInButton />
        </div>
    );
}
