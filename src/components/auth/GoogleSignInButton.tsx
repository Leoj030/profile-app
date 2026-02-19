import { Button } from "@/components/ui/Button";
import { LogosGoogleIcon } from "@/components/GoogleIcon";
import { signInWithGoogle } from "@/app/actions/auth/signin";

export function GoogleSignInButton() {
    return (
        <Button className="btn btn-primary btn-wide" onClick={signInWithGoogle}>
            <LogosGoogleIcon className="w-4 h-4"/>
            Signin with Google
        </Button>
    );
}
