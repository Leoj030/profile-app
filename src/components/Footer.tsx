export default function Footer() {
    return (
        <footer className="border-t border-slate-800 py-20 px-4 bg-slate-950">
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold montserrat-alternates bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                ProFile
                            </span>
                        </div>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
                            Empowering careers through intelligent AI resume
                            analysis and seamless recruitment solutions.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-white font-bold text-lg">
                            Platform
                        </h4>
                        <ul className="space-y-4 text-slate-400">
                            <li>
                                <a
                                    href="#features"
                                    className="hover:text-indigo-400 transition-colors"
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-indigo-400 transition-colors"
                                >
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-indigo-400 transition-colors"
                                >
                                    API Docs
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-white font-bold text-lg">
                            Resources
                        </h4>
                        <ul className="space-y-4 text-slate-400">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-indigo-400 transition-colors"
                                >
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-indigo-400 transition-colors"
                                >
                                    Resume Tips
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-indigo-400 transition-colors"
                                >
                                    Career Guide
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-white font-bold text-lg">
                            Company
                        </h4>
                        <ul className="space-y-4 text-slate-400">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-indigo-400 transition-colors"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-indigo-400 transition-colors"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-indigo-400 transition-colors"
                                >
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
                    <p>
                        &copy; {new Date().getFullYear()} ProFile. All rights
                        reserved.
                    </p>
                    <div className="flex gap-8">
                        <a
                            href="#"
                            className="hover:text-slate-300 transition-colors"
                        >
                            Twitter
                        </a>
                        <a
                            href="#"
                            className="hover:text-slate-300 transition-colors"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="#"
                            className="hover:text-slate-300 transition-colors"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
