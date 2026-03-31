"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import {
    User,
    FileText,
    GraduationCap,
    Briefcase,
    Award,
    Plus,
    Trash2,
    CheckCircle,
    Globe,
    Languages,
    Link,
} from "lucide-react";
import {
    ResumeDocument,
    ResumeData,
    Education,
    Experience,
    Project,
    Language,
} from "./ResumeDocument";
import ResumePreview from "./ResumePreview";

const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    { ssr: false },
);

type Tab = "profile" | "experience" | "education" | "projects" | "skills" | "languages";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "profile",    label: "Profile",     icon: <User size={14} /> },
    { id: "experience", label: "Experience",  icon: <Briefcase size={14} /> },
    { id: "education",  label: "Education",   icon: <GraduationCap size={14} /> },
    { id: "projects",   label: "Projects",    icon: <Globe size={14} /> },
    { id: "skills",     label: "Skills",      icon: <Award size={14} /> },
    { id: "languages",  label: "Languages",   icon: <Languages size={14} /> },
];

const emptyExp = (): Experience => ({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    bullets: [""],
});

const emptyProject = (): Project => ({
    name: "",
    role: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    bullets: [""],
    link: "",
});

const emptyEdu = (): Education => ({
    school: "",
    degree: "",
    startDate: "",
    endDate: "",
    description: "",
});

const emptyLang = (): Language => ({ name: "", level: "" });

// ─── Shared sub-component styles ─────────────────────────────────────────────

const inputCls =
    "input bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500 w-full text-sm";
const inputSmCls =
    "input input-sm bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500 w-full";
const cardCls =
    "p-4 bg-slate-800/30 rounded-xl space-y-3 border border-slate-700/50 relative";

// ─── BulletList component ─────────────────────────────────────────────────────

function BulletList({
    bullets,
    onChange,
}: {
    bullets: string[];
    onChange: (bullets: string[]) => void;
}) {
    const update = (i: number, val: string) => {
        const next = [...bullets];
        next[i] = val;
        onChange(next);
    };
    const add = () => onChange([...bullets, ""]);
    const remove = (i: number) => onChange(bullets.filter((_, idx) => idx !== i));

    return (
        <div className="space-y-2">
            <label className="label">
                <span className="label-text text-slate-400 text-xs">Bullet Points</span>
            </label>
            {bullets.map((b, i) => (
                <div key={i} className="flex gap-2 items-center">
                    <span className="text-slate-500 text-sm">•</span>
                    <input
                        type="text"
                        value={b}
                        onChange={(e) => update(i, e.target.value)}
                        placeholder="Describe what you did..."
                        className={inputSmCls + " flex-1"}
                    />
                    {bullets.length > 1 && (
                        <button
                            onClick={() => remove(i)}
                            className="text-slate-500 hover:text-red-400 transition-colors"
                        >
                            <Trash2 size={13} />
                        </button>
                    )}
                </div>
            ))}
            <button
                onClick={add}
                className="btn btn-xs bg-slate-700/50 text-slate-300 border-slate-600 hover:bg-slate-700 gap-1"
            >
                <Plus size={12} /> Add bullet
            </button>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ResumeCreator() {
    const [resumeData, setResumeData] = useState<ResumeData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        linkedin: "",
        summaryTitle: "",
        summary: "",
        experience: [],
        education: [],
        projects: [],
        skills: [],
        languages: [],
    });

    const [activeTab, setActiveTab] = useState<Tab>("profile");
    const [skillInput, setSkillInput] = useState("");

    // SSR-safe client detection (no setState-in-effect)
    const isClient = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
    );

    // A4 scaling
    const previewContainerRef = useRef<HTMLDivElement>(null);
    const [previewScale, setPreviewScale] = useState(0.8);

    useEffect(() => {
        const container = previewContainerRef.current;
        if (!container) return;
        const update = () => setPreviewScale(container.clientWidth / 794);
        update();
        const observer = new ResizeObserver(update);
        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    const set = (field: keyof ResumeData, value: unknown) =>
        setResumeData((prev) => ({ ...prev, [field]: value }));

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setResumeData((prev) => ({ ...prev, [name]: value }));
    };

    // ── Experience helpers ──────────────────────────────────────────────
    const addExp    = () => set("experience", [...resumeData.experience, emptyExp()]);
    const removeExp = (i: number) => set("experience", resumeData.experience.filter((_, idx) => idx !== i));
    const updateExp = (i: number, field: keyof Experience, value: string | string[]) => {
        const next = [...resumeData.experience];
        next[i] = { ...next[i], [field]: value };
        set("experience", next);
    };

    // ── Education helpers ──────────────────────────────────────────────
    const addEdu    = () => set("education", [...resumeData.education, emptyEdu()]);
    const removeEdu = (i: number) => set("education", resumeData.education.filter((_, idx) => idx !== i));
    const updateEdu = (i: number, field: keyof Education, value: string) => {
        const next = [...resumeData.education];
        next[i] = { ...next[i], [field]: value };
        set("education", next);
    };

    // ── Project helpers ────────────────────────────────────────────────
    const addProject    = () => set("projects", [...resumeData.projects, emptyProject()]);
    const removeProject = (i: number) => set("projects", resumeData.projects.filter((_, idx) => idx !== i));
    const updateProject = (i: number, field: keyof Project, value: string | string[]) => {
        const next = [...resumeData.projects];
        next[i] = { ...next[i], [field]: value };
        set("projects", next);
    };

    // ── Skill helpers ──────────────────────────────────────────────────
    const addSkill = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && skillInput.trim()) {
            if (!resumeData.skills.includes(skillInput.trim())) {
                set("skills", [...resumeData.skills, skillInput.trim()]);
            }
            setSkillInput("");
        }
    };
    const removeSkill = (skill: string) =>
        set("skills", resumeData.skills.filter((s) => s !== skill));

    // ── Language helpers ───────────────────────────────────────────────
    const addLang    = () => set("languages", [...resumeData.languages, emptyLang()]);
    const removeLang = (i: number) => set("languages", resumeData.languages.filter((_, idx) => idx !== i));
    const updateLang = (i: number, field: keyof Language, value: string) => {
        const next = [...resumeData.languages];
        next[i] = { ...next[i], [field]: value };
        set("languages", next);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-120px)] mt-24 mb-12">
            {/* ── LEFT: FORM ─────────────────────────────────────── */}
            <section className="flex-1 lg:max-w-xl space-y-4">
                {/* Tab bar */}
                <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide flex-wrap">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`btn btn-sm rounded-full whitespace-nowrap px-4 gap-1.5 ${
                                activeTab === tab.id
                                    ? "btn-primary"
                                    : "bg-slate-800/50 text-slate-400 border-slate-700/50"
                            }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="card bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 p-6">

                    {/* ── PROFILE TAB ────────────────────────────── */}
                    {activeTab === "profile" && (
                        <div className="space-y-5 animate-in fade-in duration-200">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <User className="text-indigo-400" size={18} /> Basic Information
                            </h2>

                            <div className="grid grid-cols-2 gap-3">
                                <FormField label="First Name">
                                    <input type="text" name="firstName" value={resumeData.firstName} onChange={handleInput} className={inputCls} placeholder="John" />
                                </FormField>
                                <FormField label="Last Name">
                                    <input type="text" name="lastName" value={resumeData.lastName} onChange={handleInput} className={inputCls} placeholder="Doe" />
                                </FormField>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <FormField label="Email">
                                    <input type="email" name="email" value={resumeData.email} onChange={handleInput} className={inputCls} placeholder="john@example.com" />
                                </FormField>
                                <FormField label="Phone">
                                    <input type="text" name="phone" value={resumeData.phone} onChange={handleInput} className={inputCls} placeholder="+1 555 123-4567" />
                                </FormField>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <FormField label="Location">
                                    <input type="text" name="address" value={resumeData.address} onChange={handleInput} className={inputCls} placeholder="San Francisco, CA" />
                                </FormField>
                                <FormField label="LinkedIn URL">
                                    <input type="text" name="linkedin" value={resumeData.linkedin} onChange={handleInput} className={inputCls} placeholder="linkedin.com/in/johndoe" />
                                </FormField>
                            </div>

                            <div className="divider border-slate-800 my-1" />

                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <FileText className="text-purple-400" size={18} /> Professional Summary
                            </h2>

                            <FormField label="Job Title / Role">
                                <input type="text" name="summaryTitle" value={resumeData.summaryTitle} onChange={handleInput} className={inputCls} placeholder="Product Designer" />
                            </FormField>

                            <FormField label="Summary">
                                <textarea
                                    name="summary"
                                    value={resumeData.summary}
                                    onChange={handleInput}
                                    className="textarea bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500 w-full h-28 text-sm"
                                    placeholder="Creative professional with 5+ years of experience..."
                                />
                            </FormField>
                        </div>
                    )}

                    {/* ── EXPERIENCE TAB ─────────────────────────── */}
                    {activeTab === "experience" && (
                        <div className="space-y-5 animate-in fade-in duration-200">
                            <SectionHeader
                                title="Experience"
                                icon={<Briefcase className="text-indigo-400" size={18} />}
                                onAdd={addExp}
                            />

                            {resumeData.experience.map((exp, i) => (
                                <div key={i} className={cardCls}>
                                    <button onClick={() => removeExp(i)} className="absolute top-3 right-3 text-slate-500 hover:text-red-400 transition-colors">
                                        <Trash2 size={15} />
                                    </button>

                                    <div className="grid grid-cols-2 gap-3">
                                        <FormField label="Job Title">
                                            <input type="text" value={exp.title} onChange={(e) => updateExp(i, "title", e.target.value)} className={inputSmCls} placeholder="Senior Designer" />
                                        </FormField>
                                        <FormField label="Company">
                                            <input type="text" value={exp.company} onChange={(e) => updateExp(i, "company", e.target.value)} className={inputSmCls} placeholder="TechFlow Inc." />
                                        </FormField>
                                    </div>

                                    <FormField label="Location">
                                        <input type="text" value={exp.location} onChange={(e) => updateExp(i, "location", e.target.value)} className={inputSmCls} placeholder="San Francisco, CA" />
                                    </FormField>

                                    <div className="grid grid-cols-2 gap-3">
                                        <FormField label="Start Date">
                                            <input type="text" value={exp.startDate} onChange={(e) => updateExp(i, "startDate", e.target.value)} className={inputSmCls} placeholder="Jan 2021" />
                                        </FormField>
                                        <FormField label="End Date">
                                            <input type="text" value={exp.endDate} onChange={(e) => updateExp(i, "endDate", e.target.value)} className={inputSmCls} placeholder="Present" />
                                        </FormField>
                                    </div>

                                    <BulletList
                                        bullets={exp.bullets}
                                        onChange={(bullets) => updateExp(i, "bullets", bullets)}
                                    />
                                </div>
                            ))}

                            {resumeData.experience.length === 0 && (
                                <EmptyState text="No experience added yet. Click + to add." />
                            )}
                        </div>
                    )}

                    {/* ── EDUCATION TAB ──────────────────────────── */}
                    {activeTab === "education" && (
                        <div className="space-y-5 animate-in fade-in duration-200">
                            <SectionHeader
                                title="Education"
                                icon={<GraduationCap className="text-indigo-400" size={18} />}
                                onAdd={addEdu}
                            />

                            {resumeData.education.map((edu, i) => (
                                <div key={i} className={cardCls}>
                                    <button onClick={() => removeEdu(i)} className="absolute top-3 right-3 text-slate-500 hover:text-red-400 transition-colors">
                                        <Trash2 size={15} />
                                    </button>

                                    <div className="grid grid-cols-2 gap-3">
                                        <FormField label="Degree">
                                            <input type="text" value={edu.degree} onChange={(e) => updateEdu(i, "degree", e.target.value)} className={inputSmCls} placeholder="Bachelor of Science" />
                                        </FormField>
                                        <FormField label="School">
                                            <input type="text" value={edu.school} onChange={(e) => updateEdu(i, "school", e.target.value)} className={inputSmCls} placeholder="University Name" />
                                        </FormField>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <FormField label="Start Date">
                                            <input type="text" value={edu.startDate} onChange={(e) => updateEdu(i, "startDate", e.target.value)} className={inputSmCls} placeholder="2014" />
                                        </FormField>
                                        <FormField label="End Date">
                                            <input type="text" value={edu.endDate} onChange={(e) => updateEdu(i, "endDate", e.target.value)} className={inputSmCls} placeholder="2018" />
                                        </FormField>
                                    </div>

                                    <FormField label="Description (optional)">
                                        <textarea
                                            value={edu.description}
                                            onChange={(e) => updateEdu(i, "description", e.target.value)}
                                            className="textarea textarea-sm bg-slate-800/50 border-slate-700 text-white w-full"
                                            placeholder="Relevant coursework, honours, etc."
                                        />
                                    </FormField>
                                </div>
                            ))}

                            {resumeData.education.length === 0 && (
                                <EmptyState text="No education added yet. Click + to add." />
                            )}
                        </div>
                    )}

                    {/* ── PROJECTS TAB ───────────────────────────── */}
                    {activeTab === "projects" && (
                        <div className="space-y-5 animate-in fade-in duration-200">
                            <SectionHeader
                                title="Key Projects"
                                icon={<Globe className="text-purple-400" size={18} />}
                                onAdd={addProject}
                            />

                            {resumeData.projects.map((proj, i) => (
                                <div key={i} className={cardCls}>
                                    <button onClick={() => removeProject(i)} className="absolute top-3 right-3 text-slate-500 hover:text-red-400 transition-colors">
                                        <Trash2 size={15} />
                                    </button>

                                    <FormField label="Project Name">
                                        <input type="text" value={proj.name} onChange={(e) => updateProject(i, "name", e.target.value)} className={inputSmCls} placeholder="E-commerce Mobile App Redesign" />
                                    </FormField>

                                    <div className="grid grid-cols-2 gap-3">
                                        <FormField label="Your Role (optional)">
                                            <input type="text" value={proj.role} onChange={(e) => updateProject(i, "role", e.target.value)} className={inputSmCls} placeholder="Lead Designer" />
                                        </FormField>
                                        <FormField label="Company / Client (optional)">
                                            <input type="text" value={proj.company} onChange={(e) => updateProject(i, "company", e.target.value)} className={inputSmCls} placeholder="Acme Corp" />
                                        </FormField>
                                    </div>

                                    <FormField label="Location (optional)">
                                        <input type="text" value={proj.location} onChange={(e) => updateProject(i, "location", e.target.value)} className={inputSmCls} placeholder="Remote / New York, NY" />
                                    </FormField>

                                    <div className="grid grid-cols-2 gap-3">
                                        <FormField label="Start Date (optional)">
                                            <input type="text" value={proj.startDate} onChange={(e) => updateProject(i, "startDate", e.target.value)} className={inputSmCls} placeholder="Jun 2023" />
                                        </FormField>
                                        <FormField label="End Date (optional)">
                                            <input type="text" value={proj.endDate} onChange={(e) => updateProject(i, "endDate", e.target.value)} className={inputSmCls} placeholder="Dec 2023" />
                                        </FormField>
                                    </div>

                                    <BulletList
                                        bullets={proj.bullets}
                                        onChange={(bullets) => updateProject(i, "bullets", bullets)}
                                    />

                                    <FormField label="Link (optional)">
                                        <div className="relative">
                                            <Link size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                            <input type="text" value={proj.link} onChange={(e) => updateProject(i, "link", e.target.value)} className={inputSmCls + " pl-8"} placeholder="github.com/you/project" />
                                        </div>
                                    </FormField>
                                </div>
                            ))}

                            {resumeData.projects.length === 0 && (
                                <EmptyState text="No projects added yet. Click + to add." />
                            )}
                        </div>
                    )}

                    {/* ── SKILLS TAB ─────────────────────────────── */}
                    {activeTab === "skills" && (
                        <div className="space-y-5 animate-in fade-in duration-200">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <Award className="text-pink-400" size={18} /> Skills
                            </h2>

                            <FormField label="Type a skill and press Enter">
                                <input
                                    type="text"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyDown={addSkill}
                                    placeholder="e.g. Figma, React, Photoshop..."
                                    className={inputCls}
                                />
                            </FormField>

                            <div className="flex flex-wrap gap-2">
                                {resumeData.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="badge bg-indigo-600/20 text-indigo-300 border-indigo-500/30 py-3 px-3 flex gap-2 text-xs"
                                    >
                                        {skill}
                                        <button onClick={() => removeSkill(skill)}>
                                            <Trash2 size={11} />
                                        </button>
                                    </span>
                                ))}
                            </div>

                            {resumeData.skills.length === 0 && (
                                <EmptyState text="Add your skills above." />
                            )}
                        </div>
                    )}

                    {/* ── LANGUAGES TAB ──────────────────────────── */}
                    {activeTab === "languages" && (
                        <div className="space-y-5 animate-in fade-in duration-200">
                            <SectionHeader
                                title="Languages"
                                icon={<Languages className="text-teal-400" size={18} />}
                                onAdd={addLang}
                            />

                            {resumeData.languages.map((lang, i) => (
                                <div key={i} className={cardCls}>
                                    <button onClick={() => removeLang(i)} className="absolute top-3 right-3 text-slate-500 hover:text-red-400 transition-colors">
                                        <Trash2 size={15} />
                                    </button>

                                    <div className="grid grid-cols-2 gap-3">
                                        <FormField label="Language">
                                            <input type="text" value={lang.name} onChange={(e) => updateLang(i, "name", e.target.value)} className={inputSmCls} placeholder="English" />
                                        </FormField>
                                        <FormField label="Proficiency">
                                            <select
                                                value={lang.level}
                                                onChange={(e) => updateLang(i, "level", e.target.value)}
                                                className="select select-sm bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500 w-full"
                                            >
                                                <option value="">Select level…</option>
                                                <option value="A1 – Beginner">A1 – Beginner</option>
                                                <option value="A2 – Elementary">A2 – Elementary</option>
                                                <option value="B1 – Intermediate">B1 – Intermediate</option>
                                                <option value="B2 – Upper Intermediate">B2 – Upper Intermediate</option>
                                                <option value="C1 – Advanced">C1 – Advanced</option>
                                                <option value="C2 – Proficient">C2 – Proficient</option>
                                                <option value="Native">Native</option>
                                            </select>
                                        </FormField>
                                    </div>
                                </div>
                            ))}

                            {resumeData.languages.length === 0 && (
                                <EmptyState text="No languages added yet. Click + to add." />
                            )}
                        </div>
                    )}
                </div>

                {/* Download button */}
                <div className="flex justify-end mt-2">
                    {isClient && (
                        <PDFDownloadLink
                            document={<ResumeDocument data={resumeData} />}
                            fileName={`${resumeData.lastName || "Resume"}_ProFile.pdf`}
                            className={`btn btn-primary btn-lg rounded-2xl shadow-lg shadow-indigo-500/20 px-8 ${!resumeData.firstName ? "btn-disabled opacity-50" : ""}`}
                        >
                            {({ loading }) => (
                                <>
                                    {loading ? (
                                        <span className="loading loading-spinner loading-sm" />
                                    ) : (
                                        <CheckCircle size={18} />
                                    )}
                                    Download PDF
                                </>
                            )}
                        </PDFDownloadLink>
                    )}
                </div>
            </section>

            {/* ── RIGHT: LIVE PREVIEW ────────────────────────────────── */}
            <section className="flex-1 lg:max-w-2xl sticky top-24 pb-8 h-fit">
                <div className="text-xs text-slate-500 mb-2 text-center tracking-wide uppercase font-medium">A4 Live Preview</div>
                {/* Outer: measures container width */}
                <div
                    ref={previewContainerRef}
                    className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 w-full"
                    style={{ height: `${794 * (297 / 210) * previewScale}px` }}
                >
                    {/* Inner: fixed A4 size, scaled down */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "794px",
                            transformOrigin: "top left",
                            transform: `scale(${previewScale})`,
                        }}
                    >
                        <ResumePreview data={resumeData} />
                    </div>
                </div>
            </section>
        </div>
    );
}

// ─── Tiny helpers ─────────────────────────────────────────────────────────────

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="form-control">
            <label className="label py-0.5">
                <span className="label-text text-slate-400 text-xs">{label}</span>
            </label>
            {children}
        </div>
    );
}

function SectionHeader({
    title,
    icon,
    onAdd,
}: {
    title: string;
    icon: React.ReactNode;
    onAdd: () => void;
}) {
    return (
        <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                {icon} {title}
            </h2>
            <button onClick={onAdd} className="btn btn-sm btn-circle btn-primary">
                <Plus size={16} />
            </button>
        </div>
    );
}

function EmptyState({ text }: { text: string }) {
    return (
        <p className="text-slate-500 text-center py-8 text-sm">{text}</p>
    );
}
