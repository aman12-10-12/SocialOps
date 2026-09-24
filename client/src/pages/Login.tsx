import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { MailIcon, LockIcon, ArrowRightIcon, EyeIcon, EyeOffIcon, SparklesIcon } from "lucide-react";
import AuthLayout from "./AuthLayout";
import api from "../api/axios";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Enter your email and password to continue.");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const { data } = await api.post("/api/auth/login", { email, password });

            if (!data?._id) {
                throw new Error("Invalid login response.");
            }

            login(data);
            toast.success(`Welcome back, ${data.name}!`);
            navigate("/dashboard", { replace: true });
        } catch (err) {
            const message = err instanceof AxiosError
                    ? err.response?.data?.message ?? "Something went wrong. Please try again."
                    : "Something went wrong. Please try again.";
            setError(message);
            toast.error(message)
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="flex flex-col items-center mb-8 text-center">
                <span className="mb-3 flex items-center justify-center size-11 rounded-2xl bg-gradient-to-br from-[#03396c] to-[#005b96] shadow-[0_10px_24px_-8px_rgba(0,91,150,0.55)] so-bob">
                    <SparklesIcon className="size-5 text-white" />
                </span>
                <h1 className="text-2xl font-semibold bg-gradient-to-r from-[#011f4b] to-[#005b96] bg-clip-text text-transparent">
                    Welcome back
                </h1>
                <p className="text-slate-500 text-sm mt-1">Sign in to your SocialOps dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-sm" noValidate>
                {error && (
                    <div className="text-xs text-red-600 bg-red-50 rounded-xl px-4 py-2.5 shadow-[inset_2px_2px_5px_#e8bcbc,inset_-2px_-2px_5px_#ffffff]">
                        {error}
                    </div>
                )}

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
                            placeholder="********"
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

                <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <span
                            onClick={() => setRemember((v) => !v)}
                            className={`size-4 rounded-md flex items-center justify-center transition-shadow ${
                                remember
                                    ? "bg-gradient-to-br from-[#03396c] to-[#005b96] shadow-[1px_1px_3px_#c7d4e3]"
                                    : "bg-[#eef3f9] shadow-[inset_2px_2px_4px_#c7d4e3,inset_-2px_-2px_4px_#ffffff]"
                            }`}
                        >
                            {remember && <span className="size-1.5 rounded-full bg-white" />}
                        </span>
                        Remember me
                    </label>
                    <a href="#forgot" className="text-[#005b96] hover:text-[#03396c] font-medium">
                        Forgot password?
                    </a>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-gradient-to-r from-[#03396c] to-[#005b96] text-white rounded-full text-sm font-medium transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-[0_10px_28px_-8px_rgba(0,91,150,0.55)] hover:shadow-[0_14px_34px_-6px_rgba(0,91,150,0.65)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[inset_3px_3px_8px_#012347,inset_-3px_-3px_8px_#016cae]"
                >
                    {loading ? "Signing in..." : (
                        <>
                            Sign In <ArrowRightIcon className="size-4" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <Link to="/signup" className="text-[#005b96] hover:text-[#03396c] font-medium">
                    Create one free
                </Link>
            </div>
        </AuthLayout>
    );
}