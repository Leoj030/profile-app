"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const blue = "#1d4ed8";
const darkText = "#111827";
const mutedText = "#6b7280";
const lightGray = "#f3f4f6";
const dividerColor = "#e5e7eb";

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        paddingTop: 54,
        paddingBottom: 40,
        paddingHorizontal: 40,
        fontFamily: "Helvetica",
        fontSize: 12,
    },
    // ── Header ──────────────────────────────────────────────────────────
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        borderBottomWidth: 1.5,
        borderBottomColor: dividerColor,
        paddingBottom: 12,
        marginBottom: 16,
    },
    headerLeft: { flexDirection: "column" },
    name: {
        fontSize: 25,
        fontFamily: "Helvetica-Bold",
        color: darkText,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    roleTitle: {
        fontSize: 15,
        color: mutedText,
        marginTop: 3,
    },
    headerRight: {
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 2,
    },
    contactItem: {
        fontSize: 12,
        color: mutedText,
        marginBottom: 2,
    },
    // ── Two-column body ──────────────────────────────────────────────────
    body: {
        flexDirection: "row",
        gap: 22,
    },
    leftCol: { flex: 2 },
    rightCol: { flex: 1 },
    // ── Section ─────────────────────────────────────────────────────────
    section: { marginBottom: 16, marginTop: 9 },
    sectionTitle: {
        fontSize: 14,
        fontFamily: "Helvetica-Bold",
        color: blue,
        textTransform: "uppercase",
        letterSpacing: 0.8,
        borderBottomWidth: 1,
        borderBottomColor: dividerColor,
        paddingBottom: 3,
        marginBottom: 8,
    },
    // ── Experience / Project item ────────────────────────────────────────
    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 2,
    },
    itemTitle: {
        fontSize: 12,
        fontFamily: "Helvetica-Bold",
        color: darkText,
    },
    itemDate: { fontSize: 12, color: mutedText },
    itemSubtitle: { fontSize: 12, color: blue, marginBottom: 4 },
    bullet: {
        flexDirection: "row",
        marginBottom: 3,
        paddingLeft: 4,
    },
    bulletDot: { fontSize: 12, color: darkText, marginRight: 5 },
    bulletText: { fontSize: 12, color: "#374151", flex: 1, lineHeight: 1.45 },
    // ── Education item ───────────────────────────────────────────────────
    eduTitle: {
        fontSize: 12,
        fontFamily: "Helvetica-Bold",
        color: darkText,
        marginBottom: 1,
    },
    eduSchool: { fontSize: 12, color: "#374151" },
    eduDate: { fontSize: 12, color: mutedText },
    // ── Skills ──────────────────────────────────────────────────────────
    skillsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 5 },
    skillBadge: {
        fontSize: 12,
        backgroundColor: lightGray,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 3,
        color: darkText,
    },
    // ── Languages ────────────────────────────────────────────────────────
    langRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    langName: { fontSize: 12, color: darkText },
    langLevel: { fontSize: 12, color: mutedText },
    // ── Summary ────────────────────────────────────────────────────────
    summaryText: { fontSize: 12, lineHeight: 1.55, color: "#374151" },
});

// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface Education {
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Experience {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    bullets: string[];
}

export interface Project {
    name: string;
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    bullets: string[];
    link: string;
}

export interface Language {
    name: string;
    level: string;
}

export interface ResumeData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string;
    summaryTitle: string;
    summary: string;
    experience: Experience[];
    education: Education[];
    projects: Project[];
    skills: string[];
    languages: Language[];
}

interface ResumeDocumentProps {
    data: ResumeData;
}

// ─── PDF Document ─────────────────────────────────────────────────────────────

export const ResumeDocument = ({ data }: ResumeDocumentProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* ── Header ── */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.name}>
                        {data.firstName} {data.lastName}
                    </Text>
                    {data.summaryTitle ? (
                        <Text style={styles.roleTitle}>{data.summaryTitle}</Text>
                    ) : null}
                </View>
                <View style={styles.headerRight}>
                    {data.email ? (
                        <Text style={styles.contactItem}>{data.email}</Text>
                    ) : null}
                    {data.phone ? (
                        <Text style={styles.contactItem}>{data.phone}</Text>
                    ) : null}
                    {data.address ? (
                        <Text style={styles.contactItem}>{data.address}</Text>
                    ) : null}
                    {data.linkedin ? (
                        <Text style={styles.contactItem}>{data.linkedin}</Text>
                    ) : null}
                </View>
            </View>

            {/* ── Two-column body ── */}
            <View style={styles.body}>
                {/* LEFT COLUMN */}
                <View style={styles.leftCol}>
                    {/* Professional Summary */}
                    {data.summary ? (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                Professional Summary
                            </Text>
                            <Text style={styles.summaryText}>
                                {data.summary}
                            </Text>
                        </View>
                    ) : null}

                    {/* Experience */}
                    {data.experience.length > 0 ? (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Experience</Text>
                            {data.experience.map((exp, i) => (
                                <View
                                    key={i}
                                    style={{ marginBottom: 10 }}
                                >
                                    <View style={styles.itemRow}>
                                        <Text style={styles.itemTitle}>
                                            {exp.title}
                                        </Text>
                                        <Text style={styles.itemDate}>
                                            {exp.startDate}
                                            {exp.startDate || exp.endDate
                                                ? " - "
                                                : ""}
                                            {exp.endDate}
                                        </Text>
                                    </View>
                                    {(exp.company || exp.location) ? (
                                        <Text style={styles.itemSubtitle}>
                                            {[exp.company, exp.location]
                                                .filter(Boolean)
                                                .join(" | ")}
                                        </Text>
                                    ) : null}
                                    {exp.bullets
                                        .filter((b) => b.trim())
                                        .map((b, bi) => (
                                            <View key={bi} style={styles.bullet}>
                                                <Text style={styles.bulletDot}>
                                                    •
                                                </Text>
                                                <Text style={styles.bulletText}>
                                                    {b}
                                                </Text>
                                            </View>
                                        ))}
                                </View>
                            ))}
                        </View>
                    ) : null}

                    {/* Projects */}
                    {data.projects.length > 0 ? (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Key Projects</Text>
                            {data.projects.map((proj, i) => (
                                <View key={i} style={{ marginBottom: 10 }}>
                                    <View style={styles.itemRow}>
                                        <Text style={styles.itemTitle}>
                                            {proj.name}
                                        </Text>
                                        {(proj.startDate || proj.endDate) ? (
                                            <Text style={styles.itemDate}>
                                                {proj.startDate}
                                                {proj.startDate || proj.endDate
                                                    ? " - "
                                                    : ""}
                                                {proj.endDate}
                                            </Text>
                                        ) : null}
                                    </View>
                                    {(proj.role || proj.company || proj.location) ? (
                                        <Text style={styles.itemSubtitle}>
                                            {[proj.role, proj.company, proj.location]
                                                .filter(Boolean)
                                                .join(" | ")}
                                        </Text>
                                    ) : null}
                                    {proj.bullets
                                        .filter((b) => b.trim())
                                        .map((b, bi) => (
                                            <View key={bi} style={styles.bullet}>
                                                <Text style={styles.bulletDot}>
                                                    •
                                                </Text>
                                                <Text style={styles.bulletText}>
                                                    {b}
                                                </Text>
                                            </View>
                                        ))}
                                    {proj.link ? (
                                        <Text
                                            style={{
                                                ...styles.itemSubtitle,
                                                marginTop: 2,
                                            }}
                                        >
                                            {proj.link}
                                        </Text>
                                    ) : null}
                                </View>
                            ))}
                        </View>
                    ) : null}
                </View>

                {/* RIGHT COLUMN */}
                <View style={styles.rightCol}>
                    {/* Education */}
                    {data.education.length > 0 ? (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Education</Text>
                            {data.education.map((edu, i) => (
                                <View key={i} style={{ marginBottom: 8 }}>
                                    <Text style={styles.eduTitle}>
                                        {edu.degree}
                                    </Text>
                                    <Text style={styles.eduSchool}>
                                        {edu.school}
                                    </Text>
                                    {(edu.startDate || edu.endDate) ? (
                                        <Text style={styles.eduDate}>
                                            {edu.startDate} - {edu.endDate}
                                        </Text>
                                    ) : null}
                                    {edu.description ? (
                                        <Text
                                            style={{
                                                ...styles.summaryText,
                                                marginTop: 2,
                                            }}
                                        >
                                            {edu.description}
                                        </Text>
                                    ) : null}
                                </View>
                            ))}
                        </View>
                    ) : null}

                    {/* Skills */}
                    {data.skills.length > 0 ? (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Skills</Text>
                            <View style={styles.skillsWrap}>
                                {data.skills.map((skill, i) => (
                                    <Text key={i} style={styles.skillBadge}>
                                        {skill}
                                    </Text>
                                ))}
                            </View>
                        </View>
                    ) : null}

                    {/* Languages */}
                    {data.languages.length > 0 ? (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Languages</Text>
                            {data.languages.map((lang, i) => (
                                <View key={i} style={styles.langRow}>
                                    <Text style={styles.langName}>
                                        {lang.name}
                                    </Text>
                                    <Text style={styles.langLevel}>
                                        {lang.level}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    ) : null}
                </View>
            </View>
        </Page>
    </Document>
);
