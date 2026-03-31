"use client";

import { useState, useRef } from "react";
import { submitJobApplication } from "@/app/actions/jobs/submitJobApplication";

interface JobApplicationFormProps {
    jobPostId: string;
    jobTitle: string;
}

const inputClass =
    "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all";

const textareaClass =
    "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all resize-none leading-relaxed";

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
    return (
        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
            {children}{required && <span className="text-rose-400 ml-1">*</span>}
        </label>
    );
}

export default function JobApplicationForm({ jobPostId, jobTitle }: JobApplicationFormProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [resumeName, setResumeName] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!formRef.current) return;
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(formRef.current);
        formData.set("job_post_id", jobPostId);

        const result = await submitJobApplication(formData);
        setIsSubmitting(false);

        if (result.error) {
            setError(result.error);
        } else {
            setSubmitted(true);
        }
    }

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-12 px-6 gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 15 15" fill="none">
                        <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="#34d399" fillRule="evenodd" clipRule="evenodd"/>
                    </svg>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">Application Submitted!</h3>
                    <p className="text-sm text-slate-400">
                        Your application for <span className="text-indigo-400 font-medium">{jobTitle}</span> has been received. The recruiter will be in touch.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="job_post_id" value={jobPostId} />

            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <FieldLabel required>Full Name</FieldLabel>
                    <input id="apply-name" name="full_name" type="text" placeholder="Jane Doe" className={inputClass} required />
                </div>
                <div>
                    <FieldLabel required>Email</FieldLabel>
                    <input id="apply-email" name="email" type="email" placeholder="jane@email.com" className={inputClass} required />
                </div>
            </div>

            {/* Phone + Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <FieldLabel>Phone</FieldLabel>
                    <input id="apply-phone" name="phone" type="tel" placeholder="+63 912 345 6789" className={inputClass} />
                </div>
                <div>
                    <FieldLabel>Years of Experience</FieldLabel>
                    <input id="apply-experience" name="years_experience" type="number" min={0} max={50} placeholder="e.g. 4" className={inputClass} />
                </div>
            </div>

            {/* Current Role + Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <FieldLabel>Current Role</FieldLabel>
                    <input id="apply-role" name="current_position" type="text" placeholder="e.g. Frontend Developer" className={inputClass} />
                </div>
                <div>
                    <FieldLabel>Current Company</FieldLabel>
                    <input id="apply-company" name="current_company" type="text" placeholder="e.g. Acme Corp" className={inputClass} />
                </div>
            </div>

            {/* LinkedIn + Portfolio */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <FieldLabel>LinkedIn</FieldLabel>
                    <input id="apply-linkedin" name="linkedin_url" type="url" placeholder="https://linkedin.com/in/..." className={inputClass} />
                </div>
                <div>
                    <FieldLabel>Portfolio / Website</FieldLabel>
                    <input id="apply-portfolio" name="portfolio_url" type="url" placeholder="https://yoursite.com" className={inputClass} />
                </div>
            </div>

            {/* Cover Letter */}
            <div>
                <FieldLabel>Cover Letter</FieldLabel>
                <textarea
                    id="apply-cover-letter"
                    name="cover_letter"
                    rows={5}
                    placeholder="Tell the recruiter why you're a great fit for this role..."
                    className={textareaClass}
                />
            </div>

            {/* Resume Upload */}
            <div>
                <FieldLabel>Resume</FieldLabel>
                <label
                    htmlFor="apply-resume"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-dashed border-white/20 hover:border-indigo-500/50 transition-all cursor-pointer group"
                >
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/30 transition-colors">
                        <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                            <path d="M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.49996C7.05005 9.74849 7.25152 9.94996 7.50005 9.94996C7.74858 9.94996 7.95005 9.74849 7.95005 9.49996V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8183 4.81828C10.994 4.64254 10.994 4.35762 10.8183 4.18188L7.81825 1.18188Z" fill="#818cf8"/>
                            <path d="M2.5 9.99997C2.77614 9.99997 3 10.2238 3 10.5V12H12V10.5C12 10.2238 12.2239 9.99997 12.5 9.99997C12.7761 9.99997 13 10.2238 13 10.5V12.5C13 12.7761 12.7761 13 12.5 13H2.5C2.22386 13 2 12.7761 2 12.5V10.5C2 10.2238 2.22386 9.99997 2.5 9.99997Z" fill="#818cf8"/>
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors truncate">
                            {resumeName ?? "Upload your resume"}
                        </p>
                        <p className="text-xs text-slate-600">PDF, DOC, DOCX — max 5 MB</p>
                    </div>
                    <input
                        id="apply-resume"
                        name="resume"
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        className="hidden"
                        onChange={(e) => setResumeName(e.target.files?.[0]?.name ?? null)}
                    />
                </label>
            </div>

            {/* Error */}
            {error && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm">
                    <svg width="14" height="14" viewBox="0 0 15 15" fill="none" className="shrink-0">
                        <path d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608765L0.161178 11.3368C-0.275824 12.0697 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.0697 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8227 4.5C6.8227 4.22386 7.04656 4 7.32271 4C7.59885 4 7.82271 4.22386 7.82271 4.5V8.5C7.82271 8.77614 7.59885 9 7.32271 9C7.04656 9 6.8227 8.77614 6.8227 8.5V4.5ZM7.32271 11C7.04656 11 6.8227 10.7761 6.8227 10.5C6.8227 10.2239 7.04656 10 7.32271 10C7.59885 10 7.82271 10.2239 7.82271 10.5C7.82271 10.7761 7.59885 11 7.32271 11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
                    </svg>
                    {error}
                </div>
            )}

            {/* Submit */}
            <button
                id="btn-submit-application"
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? (
                    <>
                        <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                        </svg>
                        Submitting…
                    </>
                ) : (
                    "Submit Application"
                )}
            </button>
        </form>
    );
}
