import { Link } from "react-router-dom";
import Reveal from "./Reveal";

const footerLinks: Record<string, string[]> = {
    Product: ["Features", "How it works", "Pricing", "Changelog"],
    Company: ["About", "Blog", "Careers", "Press"],
    Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

export default function Footer() {
    return (
        <footer className="px-4 sm:px-6 pt-8 sm:pt-12">
            <Reveal className="max-w-6xl mx-auto">
                <div className="neu-raised rounded-t-[2rem] px-5 sm:px-8 pt-14 pb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                        <div className="lg:col-span-2">
                            <Link to="/" onClick={() => scrollTo(0, 0)} className="inline-flex items-center gap-2 mb-5">
                                <img src="/logo.svg" alt="logo" className="size-6" />
                                <span className="font-medium font-serif text-xl text-navy-900">SocialOps</span>
                            </Link>
                            <p className="text-sm text-navy-800/70 leading-relaxed max-w-xs">The AI-powered social media scheduler that helps creators and teams grow faster with less effort.</p>
                        </div>

                        {Object.entries(footerLinks).map(([category, links]) => (
                            <div key={category}>
                                <div className="text-xs font-semibold uppercase tracking-widest mb-5 text-navy-800/80">{category}</div>
                                <ul className="space-y-1">
                                    {links.map((link) => (
                                        <li key={link}>
                                            <a href="#" className="text-sm text-navy-800/70 hover:text-navy-900">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#6497b1]/25">
                        <p className="text-xs text-navy-800/50">© {new Date().getFullYear()} SocialOps. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-xs text-navy-800/50 hover:text-navy-900">Privacy Policy</a>
                            <a href="#" className="text-xs text-navy-800/50 hover:text-navy-900">Terms of Service</a>
                            <Link to="/login" className="text-xs text-navy-800/50 hover:text-navy-900">Sign In</Link>
                        </div>
                    </div>
                </div>
            </Reveal>
        </footer>
    );
}