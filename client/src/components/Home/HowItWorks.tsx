import { CheckCircleIcon } from "lucide-react";
import Reveal from "./Reveal";

interface Step {
    step: string;
    title: string;
    description: string;
}

const steps: Step[] = [
    { step: "01", title: "Connect Your Accounts", description: "Link your social profiles in seconds. We support Twitter, LinkedIn, Facebook, and Instagram." },
    { step: "02", title: "Create or Generate Content", description: "Write your own post or let our AI craft a caption and image based on your prompt." },
    { step: "03", title: "Schedule & Publish", description: "Pick a time, select your platforms, and hit schedule. We handle publishing automatically." },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="px-4 sm:px-6 py-8 sm:py-12">
            <Reveal className="max-w-4xl mx-auto">
                <div className="neu-raised rounded-[2rem] px-6 sm:px-10 py-14 sm:py-20">
                    <div className="text-center mb-16">
                        <div className="neu-raised-sm mb-6 inline-flex items-center gap-1.5 text-navy-800 text-[11px] font-medium tracking-[0.06em] uppercase px-3.5 py-1.5 rounded-full">
                            <CheckCircleIcon className="size-3" />
                            Simple setup
                        </div>
                        <h2 className="font-serif font-medium text-4xl sm:text-5xl leading-tight text-navy-900">
                            Up and running in <span className="text-navy-600 italic">minutes</span>
                        </h2>
                        <p className="mt-5 text-navy-800/70 max-w-lg mx-auto leading-relaxed">No complicated onboarding, no steep learning curve. Just connect, create, and grow.</p>
                    </div>

                    <div className="space-y-6">
                        {steps.map((s, i) => (
                            <Reveal key={s.step} delay={i * 100}>
                                <div className="neu-raised rounded-2xl flex gap-6 items-start p-5">
                                    <div className="neu-inset shrink-0 size-12 rounded-2xl flex items-center justify-center">
                                        <span className="text-sm font-medium text-navy-600">{s.step}</span>
                                    </div>
                                    <div className="pt-1">
                                        <h3 className="text-navy-900 mb-1">{s.title}</h3>
                                        <p className="text-navy-800/70 text-sm leading-relaxed">{s.description}</p>
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