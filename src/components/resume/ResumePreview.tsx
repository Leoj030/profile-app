"use client";

import React from "react";
import { ResumeData } from "./ResumeDocument";

interface ResumePreviewProps {
    data: ResumeData;
}

export default function ResumePreview({ data }: ResumePreviewProps) {
    const hasName = data.firstName || data.lastName;

    return (
        <div
            style={{
                backgroundColor: "#ffffff",
                color: "#111827",
                width: "794px",
                minHeight: "1123px",
                padding: "72px 52px 52px 52px",
                fontSize: "12pt",
                lineHeight: 1.45,
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                boxSizing: "border-box",
            }}
        >
            {/* ── HEADER ─────────────────────────────────────────────── */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    borderBottom: "1.5px solid #e5e7eb",
                    paddingBottom: "12px",
                    marginBottom: "18px",
                }}
            >
                <div>
                    <h1
                        style={{
                            fontSize: "25pt",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            color: "#111827",
                            letterSpacing: "0.03em",
                            margin: 0,
                            lineHeight: 1.1,
                        }}
                    >
                        {hasName ? `${data.firstName} ${data.lastName}` : "Your Name"}
                    </h1>
                    {data.summaryTitle && (
                        <p style={{ margin: "4px 0 0", color: "#6b7280", fontSize: "15pt" }}>
                            {data.summaryTitle}
                        </p>
                    )}
                </div>

                <div style={{ textAlign: "right", fontSize: "12pt", color: "#6b7280", lineHeight: 1.8 }}>
                    {data.email    && <div>{data.email}</div>}
                    {data.phone    && <div>{data.phone}</div>}
                    {data.address  && <div>{data.address}</div>}
                    {data.linkedin && <div>{data.linkedin}</div>}
                </div>
            </div>

            {/* ── TWO-COLUMN BODY ────────────────────────────────────── */}
            <div style={{ display: "flex", gap: "28px" }}>
                {/* LEFT COLUMN */}
                <div style={{ flex: 2 }}>
                    {data.summary && (
                        <Section title="Professional Summary">
                            <p style={{ margin: 0, color: "#374151", fontSize: "12pt", lineHeight: 1.55, whiteSpace: "pre-wrap" }}>
                                {data.summary}
                            </p>
                        </Section>
                    )}

                    {data.experience.length > 0 && (
                        <Section title="Experience">
                            {data.experience.map((exp, i) => (
                                <ExperienceItem
                                    key={i}
                                    title={exp.title}
                                    subtitle={[exp.company, exp.location].filter(Boolean).join(" | ")}
                                    startDate={exp.startDate}
                                    endDate={exp.endDate}
                                    bullets={exp.bullets}
                                />
                            ))}
                        </Section>
                    )}

                    {data.projects.length > 0 && (
                        <Section title="Key Projects">
                            {data.projects.map((proj, i) => (
                                <ExperienceItem
                                    key={i}
                                    title={proj.name}
                                    subtitle={[proj.role, proj.company, proj.location].filter(Boolean).join(" | ")}
                                    startDate={proj.startDate}
                                    endDate={proj.endDate}
                                    bullets={proj.bullets}
                                    link={proj.link}
                                />
                            ))}
                        </Section>
                    )}
                </div>

                {/* RIGHT COLUMN */}
                <div style={{ flex: 1 }}>
                    {data.education.length > 0 && (
                        <Section title="Education">
                            {data.education.map((edu, i) => (
                                <div key={i} style={{ marginBottom: "12px" }}>
                                    <div style={{ fontWeight: 700, fontSize: "12pt", color: "#111827" }}>
                                        {edu.degree || "Degree"}
                                    </div>
                                    <div style={{ fontSize: "12pt", color: "#374151" }}>{edu.school}</div>
                                    {(edu.startDate || edu.endDate) && (
                                        <div style={{ fontSize: "12pt", color: "#9ca3af" }}>
                                            {edu.startDate} - {edu.endDate}
                                        </div>
                                    )}
                                    {edu.description && (
                                        <p style={{ margin: "3px 0 0", fontSize: "12pt", color: "#6b7280", whiteSpace: "pre-wrap" }}>
                                            {edu.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </Section>
                    )}

                    {data.skills.length > 0 && (
                        <Section title="Skills">
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                                {data.skills.map((skill, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            fontSize: "12pt",
                                            backgroundColor: "#f3f4f6",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: "4px",
                                            padding: "2px 8px",
                                            color: "#374151",
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </Section>
                    )}

                    {data.languages.length > 0 && (
                        <Section title="Languages">
                            {data.languages.map((lang, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "12pt",
                                        marginBottom: "4px",
                                    }}
                                >
                                    <span style={{ color: "#111827" }}>{lang.name}</span>
                                    <span style={{ color: "#9ca3af" }}>{lang.level}</span>
                                </div>
                            ))}
                        </Section>
                    )}
                </div>
            </div>
        </div>
    );
}

// ── Sub-components ───────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div style={{ marginBottom: "18px", marginTop: "12px" }}>
            <div
                style={{
                    fontSize: "14pt",
                    fontWeight: 700,
                    color: "#1d4ed8",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    borderBottom: "1px solid #e5e7eb",
                    paddingBottom: "4px",
                    marginBottom: "10px",
                }}
            >
                {title}
            </div>
            {children}
        </div>
    );
}

interface ExperienceItemProps {
    title: string;
    subtitle?: string;
    startDate?: string;
    endDate?: string;
    bullets?: string[];
    link?: string;
}

function ExperienceItem({ title, subtitle, startDate, endDate, bullets = [], link }: ExperienceItemProps) {
    const dateStr = [startDate, endDate].filter(Boolean).join(" - ");
    return (
        <div style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2px" }}>
                <span style={{ fontWeight: 700, fontSize: "12pt", color: "#111827" }}>{title}</span>
                {dateStr && (
                    <span style={{ fontSize: "12pt", color: "#9ca3af", whiteSpace: "nowrap", marginLeft: "8px" }}>
                        {dateStr}
                    </span>
                )}
            </div>
            {subtitle && (
                <div style={{ fontSize: "12pt", color: "#1d4ed8", marginBottom: "5px" }}>{subtitle}</div>
            )}
            {link && (
                <div style={{ fontSize: "12pt", color: "#1d4ed8", marginBottom: "5px" }}>{link}</div>
            )}
            {bullets.filter((b) => b.trim()).map((bullet, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", marginBottom: "3px", paddingLeft: "4px" }}>
                    <span style={{ marginRight: "7px", color: "#374151", flexShrink: 0, fontSize: "12pt" }}>•</span>
                    <span style={{ fontSize: "12pt", color: "#374151", lineHeight: 1.5 }}>{bullet}</span>
                </div>
            ))}
        </div>
    );
}
