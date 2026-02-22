import { EvaluationData } from "./types";

export const mockEvaluationData: EvaluationData = {
    "Structure & Oranization": {
        "module_score": 85,
        "standard_headings": {
            "passed": true,
            "feedback": "Standard headings like 'Experience' and 'Education' were correctly identified."
        },
        "core_sections": {
            "passed": false,
            "feedback": "Your resume is missing some core competitive sections.",
            "missing": ["Certifications", "Professional Summary"]
        },
        "timeline_and_gaps": {
            "passed": true,
            "feedback": "Career timeline is clear and professional.",
            "is_fresh_grad": false
        },
        "text_density": {
            "passed": true,
            "feedback": "Text density is optimal for readability."
        }
    },
    "Language & Mechanics": {
        "module_score": 92,
        "pronoun_usage": {
            "passed": true,
            "feedback": "No personal pronouns found, which is excellent.",
            "found_pronouns": []
        },
        "active_voice": {
            "passed": true,
            "feedback": "Consistent use of active voice."
        },
        "buzzwords": {
            "passed": false,
            "feedback": "Avoid using overused buzzwords.",
            "found_buzzwords": ["synergy", "thought-leader"]
        },
        "grammar": {
            "passed": true,
            "feedback": "Perfect grammar and spelling.",
            "corrections_needed": []
        }
    },
    "Impact & Metrics": {
        "module_score": 65,
        "action_verbs": {
            "passed": true,
            "feedback": "Action verbs are strong.",
            "weak_verbs_found": []
        },
        "metrics_and_numbers": {
            "passed": false,
            "feedback": "Missing key performance indicators.",
            "suggested_improvements": ["Quantify growth by X%", "Mention number of users"]
        },
        "bullet_length": {
            "passed": true,
            "feedback": "Lengths are good."
        }
    },
    "ATS Keyword Optimization": {
        "module_score": 78,
        "umbrella_term_mapping": {
            "passed": true,
            "feedback": "Niche skills are well-categorized.",
            "niche_skills_found": ["React.js", "Tailwind CSS"],
            "suggested_umbrella_terms": ["Frontend Development"]
        },
        "hard_skills_focus": {
            "passed": true,
            "feedback": "Good focus on technical skills."
        },
        "exact_title_match": {
            "passed": false,
            "feedback": "Resume title doesn't match the target job title exactly."
        }
    }
};
