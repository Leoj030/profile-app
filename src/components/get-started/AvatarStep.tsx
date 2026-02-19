"use client";

import { useState, useRef } from "react";
import { User, Camera, ImagePlus } from "lucide-react";

interface AvatarStepProps {
    onNext: (avatarUrl: string) => void;
}

export default function AvatarStep({ onNext }: AvatarStepProps) {
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setUploadedUrl(url);
    };

    const handleNext = () => {
        // If no upload, we pass an empty string or a default value
        // The user can proceed with the default icon
        onNext(uploadedUrl || "default");
    };

    return (
        <div className="flex flex-col items-center gap-10 w-full py-4">
            {/* Header */}
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                    Add a profile picture
                </h2>
                <p className="text-white/50 text-sm">
                    Show the community who you are
                </p>
            </div>

            {/* Avatar Upload Area */}
            <div className="relative group">
                <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />

                <div
                    onClick={() => fileRef.current?.click()}
                    className={`
                        w-32 h-32 rounded-full border-2 border-dashed border-white/10
                        flex items-center justify-center cursor-pointer overflow-hidden
                        transition-all duration-300 group-hover:border-purple-500/50 
                        bg-white/5 relative
                        ${uploadedUrl ? "border-solid border-purple-500/30" : "hover:bg-white/10"}
                    `}
                >
                    {uploadedUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                            src={uploadedUrl}
                            alt="Preview"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-white/20 group-hover:text-white/40 transition-colors">
                            <User className="w-12 h-12" />
                        </div>
                    )}

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-8 h-8 text-white" />
                    </div>
                </div>

                {/* Status Badge */}
                {uploadedUrl && (
                    <div className="absolute -bottom-1 -right-1 p-2 bg-purple-600 rounded-full shadow-lg border-2 border-[#0f1629]">
                        <ImagePlus className="w-4 h-4 text-white" />
                    </div>
                )}
            </div>

            <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                {/* Upload Button Alternative */}
                {!uploadedUrl && (
                    <button
                        onClick={() => fileRef.current?.click()}
                        className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors"
                    >
                        Click to upload photo
                    </button>
                )}

                {/* CTA */}
                <button
                    onClick={handleNext}
                    className="w-full py-3.5 mt-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold text-sm tracking-wide shadow-lg shadow-purple-500/20 active:scale-95 transition-all cursor-pointer"
                >
                    Continue
                </button>

                <p className="text-[11px] text-white/30 text-center">
                    You can always change your profile picture later in settings
                </p>
            </div>
        </div>
    );
}
