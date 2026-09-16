import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import Reveal from "./Reveal";

export default function CTA() {
    return (
        <section className="px-4 sm:px-6 py-8 sm:py-12">
            <Reveal className="max-w-6xl mx-auto">
                <div className="neu-panel-dark relative rounded-[2rem] overflow-hidden p-14 sm:p-20 text-center">
                    <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(100,151,177,0.25) 0%, transparent 70%)" }} />
                    <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(179,205,224,0.15) 0%, transparent 70%)" }} />

                    <div className="relative">
                        <div className="mb-6 inline-flex items-center gap-1.5 bg-white/10 text-[#e8f1f7] text-[11px] font-medium tracking-[0.06em] uppercase px-3.5 py-1.5 rounded-full">Ready to grow?</div>
                        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight font-medium text-white">
                            Automate your social
                            <br />
                            <span className="text-[#b3cde0] italic">media today</span>
                        </h2>
                        <p className="mt-6 text-[#cfe0ec] max-w-lg mx-auto text-lg">Join thousands of creators and marketers who trust SocialOps to grow their audience on autopilot.</p>

                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link to="/login" className="bg-white text-navy-900 rounded-full font-semibold hover:bg-[#e8f1f7] inline-flex items-center gap-2 text-[15px] px-10 py-4 w-full sm:w-auto justify-center">
                                Get Started Free <ArrowRightIcon className="size-4" />
                            </Link>
                            <a href="#pricing" className="bg-white/10 text-white border border-white/20 rounded-full font-medium hover:bg-white/15 inline-flex items-center gap-2 text-[15px] px-10 py-4 w-full sm:w-auto justify-center">
                                View Pricing
                            </a>
                        </div>

                        <p className="mt-6 text-xs text-[#b3cde0]/70">No credit card required · Cancel anytime</p>
                    </div>
                </div>
            </Reveal>
        </section>
    );
}