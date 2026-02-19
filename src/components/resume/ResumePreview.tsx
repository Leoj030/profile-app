"use client";

import React from "react";
import { ResumeData } from "./ResumeDocument";

interface ResumePreviewProps {
    data: ResumeData;
}

export default function ResumePreview({ data }: ResumePreviewProps) {
    return (
        <div className="bg-white text-slate-900 shadow-2xl p-[1in] w-full min-h-[11.69in] max-w-[8.27in] mx-auto overflow-hidden font-serif">
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-4 mb-6">
                <h1 className="text-4xl font-bold uppercase tracking-tight">
                    {data.firstName || data.lastName
                        ? `${data.firstName} ${data.lastName}`
                        : "Your Name"}
                </h1>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-600">
                    {data.email && <span>{data.email}</span>}
                    {data.phone && <span>{data.phone}</span>}
                    {data.address && <span>{data.address}</span>}
                </div>
            </div>

            {/* Summary */}
            {(data.summaryTitle || data.summary) && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-slate-200 mb-2 pb-1">
                        {data.summaryTitle || "Professional Summary"}
                    </h2>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {data.summary}
                    </p>
                </section>
            )}

            {/* Education */}
            {data.education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-slate-200 mb-2 pb-1">
                        Education
                    </h2>
                    <div className="space-y-4">
                        {data.education.map((edu, index) => (
                            <div key={index}>
                                <div className="flex justify-between font-bold text-sm">
                                    <h3>{edu.school}</h3>
                                    <span className="font-normal text-slate-500 italic">
                                        {edu.startDate} - {edu.endDate}
                                    </span>
                                </div>
                                <p className="text-sm italic">{edu.degree}</p>
                                {edu.description && (
                                    <p className="text-sm mt-1 whitespace-pre-wrap">
                                        {edu.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.projects.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-slate-200 mb-2 pb-1">
                        Projects
                    </h2>
                    <div className="space-y-4">
                        {data.projects.map((proj, index) => (
                            <div key={index}>
                                <div className="flex justify-between font-bold text-sm">
                                    <h3>{proj.name}</h3>
                                    {proj.link && (
                                        <span className="font-normal text-indigo-600 text-xs">
                                            {proj.link}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm mt-1 whitespace-pre-wrap">
                                    {proj.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-slate-200 mb-2 pb-1">
                        Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="bg-slate-100 px-2 py-1 rounded text-xs"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
