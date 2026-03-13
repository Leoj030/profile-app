import { getCurrentUser } from "@/lib/supabase/auth/getCurrentUser";
import { createClient } from "@/lib/supabase/server";
import SeekerDashboard from "@/components/dashboard/SeekerDashboard";
import RecruiterDashboard from "@/components/dashboard/RecruiterDashboard";

export default async function DashboardPage() {
    const user = await getCurrentUser();
    const supabase = await createClient();

    // Fetch user role from profiles (user_role FK: 1=SEEKER, 2=RECRUITER)
    const { data: profileRole } = await supabase
        .from("profiles")
        .select("user_role")
        .eq("id", user.id)
        .single();

    const roleId = profileRole?.user_role || 1;

    // Recruiter dashboard (mock data for now)
    if (roleId === 2) {
        return (
            <div className="min-h-screen bg-[#0f1629] text-slate-300 font-sans pt-32 pb-20">
                <div
                    className="fixed inset-0 pointer-events-none z-0"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, rgba(103,95,174,0.12) 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                    }}
                />
                <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 py-10">
                    <RecruiterDashboard />
                </div>
            </div>
        );
    }

    // Seeker dashboard — fetch evaluation data
    const { data: profile } = await supabase
        .from("profiles")
        .select("eval_results")
        .eq("id", user.id)
        .single();

    const evalResultIds: string[] = profile?.eval_results || [];
    const totalEvaluations = evalResultIds.length;

    type EvalRow = {
        id: string;
        result: Record<string, { module_score?: number }>;
        reference_id: string;
        created_at: string;
    };

    let recentEvaluations: EvalRow[] = [];
    if (evalResultIds.length > 0) {
        const recentIds = evalResultIds.slice(-5).reverse();
        const { data } = await supabase
            .from("authenticated_results")
            .select("id, result, reference_id, created_at")
            .in("id", recentIds)
            .order("created_at", { ascending: false });

        if (data) {
            recentEvaluations = data as EvalRow[];
        }
    }

    return (
        <div className="min-h-screen bg-[#0f1629] text-slate-300 font-sans pt-32 pb-20">
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(103,95,174,0.12) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />
            <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 py-10">
                <SeekerDashboard
                    totalEvaluations={totalEvaluations}
                    recentEvaluations={recentEvaluations}
                />
            </div>
        </div>
    );
}
