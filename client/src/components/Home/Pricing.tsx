import { CheckIcon, CircleCheckBigIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";

interface PricingPlan {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    cta: string;
    highlight: boolean;
}

const pricingPlans: PricingPlan[] = [
    { name: "Starter", price: "Free", period: "", description: "Perfect for creators just getting started with social media automation.", features: ["2 social accounts", "10 scheduled posts/month", "AI content (5 credits/mo)", "Basic dashboard"], cta: "Get Started Free", highlight: false },
    { name: "Pro", price: "$29", period: "/month", description: "Everything you need to grow and automate your social presence.", features: ["Unlimited accounts", "Unlimited scheduling", "AI content (200 credits/mo)", "Priority support"], cta: "Start 14-day Free Trial", highlight: true },
    { name: "Agency", price: "$79", period: "/month", description: "For teams and agencies managing multiple brands at scale.", features: ["Everything in Pro", "5 team members", "Unlimited AI credits", "Custom AI personas", "Dedicated support"], cta: "Contact Sales", highlight: false },
];

export default function Pricing() {
    return (
        <section id="pricing" className="px-4 sm:px-6 py-8 sm:py-12">
            <Reveal className="max-w-6xl mx-auto">
                <div className="neu-raised rounded-[2rem] px-6 sm:px-10 py-14 sm:py-20">
                    <div className="text-center mb-16">
                        <div className="neu-raised-sm mb-6 inline-flex items-center gap-1.5 text-navy-800 text-[11px] font-medium tracking-[0.06em] uppercase px-3.5 py-1.5 rounded-full">
                            <CircleCheckBigIcon className="size-3" />
                            Simple pricing
                        </div>
                        <h2 className="font-serif font-medium text-4xl sm:text-5xl leading-tight text-navy-900">
                            Plans for every stage
                            <br />
                            <span className="text-navy-600 italic">of growth</span>
                        </h2>
                        <p className="mt-5 text-navy-800/70 max-w-md mx-auto">Start free, upgrade when you're ready. Cancel anytime — no hidden fees.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                        {pricingPlans.map((plan, i) => (
                            <Reveal key={plan.name} delay={i * 100} className="h-full">
                                <div className={`h-full rounded-2xl p-7 flex flex-col gap-6 relative ${plan.highlight ? "neu-panel-dark text-white" : "neu-raised text-navy-900"}`}>
                                    {plan.highlight && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-navy-900 text-xs font-bold px-3.5 py-1.5 rounded-full">Most Popular</div>}
                                    <div>
                                        <div className={`text-sm font-semibold mb-1 ${plan.highlight ? "text-[#b3cde0]" : "text-navy-600"}`}>{plan.name}</div>
                                        <div className="flex items-end gap-1">
                                            <span className="text-4xl font-bold">{plan.price}</span>
                                            <span className={`text-sm mb-1.5 ${plan.highlight ? "text-[#b3cde0]/80" : "text-navy-800/50"}`}>{plan.period}</span>
                                        </div>
                                        <p className={`text-sm mt-2 leading-relaxed ${plan.highlight ? "text-[#b3cde0]/90" : "text-navy-800/70"}`}>{plan.description}</p>
                                    </div>

                                    <ul className="space-y-2.5">
                                        {plan.features.map((f) => (
                                            <li key={f} className="flex items-center gap-2.5 text-sm">
                                                <div className={`size-4 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? "bg-white/15" : "neu-inset"}`}>
                                                    <CheckIcon className={`w-2.5 h-2.5 ${plan.highlight ? "text-white" : "text-navy-600"}`} />
                                                </div>
                                                <span className={plan.highlight ? "text-[#e8f1f7]" : "text-navy-800/80"}>{f}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link to="/#" className={`mt-auto text-center font-semibold text-sm px-6 py-3 rounded-full ${plan.highlight ? "bg-white text-navy-900 hover:bg-[#e8f1f7]" : "neu-btn text-white"}`}>
                                        {plan.cta}
                                    </Link>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </Reveal>
        </section>
    );
}