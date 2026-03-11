import { createClient } from "@/lib/supabase/server";
import EvaluationViewWrapper from "../EvaluationViewWrapper";
import { EvaluationData } from "../types";
import ResultSkeleton from "./ResultSkeleton";
import getFile from "@/lib/supabase/getFile";

export default async function ResultPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
    const params = await searchParams;
    const id = params.id;

    if (!id) {
        return <ResultSkeleton />;
    }

    const supabase = await createClient();
    
    // We use auth.getUser() directly because getCurrentUser() throws a redirect for unauthenticated users
    const { data: { user } } = await supabase.auth.getUser();

    let rawData = null;

    if (user) {
        // Find in authenticated_results ensuring it's the owner's
        const { data } = await supabase
            .from("authenticated_results")
            .select("result, reference_id")
            .eq("id", id)
            .eq("owner_id", user.id)
            .single();
            
        if (data) rawData = data;
    }

    if (!rawData) {
        // Fallback or unauthenticated search
        const { data } = await supabase
            .from("public_results")
            .select("result, reference_id")
            .eq("id", id)
            .single();

        if (data) rawData = data;
    }

    if (!rawData || !rawData.result) {
        return (
            <div className="min-h-screen bg-[#0f1629] text-slate-300 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white mb-4">Evaluation Not Found</h1>
                    <p className="text-slate-400">It may have been deleted, or you might not have access if it belongs to someone else.</p>
                </div>
            </div>
        );
    }

    const evaluationData: EvaluationData = {
        "Structure & Organization": rawData.result.module1,
        "Language & Mechanics": rawData.result.module2,
        "Impact & Metrics": rawData.result.module3,
        "ATS Keyword Optimization": rawData.result.module4,
    };

    let pdfUrl = "";
    if (rawData.reference_id) {
        try {
            pdfUrl = await getFile("ResumePDF", rawData.reference_id);
        } catch (error) {
            console.error("Failed to load PDF preview:", error);
        }
    }

    return <EvaluationViewWrapper data={evaluationData} pdfUrl={pdfUrl} />;
}
