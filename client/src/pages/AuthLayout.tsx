import { Link } from "react-router-dom";
import { TimerIcon, LinkIcon, BookIcon, SparklesIcon } from "lucide-react";

const STEPS = [
  {
    n: "01",
    title: "Connect Your Accounts",
    desc: "Link your social profiles in seconds. We support Twitter, LinkedIn, Facebook, and Instagram.",
  },
  {
    n: "02",
    title: "Create or Generate Content",
    desc: "Write your own post or let our AI craft a caption and image based on your prompt.",
  },
  {
    n: "03",
    title: "Schedule & Publish",
    desc: "Pick a time, select your platforms, and hit schedule. We handle publishing automatically.",
  },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#eef3f9] flex items-center justify-center p-4">
      <style>{`
        @keyframes so-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes so-orbit { to { transform: rotate(360deg); } }
        @keyframes so-orbit-rev { to { transform: rotate(-360deg); } }
        @keyframes so-twinkle { 0%, 100% { opacity: .35; transform: scale(.85); } 50% { opacity: 1; transform: scale(1.1); } }
        @keyframes so-ping { 0% { transform: scale(0.7); opacity: 0.6; } 100% { transform: scale(1.9); opacity: 0; } }
        @keyframes so-drift { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(18px,-14px) scale(1.06); } }
        @keyframes so-drift-rev { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-16px,16px) scale(1.08); } }
        .so-bob { animation: so-bob 3.2s ease-in-out infinite; }
        .so-bob-d2 { animation: so-bob 3.6s ease-in-out infinite; animation-delay: .4s; }
        .so-bob-d3 { animation: so-bob 2.8s ease-in-out infinite; animation-delay: .8s; }
        .so-orbit { animation: so-orbit 14s linear infinite; transform-origin: center; transform-box: fill-box; }
        .so-orbit-rev { animation: so-orbit-rev 22s linear infinite; transform-origin: center; transform-box: fill-box; }
        .so-twinkle { animation: so-twinkle 2.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .so-badge-counter { animation: so-orbit-rev 14s linear infinite; transform-origin: center; transform-box: fill-box; }
        .so-ping { animation: so-ping 2.8s cubic-bezier(0,0,0.2,1) infinite; transform-box: fill-box; transform-origin: center; }
        .so-ping-d2 { animation-delay: 1.4s; }
        .so-drift { animation: so-drift 9s ease-in-out infinite; }
        .so-drift-rev { animation: so-drift-rev 11s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .so-bob, .so-bob-d2, .so-bob-d3, .so-orbit, .so-orbit-rev, .so-twinkle,
          .so-badge-counter, .so-ping, .so-ping-d2, .so-drift, .so-drift-rev { animation: none !important; }
        }
      `}</style>

      <div className="relative w-full max-w-5xl min-h-[660px] rounded-[32px] bg-white shadow-[20px_20px_48px_#c7d4e3,-20px_-20px_48px_#ffffff] overflow-hidden flex flex-col lg:flex-row">
        {/* Left: pitch + steps + illustration */}
        <div className="relative lg:w-[46%] p-8 sm:p-10 bg-gradient-to-br from-[#011f4b] via-[#03396c] to-[#005b96] text-white flex flex-col gap-7 overflow-hidden">
          <div className="pointer-events-none absolute -top-20 -left-16 size-64 rounded-full bg-[#6497b1] opacity-20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 size-72 rounded-full bg-[#b3cde0] opacity-10 blur-3xl" />

          <Link to="/" className="flex items-center gap-2 relative z-10">
            <span className="flex items-center justify-center size-8 rounded-xl bg-white/10">
              <Share2LikeIcon />
            </span>
            <span className="text-lg font-semibold tracking-tight">SocialOps</span>
          </Link>

          <div className="relative z-10 flex justify-center py-1">
            <svg viewBox="0 0 320 220" className="w-full max-w-[300px] h-auto" aria-hidden="true">
              <circle cx="160" cy="110" r="86" fill="none" stroke="#6497b1" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 6" />

              {/* radar pulse rings broadcasting from the post card */}
              <circle className="so-ping" cx="160" cy="110" r="30" fill="none" stroke="#6497b1" strokeWidth="2" />
              <circle className="so-ping so-ping-d2" cx="160" cy="110" r="30" fill="none" stroke="#b3cde0" strokeWidth="2" />

              <g className="so-orbit">
                <g transform="translate(160,24)">
                  <g className="so-badge-counter">
                    <circle r="20" fill="#ffffff" />
                    <g transform="translate(-10,-10)"><LinkIcon size={20} color="#03396c" /></g>
                  </g>
                </g>
              </g>
              <g className="so-orbit" style={{ animationDelay: "-3.5s" }}>
                <g transform="translate(160,24) rotate(90 0 86)">
                  <g className="so-badge-counter">
                    <circle r="20" fill="#ffffff" />
                    <g transform="translate(-10,-10)"><LinkIcon size={20} color="#03396c" /></g>
                  </g>
                </g>
              </g>
              <g className="so-orbit" style={{ animationDelay: "-7s" }}>
                <g transform="translate(160,24) rotate(180 0 86)">
                  <g className="so-badge-counter">
                    <circle r="20" fill="#ffffff" />
                    <g transform="translate(-10,-10)"><TimerIcon size={20} color="#03396c" /></g>
                  </g>
                </g>
              </g>
              <g className="so-orbit" style={{ animationDelay: "-10.5s" }}>
                <g transform="translate(160,24) rotate(270 0 86)">
                  <g className="so-badge-counter">
                    <circle r="20" fill="#ffffff" />
                    <g transform="translate(-10,-10)"><BookIcon size={20} color="#03396c" /></g>
                  </g>
                </g>
              </g>

              <g className="so-bob" transform="translate(112,78)">
                <rect width="96" height="64" rx="12" fill="#ffffff" />
                <rect x="12" y="14" width="72" height="8" rx="4" fill="#b3cde0" />
                <rect x="12" y="30" width="52" height="8" rx="4" fill="#b3cde0" />
                <rect x="12" y="46" width="36" height="8" rx="4" fill="#6497b1" />
                <g transform="translate(70,-10)">
                  <circle r="13" fill="#005b96" />
                  <g transform="translate(-7,-7)" className="so-twinkle"><SparklesIcon size={14} color="#ffffff" /></g>
                </g>
              </g>

              <g className="so-twinkle" transform="translate(40,150)">
                <path d="M0,6 L2,2 L6,0 L2,-2 L0,-6 L-2,-2 L-6,0 L-2,2 Z" fill="#b3cde0" />
              </g>
              <g className="so-twinkle" style={{ animationDelay: ".8s" }} transform="translate(276,60)">
                <path d="M0,5 L1.6,1.6 L5,0 L1.6,-1.6 L0,-5 L-1.6,-1.6 L-5,0 L-1.6,1.6 Z" fill="#b3cde0" />
              </g>
            </svg>
          </div>

          <ol className="relative z-10 flex flex-col gap-5 pl-1">
            <div className="absolute left-[21px] top-3 bottom-3 w-px bg-white/15" aria-hidden="true" />
            {STEPS.map((s) => (
              <li key={s.n} className="relative flex gap-4">
                <span className="relative shrink-0 size-9 rounded-full flex items-center justify-center text-xs font-bold bg-gradient-to-br from-[#03396c] to-[#011f4b] shadow-[4px_4px_8px_#01142e,-4px_-4px_8px_#065693]">
                  {s.n}
                </span>
                <div className="pt-1">
                  <p className="text-sm font-semibold">{s.title}</p>
                  <p className="text-xs text-[#b3cde0] leading-relaxed mt-0.5">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Right: color glow background + frosted glass form card */}
        <div className="relative flex-1 flex items-center justify-center p-8 sm:p-10 overflow-hidden bg-[#eef3f9]">
          <div className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-[#6497b1] opacity-40 blur-3xl so-drift" />
          <div className="pointer-events-none absolute -bottom-28 -left-20 size-64 rounded-full bg-[#005b96] opacity-30 blur-3xl so-drift-rev" />
          <div className="pointer-events-none absolute top-1/4 right-10 size-36 rounded-full bg-[#b3cde0] opacity-50 blur-2xl so-drift" style={{ animationDelay: "-4s" }} />
          <div className="pointer-events-none absolute bottom-16 right-1/3 size-24 rounded-full bg-[#03396c] opacity-10 blur-2xl so-drift-rev" style={{ animationDelay: "-2s" }} />

          <div className="relative w-full max-w-sm rounded-[28px] bg-white/70 backdrop-blur-xl border border-white/70 shadow-[0_24px_60px_-20px_rgba(1,31,75,0.35)] p-8 sm:p-9">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}


function Share2LikeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="6" cy="12" r="2.6" fill="#ffffff" />
      <circle cx="18" cy="6" r="2.6" fill="#ffffff" />
      <circle cx="18" cy="18" r="2.6" fill="#ffffff" />
      <path d="M8.2 10.8 15.8 7M8.2 13.2 15.8 17" stroke="#ffffff" strokeWidth="1.4" />
    </svg>
  );
}