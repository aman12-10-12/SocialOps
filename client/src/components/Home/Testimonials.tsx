import { StarIcon } from "lucide-react";
import Reveal from "./Reveal";

interface Testimonial {
    name: string;
    role: string;
    avatar: string;
    avatarBg: string;
    text: string;
}

const testimonials: Testimonial[] = [
    { name: "Sarah K.", role: "Marketing Manager", avatar: "S", avatarBg: "from-[#005b96] to-[#011f4b]", text: "SocialOps has saved our team 10+ hours a week. The AI composer is genuinely impressive — it writes content that sounds like us." },
    { name: "Marcus L.", role: "Indie Creator", avatar: "M", avatarBg: "from-[#03396c] to-[#005b96]", text: "I used to dread posting. Now I queue up a whole week of content in 20 minutes. The smart scheduling feature alone is worth it." },
    { name: "Priya D.", role: "Startup Founder", avatar: "P", avatarBg: "from-[#6497b1] to-[#005b96]", text: "Finally an automation platform that's beautiful AND powerful. The clean dashboard makes it easy to see exactly what's going out and when." },
];

export default function Testimonials() {
    return (
        <section className="px-4 sm:px-6 py-8 sm:py-12">
            <Reveal className="max-w-6xl mx-auto">
                <div className="neu-raised rounded-[2rem] px-6 sm:px-10 py-14 sm:py-20">
                    <div className="text-center mb-14">
                        <div className="neu-raised-sm mb-6 inline-flex items-center gap-1.5 text-navy-800 text-[11px] font-medium tracking-[0.06em] uppercase px-3.5 py-1.5 rounded-full">
                            <StarIcon className="size-3" />
                            Testimonials
                        </div>
                        <h2 className="font-serif font-medium text-4xl sm:text-5xl leading-tight text-navy-900">
                            Loved by <span className="text-navy-600 italic">creators &amp; teams</span>
                        </h2>
                        <p className="mt-5 text-navy-800/70 max-w-md mx-auto">Join thousands of people who automate their social media with SocialOps.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <Reveal key={t.name} delay={i * 100} className="h-full">
                                <div className="neu-raised rounded-2xl p-6 flex flex-col gap-4 h-full">
                                    <p className="text-navy-800/80 text-sm leading-relaxed flex-1">"{t.text}"</p>
                                    <div className="flex items-center gap-3 pt-4 border-t border-[#6497b1]/25">
                                        <div className={`size-9 rounded-full bg-linear-to-br ${t.avatarBg} flex items-center justify-center text-white text-sm font-bold shrink-0`}>{t.avatar}</div>
                                        <div>
                                            <div className="text-sm font-medium text-navy-900">{t.name}</div>
                                            <div className="text-xs text-navy-800/50">{t.role}</div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </Reveal>
        </section>
    );
}