import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ProFile",
    description: "An Intelligent Resume Evaluation System",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="overflow-x-hidden">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden bg-[#0f1629]`}
            >
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
