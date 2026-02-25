"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Loader2, Sparkles } from "lucide-react";
import { loginSchema, type LoginFormData } from "..//..//../lib/validations/auth";
import { handleLogin } from "../../../lib/actions/auth-action";
import { useAuth } from "@/lib/context/auth-context";

export default function LoginForm() {
  const router = useRouter();
  const { setUser, setToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setServerError(null);
    try {
      const result = await handleLogin(data);
      if (result.success) {
        // Update auth context immediately so UI reflects login state
        if (result.data) setUser(result.data);
        if (result.token) setToken(result.token);

        const user = result.data;
        if (user && user.role === "admin") {
          router.push("/admin/dashboard");
          router.refresh();
        } else {
          router.push("/dashboard");
          router.refresh();
        }
        return;
      } else {
        setServerError(result.message || "Login failed");
      }
    } catch (error: any) {
      setServerError(error.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
      {/* Server Error Message */}
      {serverError && (
        <div className="rounded-lg bg-red-50 border-2 border-red-200 p-4 text-sm text-red-700 animate-in slide-in-from-top">
          <p className="font-semibold">Login Failed</p>
          <p className="text-red-600">{serverError}</p>
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="flex items-center gap-2 text-sm font-semibold text-gray-700"
        >
          <Mail className="w-4 h-4 text-primary-600" />
          Email address
        </label>
        <div className="relative group">
          <input
            id="email"
            type="email"
            {...register("email")}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            className={`w-full rounded-xl border-2 ${
              errors.email 
                ? 'border-red-300 focus:border-red-500' 
                : emailFocused || emailValue
                ? 'border-primary-500'
                : 'border-gray-200'
            } px-4 py-3 pl-12 text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-4 focus:ring-primary-500/10 bg-white`}
            placeholder="you@example.com"
          />
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all ${
            emailFocused || emailValue ? 'text-primary-600 scale-110' : 'text-gray-400'
          }`}>
            <Mail className="w-5 h-5" />
          </div>
          {emailValue && !errors.email && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-green-600" />
              </div>
            </div>
          )}
        </div>
        {errors.email && (
          <p className="flex items-center gap-1 text-sm text-red-500 animate-in slide-in-from-left">
            <span className="text-red-500">⚠</span> {errors.email.message}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="flex items-center gap-2 text-sm font-semibold text-gray-700"
        >
          <Lock className="w-4 h-4 text-primary-600" />
          Password
        </label>
        <div className="relative group">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            className={`w-full rounded-xl border-2 ${
              errors.password 
                ? 'border-red-300 focus:border-red-500' 
                : passwordFocused || passwordValue
                ? 'border-primary-500'
                : 'border-gray-200'
            } px-4 py-3 pl-12 pr-12 text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-4 focus:ring-primary-500/10 bg-white`}
            placeholder="Enter your password"
          />
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all ${
            passwordFocused || passwordValue ? 'text-primary-600 scale-110' : 'text-gray-400'
          }`}>
            <Lock className="w-5 h-5" />
          </div>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all hover:scale-110"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="flex items-center gap-1 text-sm text-red-500 animate-in slide-in-from-left">
            <span className="text-red-500">⚠</span> {errors.password.message}
          </p>
        )}
      </div>

      {/* Remember & Forgot */}
      <div className="flex items-center justify-between text-sm">
        <label className="group flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="peer w-5 h-5 rounded-md border-2 border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-0 cursor-pointer transition-all checked:bg-primary-600 checked:border-primary-600"
          />
          <span className="text-gray-600 group-hover:text-gray-900 transition">Remember me</span>
        </label>
        <a href="/forgotpassword" className="group font-semibold text-primary-600 hover:text-primary-700 transition flex items-center gap-1">
          <span>Forgot Password?</span>
          <Lock className="w-3 h-3 group-hover:rotate-12 transition-transform" />
        </a>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="group relative w-full rounded-xl bg-primary-600 px-4 py-3.5 font-bold text-white transition-all hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50 shadow-lg shadow-primary-600/30 hover:shadow-xl hover:shadow-primary-600/40 hover:-translate-y-0.5 disabled:hover:translate-y-0 overflow-hidden"
      >
        {!isLoading && (
          <span className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
        )}
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Signing you in...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Sign In
            <Sparkles className="w-4 h-4 group-hover:scale-125 transition-transform" />
          </span>
        )}
      </button>

    </form>
  );
}

