import { Button } from "./ui/Button";
import Link from "next/link";
import {
    LayoutDashboard,
    Sparkles,
    CreditCard,
    LogIn,
    UserPlus,
    X,
} from "lucide-react";

export default function SideBar({
    scaleX,
    onClose,
}: {
    scaleX: number;
    onClose: () => void;
}) {
    const isOpen = scaleX === 100;

    return (
        <aside
            className={`fixed top-0 right-0 h-screen overflow-hidden transition-all duration-500 ease-in-out z-60 ${
                isOpen ? "w-full sm:w-80 shadow-2xl" : "w-0"
            }`}
        >
            <div className="w-full sm:w-80 h-full bg-slate-950/95 backdrop-blur-2xl flex flex-col p-8 border-l border-slate-800/50 relative">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    aria-label="Close menu"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="mt-16 mb-12">
                    <h2 className="text-xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent montserrat-alternates">
                        Menu
                    </h2>
                </div>

                <nav className="flex-1">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href="/#features"
                                className="flex items-center gap-4 p-4 text-slate-300 hover:text-white hover:bg-white/5 rounded-2xl transition-all group"
                            >
                                <LayoutDashboard className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                                <span className="font-medium">Features</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/how-it-works"
                                className="flex items-center gap-4 p-4 text-slate-300 hover:text-white hover:bg-white/5 rounded-2xl transition-all group"
                            >
                                <Sparkles className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                                <span className="font-medium">
                                    How It Works
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/pricing"
                                className="flex items-center gap-4 p-4 text-slate-300 hover:text-white hover:bg-white/5 rounded-2xl transition-all group"
                            >
                                <CreditCard className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
                                <span className="font-medium">Pricing</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="mt-auto space-y-4 pt-8 border-t border-slate-800/50">
                    <Link href="/get-started" className="block">
                        <Button className="w-full py-4 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
                            <UserPlus className="w-5 h-5" />
                            Get Started
                        </Button>
                    </Link>
                    <Link href="/signin" className="block">
                        <Button className="w-full py-4 bg-slate-800/50 hover:bg-slate-700/50 text-white border border-slate-700 rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all">
                            <LogIn className="w-5 h-5" />
                            Sign In
                        </Button>
                    </Link>
                </div>
            </div>
        </aside>
    );
}
