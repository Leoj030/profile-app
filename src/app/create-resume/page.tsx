import ResumeCreator from "@/components/resume/ResumeCreator";

export default function CreateResumePage() {
    return (
        <main className="min-h-screen bg-[#0f1629] relative overflow-hidden">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="container max-w-7xl mx-auto px-6">
                <ResumeCreator />
            </div>
        </main>
    );
}
