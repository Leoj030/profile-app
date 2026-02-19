"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
    User,
    Mail,
    Phone,
    MapPin,
    FileText,
    GraduationCap,
    Briefcase,
    Award,
    Plus,
    Trash2,
    CheckCircle,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import {
    ResumeDocument,
    ResumeData,
    Education,
    Project,
} from "./ResumeDocument";
import ResumePreview from "./ResumePreview";

// Dynamically import PDFDownloadLink to avoid SSR issues
const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    { ssr: false },
);

export default function ResumeCreator() {
    const [resumeData, setResumeData] = useState<ResumeData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        summaryTitle: "",
        summary: "",
        education: [],
        projects: [],
        skills: [],
    });

    const [activeTab, setActiveTab] = useState<
        "profile" | "education" | "projects" | "skills"
    >("profile");
    const [isClient, setIsClient] = useState(false);
    const [skillInput, setSkillInput] = useState("");

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setResumeData((prev) => ({ ...prev, [name]: value }));
    };

    // Education Helpers
    const addEducation = () => {
        setResumeData((prev) => ({
            ...prev,
            education: [
                ...prev.education,
                {
                    school: "",
                    degree: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                },
            ],
        }));
    };

    const removeEducation = (index: number) => {
        setResumeData((prev) => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index),
        }));
    };

    const updateEducation = (
        index: number,
        field: keyof Education,
        value: string,
    ) => {
        const newEdu = [...resumeData.education];
        newEdu[index] = { ...newEdu[index], [field]: value };
        setResumeData((prev) => ({ ...prev, education: newEdu }));
    };

    // Project Helpers
    const addProject = () => {
        setResumeData((prev) => ({
            ...prev,
            projects: [
                ...prev.projects,
                { name: "", description: "", link: "" },
            ],
        }));
    };

    const removeProject = (index: number) => {
        setResumeData((prev) => ({
            ...prev,
            projects: prev.projects.filter((_, i) => i !== index),
        }));
    };

    const updateProject = (
        index: number,
        field: keyof Project,
        value: string,
    ) => {
        const newProjects = [...resumeData.projects];
        newProjects[index] = { ...newProjects[index], [field]: value };
        setResumeData((prev) => ({ ...prev, projects: newProjects }));
    };

    // Skill Helpers
    const addSkill = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && skillInput.trim()) {
            if (!resumeData.skills.includes(skillInput.trim())) {
                setResumeData((prev) => ({
                    ...prev,
                    skills: [...prev.skills, skillInput.trim()],
                }));
            }
            setSkillInput("");
        }
    };

    const removeSkill = (skill: string) => {
        setResumeData((prev) => ({
            ...prev,
            skills: prev.skills.filter((s) => s !== skill),
        }));
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-120px)] mt-24 mb-12">
            {/* Left Section: Inputs */}
            <section className="flex-1 lg:max-w-xl space-y-6">
                {/* Tab Navigation */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`btn btn-sm rounded-full whitespace-nowrap px-6 ${activeTab === "profile" ? "btn-primary" : "bg-slate-800/50 text-slate-400"}`}
                    >
                        Profile
                    </button>
                    <button
                        onClick={() => setActiveTab("education")}
                        className={`btn btn-sm rounded-full whitespace-nowrap px-6 ${activeTab === "education" ? "btn-primary" : "bg-slate-800/50 text-slate-400"}`}
                    >
                        Education
                    </button>
                    <button
                        onClick={() => setActiveTab("projects")}
                        className={`btn btn-sm rounded-full whitespace-nowrap px-6 ${activeTab === "projects" ? "btn-primary" : "bg-slate-800/50 text-slate-400"}`}
                    >
                        Projects
                    </button>
                    <button
                        onClick={() => setActiveTab("skills")}
                        className={`btn btn-sm rounded-full whitespace-nowrap px-6 ${activeTab === "skills" ? "btn-primary" : "bg-slate-800/50 text-slate-400"}`}
                    >
                        Skills
                    </button>
                </div>

                <div className="card bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 p-6">
                    {activeTab === "profile" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <User className="text-indigo-400" /> Basic
                                Information
                            </h2>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-slate-400">
                                            First Name
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={resumeData.firstName}
                                        onChange={handleInputChange}
                                        className="input bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500 w-full"
                                        placeholder="John"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-slate-400">
                                            Last Name
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={resumeData.lastName}
                                        onChange={handleInputChange}
                                        className="input bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500 w-full"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-slate-400">
                                            Email
                                        </span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={resumeData.email}
                                        onChange={handleInputChange}
                                        className="input bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500 w-full"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-slate-400">
                                            Phone
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={resumeData.phone}
                                        onChange={handleInputChange}
                                        className="input bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500 w-full"
                                        placeholder="+1 234 567 890"
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-slate-400">
                                        Address
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={resumeData.address}
                                    onChange={handleInputChange}
                                    className="input bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500 w-full"
                                    placeholder="123 Street, City, Country"
                                />
                            </div>

                            <div className="divider border-slate-800"></div>

                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <FileText className="text-purple-400" />{" "}
                                Professional Summary
                            </h2>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-slate-400">
                                        Role / Title
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="summaryTitle"
                                    value={resumeData.summaryTitle}
                                    onChange={handleInputChange}
                                    className="input bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500 w-full"
                                    placeholder="Senior Frontend Developer"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-slate-400">
                                        Description
                                    </span>
                                </label>
                                <textarea
                                    name="summary"
                                    value={resumeData.summary}
                                    onChange={handleInputChange}
                                    className="textarea bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500 w-full h-32"
                                    placeholder="Passionate developer with..."
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === "education" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <GraduationCap className="text-indigo-400" />{" "}
                                    Education
                                </h2>
                                <button
                                    onClick={addEducation}
                                    className="btn btn-sm btn-circle btn-primary"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>

                            {resumeData.education.map((edu, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 bg-slate-800/30 rounded-xl space-y-4 border border-slate-800/50 relative"
                                >
                                    <button
                                        onClick={() => removeEducation(idx)}
                                        className="absolute top-2 right-2 text-slate-500 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="School Name"
                                            className="input input-sm bg-slate-800/50 border-slate-700"
                                            value={edu.school}
                                            onChange={(e) =>
                                                updateEducation(
                                                    idx,
                                                    "school",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <input
                                            type="text"
                                            placeholder="Degree"
                                            className="input input-sm bg-slate-800/50 border-slate-700"
                                            value={edu.degree}
                                            onChange={(e) =>
                                                updateEducation(
                                                    idx,
                                                    "degree",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Start Date"
                                            className="input input-sm bg-slate-800/50 border-slate-700"
                                            value={edu.startDate}
                                            onChange={(e) =>
                                                updateEducation(
                                                    idx,
                                                    "startDate",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <input
                                            type="text"
                                            placeholder="End Date"
                                            className="input input-sm bg-slate-800/50 border-slate-700"
                                            value={edu.endDate}
                                            onChange={(e) =>
                                                updateEducation(
                                                    idx,
                                                    "endDate",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <textarea
                                        placeholder="Description"
                                        className="textarea textarea-sm bg-slate-800/50 border-slate-700 w-full"
                                        value={edu.description}
                                        onChange={(e) =>
                                            updateEducation(
                                                idx,
                                                "description",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                            ))}
                            {resumeData.education.length === 0 && (
                                <p className="text-slate-500 text-center py-8">
                                    No education added yet.
                                </p>
                            )}
                        </div>
                    )}

                    {activeTab === "projects" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Briefcase className="text-purple-400" />{" "}
                                    Projects
                                </h2>
                                <button
                                    onClick={addProject}
                                    className="btn btn-sm btn-circle btn-primary"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>

                            {resumeData.projects.map((proj, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 bg-slate-800/30 rounded-xl space-y-4 border border-slate-800/50 relative"
                                >
                                    <button
                                        onClick={() => removeProject(idx)}
                                        className="absolute top-2 right-2 text-slate-500 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="Project Name"
                                        className="input input-sm bg-slate-800/50 border-slate-700 w-full"
                                        value={proj.name}
                                        onChange={(e) =>
                                            updateProject(
                                                idx,
                                                "name",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <input
                                        type="text"
                                        placeholder="Link (Optional)"
                                        className="input input-sm bg-slate-800/50 border-slate-700 w-full"
                                        value={proj.link}
                                        onChange={(e) =>
                                            updateProject(
                                                idx,
                                                "link",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <textarea
                                        placeholder="Description"
                                        className="textarea textarea-sm bg-slate-800/50 border-slate-700 w-full"
                                        value={proj.description}
                                        onChange={(e) =>
                                            updateProject(
                                                idx,
                                                "description",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                            ))}
                            {resumeData.projects.length === 0 && (
                                <p className="text-slate-500 text-center py-8">
                                    No projects added yet.
                                </p>
                            )}
                        </div>
                    )}

                    {activeTab === "skills" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Award className="text-pink-400" /> Skills
                            </h2>

                            <div className="form-control">
                                <input
                                    type="text"
                                    value={skillInput}
                                    onChange={(e) =>
                                        setSkillInput(e.target.value)
                                    }
                                    onKeyDown={addSkill}
                                    placeholder="Type a skill and press Enter..."
                                    className="input bg-slate-800/50 border-slate-700 text-white w-full"
                                />
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {resumeData.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="badge bg-indigo-600/20 text-indigo-300 border-indigo-500/50 py-3 px-4 flex gap-2"
                                    >
                                        {skill}
                                        <button
                                            onClick={() => removeSkill(skill)}
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            {resumeData.skills.length === 0 && (
                                <p className="text-slate-500 text-center py-8">
                                    Add your skills above.
                                </p>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex justify-end mt-4">
                    {isClient && (
                        <PDFDownloadLink
                            document={<ResumeDocument data={resumeData} />}
                            fileName={`${resumeData.lastName || "Resume"}_ProFile.pdf`}
                            className={`btn btn-primary btn-lg rounded-2xl shadow-lg shadow-indigo-500/20 px-8 ${!resumeData.firstName ? "btn-disabled" : ""}`}
                        >
                            {({ loading }) => (
                                <>
                                    {loading ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : (
                                        <CheckCircle size={20} />
                                    )}
                                    Done Creating
                                </>
                            )}
                        </PDFDownloadLink>
                    )}
                </div>
            </section>

            {/* Right Section: Preview */}
            <section className="flex-1 lg:max-w-xl h-fit lg:h-fit sticky top-24 pb-8">
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-800/50 h-full relative group">
                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-slate-900/80 backdrop-blur px-3 py-1 rounded-full text-[10px] text-slate-400 border border-slate-700 font-medium">
                            A4 Live Preview
                        </div>
                    </div>
                    <div className="overflow-y-auto max-h-[800px] bg-slate-900 scrollbar-hide">
                        <ResumePreview data={resumeData} />
                    </div>
                </div>
            </section>
        </div>
    );
}
