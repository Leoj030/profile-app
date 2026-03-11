"use client";

import { useState, useRef, ChangeEvent, DragEvent, useEffect } from "react";
import { UploadIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import evaluateResume from "@/app/actions/evaluate/evaluate-resume";

export default function UploadZone() {
    const [file, setFile] = useState<File | null>(null);
    const [uploadState, setUploadState] = useState<"idle" | "progress" | "analyze">("idle");
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const processFile = (selectedFile: File) => {
        setFile(selectedFile);
        setUploadState("progress");
        setProgress(0);
        
        // Start evaluation background process
        const formData = new FormData();
        formData.append('file', selectedFile);
        
        evaluateResume(formData).then((resultId) => {
            if (resultId) {
                // When evaluation finishes, redirect with id!
                router.push(`/resume-evaluation/result?id=${resultId}`);
            }
        }).catch((error) => {
            console.error("Evaluation failed:", error);
            alert("Error parsing resume. Please try again.");
            setUploadState("idle");
        });
    };

    useEffect(() => {
        if (uploadState === "progress") {
            const startTime = Date.now();
            const duration = 2000;
            const interval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const newProgress = Math.min((elapsed / duration) * 100, 100);
                setProgress(newProgress);
                
                if (newProgress >= 100) {
                    clearInterval(interval);
                    setUploadState("analyze");
                }
            }, 50);
            return () => clearInterval(interval);
        }
    }, [uploadState]);

    useEffect(() => {
        if (uploadState === "analyze") {
            const timeout = setTimeout(() => {
                // Not clicked after 500ms -> go to skeleton result page
                router.push("/resume-evaluation/result");
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [uploadState, router]);

    const handleAnalyzeClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (uploadState === "analyze") {
            router.push("/resume-evaluation/result");
        }
    };

    return (
        <div 
            onClick={() => uploadState === "idle" && fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={`flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-2xl p-12 lg:p-20 transition-all duration-500 ${uploadState === 'idle' ? 'hover:border-indigo-500/50 hover:bg-slate-900/30 cursor-pointer' : ''} group/upload relative`}
        >
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="application/pdf,image/*" 
                onChange={handleFileChange} 
                disabled={uploadState !== "idle"}
            />

            <div className="relative mb-8">
                <div className={`p-6 bg-slate-900 rounded-full border border-slate-800 transition-transform duration-500 relative z-10 ${uploadState === 'idle' ? 'group-hover/upload:scale-110' : ''}`}>
                    <UploadIcon className="w-10 h-10 text-indigo-400" />
                </div>
                <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-20 transition-opacity group-hover/upload:opacity-40"></div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3">
                {uploadState === "idle" ? "Drop your resume here" : "File Selected"}
            </h3>
            <p className="text-slate-400 text-sm mb-8 text-center max-w-xs break-all">
                {uploadState === "idle" ? "Drag and drop your PDF file or click to browse. Standard format (Max 2MB)." : file?.name}
            </p>

            <div className="w-full max-w-xs flex justify-center">
                {uploadState === "idle" ? (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current?.click();
                        }}
                        className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-xl shadow-indigo-600/20 active:scale-95 z-10"
                    >
                        Select File <UploadIcon className="w-4 h-4 text-white" />
                    </button>
                ) : uploadState === "progress" ? (
                    <div className="w-full h-12 bg-slate-900/80 p-1 flex items-center rounded-2xl border border-slate-800 relative overflow-hidden">
                        <div 
                            className="h-full bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl transition-all duration-75 ease-linear"
                            style={{ width: `${progress}%` }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-black uppercase text-white tracking-widest z-10 drop-shadow-md">
                            Scanning... {Math.round(progress)}%
                        </span>
                    </div>
                ) : (
                    <button
                        onClick={handleAnalyzeClick}
                        className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-xl shadow-emerald-600/20 active:scale-95 z-10 animate-fade-in"
                    >
                        Analyze Now <ArrowRightIcon className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
}
