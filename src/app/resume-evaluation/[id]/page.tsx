import EvaluationView from "../EvaluationView";
import { mockEvaluationData } from "../mockData";

export default async function DynamicResumeEvaluationPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    console.log("Loading evaluation (Server) for ID:", id);

    return <EvaluationView data={mockEvaluationData} />;
}
