"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { createJobPost } from "@/app/actions/jobs/createJobPost";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];
const EXPERIENCE_LEVELS = ["Entry", "Mid", "Senior", "Lead", "Executive"];
const CURRENCIES = ["USD", "PHP", "EUR", "GBP", "SGD", "AUD"];

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-slate-900/60 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-5">{title}</h2>
            {children}
        </div>
    );
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
    return (
        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
            {children}
            {required && <span className="text-rose-400 ml-1">*</span>}
        </label>
    );
}

const inputClass =
    "w-full px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all";

const selectClass =
    "w-full px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-sm text-slate-300 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all appearance-none cursor-pointer";

const textareaClass =
    "w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all resize-none leading-relaxed";

export default function PostJobForm() {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);

    const [skills, setSkills] = useState<string[]>([]);
    const [skillInput, setSkillInput] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"draft" | "active">("draft");
    const [error, setError] = useState<string | null>(null);

    function addSkill(value: string) {
        const trimmed = value.trim().replace(/,$/, "").trim();
        if (trimmed && !skills.includes(trimmed) && skills.length < 20) {
            setSkills((prev) => [...prev, trimmed]);
        }
        setSkillInput("");
    }

    function handleSkillKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addSkill(skillInput);
        } else if (e.key === "Backspace" && !skillInput && skills.length > 0) {
            setSkills((prev) => prev.slice(0, -1));
        }
    }

    function removeSkill(skill: string) {
        setSkills((prev) => prev.filter((s) => s !== skill));
    }

    async function handleSubmit(status: "draft" | "active") {
        if (!formRef.current) return;
        setIsSubmitting(true);
        setSubmitStatus(status);
        setError(null);

        const formData = new FormData(formRef.current);
        formData.set("status", status);
        formData.set("skills", JSON.stringify(skills));

        const result = await createJobPost(formData);
        setIsSubmitting(false);

        if (result.error) {
            setError(result.error);
        } else if (result.id) {
            router.push(`/job-post/${result.id}`);
        } else {
            router.push("/dashboard");
        }
    }

    return (
        <form ref={formRef} onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {/* Basic Info */}
            <SectionCard title="Basic Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <FieldLabel required>Job Title</FieldLabel>
                        <input
                            id="job-title"
                            name="title"
                            type="text"
                            placeholder="e.g. Senior Software Engineer"
                            className={inputClass}
                            required
                        />
                    </div>
                    <div>
                        <FieldLabel required>Company</FieldLabel>
                        <input
                            id="job-company"
                            name="company"
                            type="text"
                            placeholder="e.g. Acme Corp"
                            className={inputClass}
                            required
                        />
                    </div>
                    <div>
                        <FieldLabel required>Location</FieldLabel>
                        <input
                            id="job-location"
                            name="location"
                            type="text"
                            placeholder="e.g. Manila, Philippines or Remote"
                            className={inputClass}
                            required
                        />
                    </div>
                    <div>
                        <FieldLabel required>Job Type</FieldLabel>
                        <div className="relative">
                            <select id="job-type" name="job_type" className={selectClass} defaultValue="">
                                <option value="" disabled>Select job type</option>
                                {JOB_TYPES.map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                            <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" width="14" height="14" viewBox="0 0 15 15" fill="none">
                                <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <FieldLabel required>Experience Level</FieldLabel>
                        <div className="relative">
                            <select id="job-experience" name="experience_level" className={selectClass} defaultValue="">
                                <option value="" disabled>Select level</option>
                                {EXPERIENCE_LEVELS.map((l) => (
                                    <option key={l} value={l}>{l}</option>
                                ))}
                            </select>
                            <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" width="14" height="14" viewBox="0 0 15 15" fill="none">
                                <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            </SectionCard>

            {/* Compensation */}
            <SectionCard title="Compensation & Deadline">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                    <div>
                        <FieldLabel>Currency</FieldLabel>
                        <div className="relative">
                            <select id="job-currency" name="salary_currency" className={selectClass} defaultValue="USD">
                                {CURRENCIES.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                            <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" width="14" height="14" viewBox="0 0 15 15" fill="none">
                                <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <FieldLabel>Min Salary</FieldLabel>
                        <input
                            id="job-salary-min"
                            name="salary_min"
                            type="number"
                            min={0}
                            placeholder="e.g. 50000"
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <FieldLabel>Max Salary</FieldLabel>
                        <input
                            id="job-salary-max"
                            name="salary_max"
                            type="number"
                            min={0}
                            placeholder="e.g. 90000"
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <FieldLabel>Application Deadline</FieldLabel>
                        <input
                            id="job-deadline"
                            name="application_deadline"
                            type="date"
                            className={inputClass + " scheme-dark"}
                        />
                    </div>
                </div>
                <p className="text-xs text-slate-600 mt-3">Leave salary blank to display &quot;Competitive / To be disclosed&quot;</p>
            </SectionCard>

            {/* Details */}
            <SectionCard title="Job Details">
                <div className="space-y-5">
                    <div>
                        <FieldLabel required>Job Description</FieldLabel>
                        <textarea
                            id="job-description"
                            name="description"
                            rows={6}
                            placeholder="Describe the role, team culture, responsibilities, and what makes this opportunity exciting..."
                            className={textareaClass}
                            required
                        />
                    </div>
                    <div>
                        <FieldLabel required>Requirements</FieldLabel>
                        <textarea
                            id="job-requirements"
                            name="requirements"
                            rows={5}
                            placeholder={`• Bachelor’s degree in CS or related field
• 3+ years of experience with React
• Strong understanding of REST APIs`}
                            className={textareaClass}
                            required
                        />
                        <p className="text-xs text-slate-600 mt-1.5">List each requirement on a new line with a bullet (•)</p>
                    </div>
                    <div>
                        <FieldLabel>Nice to Have</FieldLabel>
                        <textarea
                            id="job-nice-to-have"
                            name="nice_to_have"
                            rows={3}
                            placeholder={"• Experience with Next.js\n• Open-source contributions"}
                            className={textareaClass}
                        />
                    </div>

                    {/* Skills Tag Input */}
                    <div>
                        <FieldLabel>Required Skills</FieldLabel>
                        <div className="min-h-[48px] flex flex-wrap gap-2 px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 focus-within:border-indigo-500/60 focus-within:ring-1 focus-within:ring-indigo-500/30 transition-all">
                            {skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold"
                                >
                                    {skill}
                                    <button
                                        type="button"
                                        onClick={() => removeSkill(skill)}
                                        className="text-indigo-400 hover:text-rose-400 transition-colors leading-none"
                                        aria-label={`Remove ${skill}`}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                            <input
                                id="job-skills-input"
                                type="text"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={handleSkillKeyDown}
                                onBlur={() => skillInput && addSkill(skillInput)}
                                placeholder={skills.length === 0 ? "Type a skill and press Enter (e.g. React, TypeScript)" : ""}
                                className="flex-1 min-w-[160px] bg-transparent text-sm text-slate-200 placeholder-slate-600 focus:outline-none"
                            />
                        </div>
                        <p className="text-xs text-slate-600 mt-1.5">Press Enter or comma to add. Max 20 skills.</p>
                    </div>
                </div>
            </SectionCard>

            {/* Error */}
            {error && (
                <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm">
                    <svg width="16" height="16" viewBox="0 0 15 15" fill="none" className="shrink-0">
                        <path d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608765L0.161178 11.3368C-0.275824 12.0697 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.0697 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8227 4.5C6.8227 4.22386 7.04656 4 7.32271 4C7.59885 4 7.82271 4.22386 7.82271 4.5V8.5C7.82271 8.77614 7.59885 9 7.32271 9C7.04656 9 6.8227 8.77614 6.8227 8.5V4.5ZM7.32271 11C7.04656 11 6.8227 10.7761 6.8227 10.5C6.8227 10.2239 7.04656 10 7.32271 10C7.59885 10 7.82271 10.2239 7.82271 10.5C7.82271 10.7761 7.59885 11 7.32271 11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                    </svg>
                    {error}
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between gap-4 pt-2 flex-wrap">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-5 py-2.5 rounded-xl text-sm text-slate-400 hover:text-slate-200 border border-slate-700/50 hover:border-slate-600 transition-all"
                >
                    Cancel
                </button>
                <div className="flex items-center gap-3">
                    <button
                        id="btn-save-draft"
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => handleSubmit("draft")}
                        className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 bg-slate-800/80 border border-slate-700/50 hover:bg-slate-700/60 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting && submitStatus === "draft" ? "Saving…" : "Save as Draft"}
                    </button>
                    <button
                        id="btn-publish-job"
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => handleSubmit("active")}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting && submitStatus === "active" ? (
                            <>
                                <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                                </svg>
                                Publishing…
                            </>
                        ) : (
                            <>
                                <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                                    <path d="M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.49996C7.05005 9.74849 7.25152 9.94996 7.50005 9.94996C7.74858 9.94996 7.95005 9.74849 7.95005 9.49996V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8183 4.81828C10.994 4.64254 10.994 4.35762 10.8183 4.18188L7.81825 1.18188Z" fill="currentColor"/>
                                    <path d="M2.5 9.99997C2.77614 9.99997 3 10.2238 3 10.5V12H12V10.5C12 10.2238 12.2239 9.99997 12.5 9.99997C12.7761 9.99997 13 10.2238 13 10.5V12.5C13 12.7761 12.7761 13 12.5 13H2.5C2.22386 13 2 12.7761 2 12.5V10.5C2 10.2238 2.22386 9.99997 2.5 9.99997Z" fill="currentColor"/>
                                </svg>
                                Publish Job
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}
