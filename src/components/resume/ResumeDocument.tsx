"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        padding: 40,
        fontFamily: "Helvetica",
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: "#1a1a1a",
        paddingBottom: 10,
    },
    name: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#1a1a1a",
        textTransform: "uppercase",
    },
    contactRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 5,
        fontSize: 9,
        color: "#4a4a4a",
    },
    contactItem: {
        marginRight: 12,
    },
    section: {
        marginTop: 15,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#1a1a1a",
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
        paddingBottom: 2,
        marginBottom: 6,
        textTransform: "uppercase",
    },
    text: {
        fontSize: 10,
        lineHeight: 1.4,
        color: "#374151",
    },
    itemHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 2,
    },
    itemTitle: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#1a1a1a",
    },
    itemSubtitle: {
        fontSize: 9,
        color: "#4b5563",
        fontStyle: "italic",
    },
    itemDate: {
        fontSize: 9,
        color: "#6b7280",
    },
    itemDescription: {
        fontSize: 9,
        marginTop: 2,
        color: "#374151",
    },
    skillsList: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
    },
    skillItem: {
        fontSize: 9,
        backgroundColor: "#f3f4f6",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 2,
    },
});

export interface Education {
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Project {
    name: string;
    description: string;
    link: string;
}

export interface ResumeData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    summaryTitle: string;
    summary: string;
    education: Education[];
    projects: Project[];
    skills: string[];
}

interface ResumeDocumentProps {
    data: ResumeData;
}

export const ResumeDocument = ({ data }: ResumeDocumentProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.name}>
                    {data.firstName} {data.lastName}
                </Text>
                <View style={styles.contactRow}>
                    {data.email && (
                        <Text style={styles.contactItem}>{data.email}</Text>
                    )}
                    {data.phone && (
                        <Text style={styles.contactItem}>{data.phone}</Text>
                    )}
                    {data.address && (
                        <Text style={styles.contactItem}>{data.address}</Text>
                    )}
                </View>
            </View>

            {/* Summary Section */}
            {(data.summaryTitle || data.summary) && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        {data.summaryTitle || "Professional Summary"}
                    </Text>
                    <Text style={styles.text}>{data.summary}</Text>
                </View>
            )}

            {/* Education Section */}
            {data.education.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Education</Text>
                    {data.education.map((edu, index) => (
                        <View key={index} style={{ marginBottom: 8 }}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemTitle}>
                                    {edu.school}
                                </Text>
                                <Text style={styles.itemDate}>
                                    {edu.startDate} - {edu.endDate}
                                </Text>
                            </View>
                            <Text style={styles.itemSubtitle}>
                                {edu.degree}
                            </Text>
                            {edu.description && (
                                <Text style={styles.itemDescription}>
                                    {edu.description}
                                </Text>
                            )}
                        </View>
                    ))}
                </View>
            )}

            {/* Projects Section */}
            {data.projects.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Projects</Text>
                    {data.projects.map((proj, index) => (
                        <View key={index} style={{ marginBottom: 8 }}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemTitle}>
                                    {proj.name}
                                </Text>
                                {proj.link && (
                                    <Text style={styles.itemDate}>
                                        {proj.link}
                                    </Text>
                                )}
                            </View>
                            <Text style={styles.itemDescription}>
                                {proj.description}
                            </Text>
                        </View>
                    ))}
                </View>
            )}

            {/* Skills Section */}
            {data.skills.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <View style={styles.skillsList}>
                        {data.skills.map((skill, index) => (
                            <Text key={index} style={styles.skillItem}>
                                {skill}
                            </Text>
                        ))}
                    </View>
                </View>
            )}
        </Page>
    </Document>
);
