import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailIcon, LockIcon, User2Icon, ArrowRightIcon, EyeIcon, EyeOffIcon, SparklesIcon } from "lucide-react";
import AuthLayout from "./AuthLayout";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [agree, setAgree] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError("Fill in your name, email, and a password.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords don't match.");
            return;
        }
        if (!agree) {
            setError("Please agree to the Terms to continue.");
            return;
        }
        setError("");
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate("/dashboard");
        }, 1000);
    };

    return (
        <AuthLayout>
            <div className="flex flex-col items-center mb-8 text-center">
                <span className="mb-3 flex items-center justify-center size-11 rounded-2xl bg-gradient-to-br from-[#03396c] to-[#005b96] shadow-[0_10px_24px_-8px_rgba(0,91,150,0.55)] so-bob">
                    <SparklesIcon className="size-5 text-white" />
                </span>
                <h1 className="text-2xl font-semibold bg-gradient-to-r from-[#011f4b] to-[#005b96] bg-clip-text text-transparent">
                    Create your account
                </h1>
                <p className="text-slate-500 text-sm mt-1">Start scheduling across every platform</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-sm" noValidate>
                {error && (
                    <div className="text-xs text-red-600 bg-red-50 rounded-xl px-4 py-2.5 shadow-[inset_2px_2px_5px_#e8bcbc,inset_-2px_-2px_5px_#ffffff]">
                        {error}
                    </div>
                )}

                <div>
                    <label className="block mb-1.5 text-[#03396c] font-medium">Name</label>
                    <div className="relative">
                        <User2Icon className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#6497b1]" />
                        <input
                            type="text"
                            required
                            placeholder="Enter your name"
                            className="w-full pl-11 pr-4 py-3 bg-[#eef3f9] text-[#011f4b] placeholder:text-slate-400 rounded-full outline-none shadow-[inset_4px_4px_8px_#c7d4e3,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_5px_5px_10px_#c7d4e3,inset_-5px_-5px_10px_#ffffff] focus:ring-2 focus:ring-[#005b96]/30 transition-shadow"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1.5 text-[#03396c] font-medium">Email</label>
                    <div className="relative">
                        <MailIcon className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#6497b1]" />
                        <input
                            type="email"
                            required
                            placeholder="you@company.com"
                            className="w-full pl-11 pr-4 py-3 bg-[#eef3f9] text-[#011f4b] placeholder:text-slate-400 rounded-full outline-none shadow-[inset_4px_4px_8px_#c7d4e3,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_5px_5px_10px_#c7d4e3,inset_-5px_-5px_10px_#ffffff] focus:ring-2 focus:ring-[#005b96]/30 transition-shadow"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1.5 text-[#03396c] font-medium">Password</label>
                    <div className="relative">
                        <LockIcon className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#6497b1]" />
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="Create a password"
                            className="w-full pl-11 pr-11 py-3 bg-[#eef3f9] text-[#011f4b] placeholder:text-slate-400 rounded-full outline-none shadow-[inset_4px_4px_8px_#c7d4e3,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_5px_5px_10px_#c7d4e3,inset_-5px_-5px_10px_#ffffff] focus:ring-2 focus:ring-[#005b96]/30 transition-shadow"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6497b1] hover:text-[#03396c]"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block mb-1.5 text-[#03396c] font-medium">Confirm password</label>
                    <div className="relative">
                        <LockIcon className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#6497b1]" />
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="Repeat your password"
                            className="w-full pl-11 pr-4 py-3 bg-[#eef3f9] text-[#011f4b] placeholder:text-slate-400 rounded-full outline-none shadow-[inset_4px_4px_8px_#c7d4e3,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_5px_5px_10px_#c7d4e3,inset_-5px_-5px_10px_#ffffff] focus:ring-2 focus:ring-[#005b96]/30 transition-shadow"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>

                <label className="flex items-start gap-2.5 text-xs text-slate-500 px-1 cursor-pointer select-none">
                    <span
                        onClick={() => setAgree((v) => !v)}
                        className={`mt-0.5 shrink-0 size-4 rounded-md flex items-center justify-center transition-shadow ${
                            agree
                                ? "bg-gradient-to-br from-[#03396c] to-[#005b96] shadow-[1px_1px_3px_#c7d4e3]"
                                : "bg-[#eef3f9] shadow-[inset_2px_2px_4px_#c7d4e3,inset_-2px_-2px_4px_#ffffff]"
                        }`}
                    >
                        {agree && <span className="size-1.5 rounded-full bg-white" />}
                    </span>
                    <span>
                        I agree to the{" "}
                        <a href="#terms" className="text-[#005b96] hover:text-[#03396c] font-medium">Terms</a> and{" "}
                        <a href="#privacy" className="text-[#005b96] hover:text-[#03396c] font-medium">Privacy Policy</a>.
                    </span>
                </label>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-gradient-to-r from-[#03396c] to-[#005b96] text-white rounded-full text-sm font-medium transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-[0_10px_28px_-8px_rgba(0,91,150,0.55)] hover:shadow-[0_14px_34px_-6px_rgba(0,91,150,0.65)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[inset_3px_3px_8px_#012347,inset_-3px_-3px_8px_#016cae]"
                >
                    {loading ? "Creating account..." : (
                        <>
                            Sign Up <ArrowRightIcon className="size-4" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link to="/login" className="text-[#005b96] hover:text-[#03396c] font-medium">
                    Sign In
                </Link>
            </div>
        </AuthLayout>
    );
}