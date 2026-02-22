export interface CheckResult {
    passed: boolean;
    feedback: string;
    weak_verbs_found?: string[];
    suggested_improvements?: string[];
    found_pronouns?: string[];
    found_buzzwords?: string[];
    corrections_needed?: string[];
    niche_skills_found?: string[];
    suggested_umbrella_terms?: string[];
    missing?: string[];
    is_fresh_grad?: boolean;
}

export interface ModuleData {
    module_score: number;
    [key: string]: number | CheckResult;
}

export interface EvaluationData {
    "Structure & Oranization": ModuleData;
    "Language & Mechanics": ModuleData;
    "Impact & Metrics": ModuleData;
    "ATS Keyword Optimization": ModuleData;
}
