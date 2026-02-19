import Hamburger from "./ui/Hamburger";
import HeaderButton from "./header_components/HeaderButton";
import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full h-20 fixed top-0 left-0 bg-slate-950/20 flex justify-center items-center px-6 backdrop-blur-md border-b border-slate-800/50 z-50">
            <div className="container max-w-7xl flex justify-between items-center w-full">
                <section className="flex items-center">
                    <Link
                        href={"/"}
                        className="group transition-transform duration-300 hover:scale-105"
                    >
                        <h1 className="montserrat-alternates text-2xl font-bold bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-indigo-300 group-hover:to-pink-300 transition-all">
                            ProFile
                        </h1>
                    </Link>
                </section>

                <nav className="hidden lg:block">
                    <ul className="flex items-center gap-1 font-medium text-slate-300">
                        <li>
                            <Link
                                href={"#features"}
                                className="px-5 py-2 rounded-full hover:text-white hover:bg-white/5 transition-all duration-300 ease-in-out"
                            >
                                Features
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={"/how-it-works"}
                                className="px-5 py-2 rounded-full hover:text-white hover:bg-white/5 transition-all duration-300 ease-in-out"
                            >
                                How It Works
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={"/pricing"}
                                className="px-5 py-2 rounded-full hover:text-white hover:bg-white/5 transition-all duration-300 ease-in-out"
                            >
                                Pricing
                            </Link>
                        </li>
                    </ul>
                </nav>

                <section className="flex items-center gap-4">
                    <Hamburger color="bg-slate-200" />
                    <HeaderButton />
                </section>
            </div>
        </header>
    );
}
