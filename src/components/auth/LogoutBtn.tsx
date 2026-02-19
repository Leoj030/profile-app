"use client"

import { Button } from "@/components/ui/Button";
import { signOut } from "@/app/actions/auth/signout";

export default function LogoutBtn() {
    return (
        <>
            <Button className="btn btn-primary h-13 lg:h-15 w-full text-lg" onClick={signOut}>
                Logout
            </Button>
        </>
    );
}
