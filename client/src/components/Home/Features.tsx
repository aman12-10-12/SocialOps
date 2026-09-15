import { CalendarDaysIcon, Wand2Icon, Share2Icon, ZapIcon, BarChart3Icon, HashIcon, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";

interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
}

const features: Feature[] = [
    { icon: CalendarDaysIcon, title: "Smart Scheduling", description: "Queue posts across all platforms with a single click. Set it once and let us handle the rest." },
    { icon: Wand2Icon, title: "AI Content Generator", description: "Generate on-brand captions and stunning images with our built-in AI. Never stare at a blank page again." },
    { icon: BarChart3Icon, title: "Activity Dashboard", description: "Get a bird's eye view of all published posts, scheduled content, and engagement activity in one place." },
    { icon: Share2Icon, title: "Multi-Platform", description: "Connect Twitter, LinkedIn, Facebook, and Instagram. Post everywhere from one unified workspace." },
    { icon: ZapIcon, title: "Instant Publishing", description: "Need to go live now? Publish immediately or schedule for peak engagement times with full timezone support." },
    { icon: HashIcon, title: "Hashtag Suggestions", description: "Get AI-powered hashtag suggestions to reach a wider audience." },
];

export default function Features() {
    return (
        <section id="features" className="px-4 sm:px-6 py-8 sm:py-12">
            <Reveal className="max-w-6xl mx-auto">
                <div className="neu-raised rounded-[2rem] px-6 sm:px-10 py-14 sm:py-20">
                    <div className="text-center mb-16">
                        <div className="neu-raised-sm mb-6 inline-flex items-center gap-1.5 text-navy-800 text-[11px] font-medium tracking-[0.06em] uppercase px-3.5 py-1.5 rounded-full">
                            <ZapIcon className="size-3" />
                            Everything you need
                        </div>
                        <h2 className="font-serif text-4xl sm:text-5xl font-medium leading-tight text-navy-900">
                            Automate your entire
                            <br />
                            <span className="text-navy-600 italic">social media workflow</span>
                        </h2>
                        <p className="mt-5 text-navy-800/70 max-w-xl mx-auto leading-relaxed">From content creation to scheduling — SocialOps handles it all so you can focus on what matters most.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((f, i) => (
                            <Reveal key={f.title} delay={i * 80} className="h-full">
                                <div className="neu-raised rounded-2xl p-6 h-full">
                                    <div className="neu-inset size-10 rounded-xl flex items-center justify-center mb-4 text-navy-600">
                                        <f.icon className="size-5" />
                                    </div>
                                    <h3 className="text-navy-900 mb-2">{f.title}</h3>
                                    <p className="text-sm text-navy-800/70 leading-relaxed">{f.description}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </Reveal>
        </section>
    );
}