import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import { useAuth } from "../../context/authContext";

export default function Navbar() {
    const { user } = useAuth();

    return (
        <nav className="sticky top-0 z-50 bg-[#b3cde0]/90 backdrop-blur-lg border-b border-[#6497b1]/20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <Link to="/" onClick={() => scrollTo(0, 0)} className="flex items-center gap-2">
                    <img src="/logo.svg" alt="logo" className="size-7" />
                    <span className="text-xl lg:text-2xl font-medium font-serif text-navy-900">SocialOps</span>
                </Link>
                <div className="hidden md:flex items-center gap-8 text-sm text-navy-800/70">
                    <a href="#features" className="hover:text-navy-900">Features</a>
                    <a href="#how-it-works" className="hover:text-navy-900">How it works</a>
                    <a href="#pricing" className="hover:text-navy-900">Pricing</a>
                </div>

                {user ? (
                    <Link to="/dashboard" className="neu-btn flex items-center gap-1.5 text-sm font-medium text-white px-4 py-2 rounded-full">
                        Go to Dashboard <ArrowRightIcon className="size-3.5" />
                    </Link>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="text-sm text-navy-800/80 hover:text-navy-900 hidden sm:block">
                            Sign In
                        </Link>
                        <Link to="/login" className="neu-btn flex items-center gap-1.5 text-sm text-white px-4 py-2 rounded-full">
                            Get Started <ArrowRightIcon className="size-3.5" />
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}