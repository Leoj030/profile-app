"use client";

import dynamic from "next/dynamic";
import { EvaluationData } from "./types";

const EvaluationView = dynamic(() => import("./EvaluationView"), {
    ssr: false,
    loading: () => (
        <div className="h-screen bg-[#050810] flex items-center justify-center">
            <div className="text-slate-500 font-bold italic animate-pulse">
                Initializing AI Analyst...
            </div>
        </div>
    ),
});

export default function EvaluationViewWrapper({
    data,
    pdfUrl,
}: {
    data: EvaluationData;
    pdfUrl?: string;
}) {
    return <EvaluationView data={data} pdfUrl={pdfUrl} />;
}
