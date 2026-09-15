import { Link } from "react-router-dom";
import { ArrowRightIcon, DotIcon } from "lucide-react";

const stats = [
    { val: "12", label: "Scheduled" },
    { val: "48", label: "Published" },
    { val: "4", label: "Accounts" },
    { val: "3", label: "AI Rules" },
];

const activity = [
    { text: "Post published to LinkedIn & Twitter", time: "2m ago" },
    { text: "AI replied to 3 comments", time: "15m ago" },
    { text: "New post scheduled for tomorrow 9am", time: "1h ago" },
];

export default function Hero() {
    return (
        <section className="relative overflow-hidden">
            {/* Background GIF */}
            <div className="absolute inset-0">
                <img src="/download.gif" alt="" className="w-full h-full object-cover" />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(1,31,75,0.65) 0%, rgba(3,57,108,0.55) 35%, rgba(3,57,108,0.4) 60%, rgba(179,205,224,0.9) 85%, #b3cde0 100%)",
                    }}
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-12 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm px-3.5 py-1.5 rounded-full mb-8">
                    <span className="size-1.5 bg-[#b3cde0] rounded-full" />
                    AI-Powered Social Media Automation
                </div>

                {/* Headline */}
                <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-white drop-shadow-[0_2px_20px_rgba(1,31,75,0.4)]">
                    Your social media.
                    <br />
                    Our operations. <span className="text-[#b3cde0] italic">Powered by AI</span>
                </h1>

                {/* Subheadline */}
                <p className="mt-7 text-[#e8f1f7]/90 max-w-2xl mx-auto">
                    Your AI powered social media team that creates, schedules, publishes, and analyzes content across platforms.
                </p>

                {/* CTAs */}
                <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link to="/login" className="neu-btn text-white rounded-full font-medium inline-flex items-center gap-2 text-[15px] px-8 py-3.5 w-full sm:w-auto justify-center">
                        Start for free <ArrowRightIcon className="size-4" />
                    </Link>
                    <a href="#how-it-works" className="bg-white/10 backdrop-blur-md border border-white/25 hover:bg-white/15 text-white rounded-full font-medium inline-flex items-center gap-2 text-[15px] px-8 py-3.5 w-full sm:w-auto justify-center transition-colors">
                        See how it works
                    </a>
                </div>

                <p className="mt-5 text-xs text-white/60">No credit card required · Free forever plan available</p>
            </div>

            {/* Product demo mockup — sits on the solid surface the gradient fades into */}
            <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pb-0 pt-8">
                <div className="neu-panel-dark rounded-t-2xl overflow-hidden">
                    {/* Chrome bar */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                        <div className="w-3 h-3 rounded-full bg-[#6497b1]" />
                        <div className="w-3 h-3 rounded-full bg-[#b3cde0]" />
                        <div className="w-3 h-3 rounded-full bg-[#e8f1f7]" />
                        <div className="flex-1 mx-4 rounded-md h-5 max-w-xs bg-white/10" />
                    </div>

                    {/* Mock content */}
                    <div className="p-6">
                        {/* Stat row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                            {stats.map((s) => (
                                <div key={s.label} className="rounded-xl p-4 bg-white/5 border border-white/10">
                                    <div className="text-2xl font-bold text-white tabular-nums">{s.val}</div>
                                    <div className="text-xs text-[#b3cde0] mt-1">{s.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Activity list */}
                        <div className="rounded-xl p-4 space-y-3 bg-white/5 border border-white/10">
                            <div className="text-[10px] font-semibold text-[#b3cde0] uppercase tracking-widest mb-3">Recent Activity</div>
                            {activity.map((item) => (
                                <div key={item.text} className="flex items-center gap-3">
                                    <DotIcon className="size-5 text-[#6497b1]" />
                                    <span className="text-sm text-[#e8f1f7] flex-1">{item.text}</span>
                                    <span className="text-xs text-[#b3cde0]/60 shrink-0">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}