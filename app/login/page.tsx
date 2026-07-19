'use client';

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, LogIn, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
  // Keep recaptchaToken in schema/flow to satisfy API contract.
  recaptchaToken: z.string().min(1, "reCAPTCHA token is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

type ReCaptchaInstance = {
  getValue(): string | null;
  reset(): void;
} | null;

export default function Login() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const recaptchaRef = useRef<ReCaptchaInstance>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      recaptchaToken: "",
    },
  });

  async function onSubmit(values: LoginValues) {
    // Prefer value from ref, but fall back to RHF value.
    const tokenFromRef = recaptchaRef.current?.getValue?.() ?? null;
    const tokenToSend = tokenFromRef ?? values.recaptchaToken;

    if (!tokenToSend) {
      alert("Please complete the reCAPTCHA.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          recaptchaToken: tokenToSend,
        }),
      });

      const data: { error?: string; redirectTo?: string } | null = await res
        .json()
        .catch(() => null);

      if (!res.ok) {
        alert(data?.error || "Login failed.");
        return;
      }

      router.push(data?.redirectTo || "/dashboard");
    } catch {
      alert("Something went wrong.");
    } finally {
      // Reset reCAPTCHA after every login attempt.
      try {
        recaptchaRef.current?.reset?.();
      } catch {
        // ignore
      }

      setCaptchaVerified(false);
      setValue("recaptchaToken", "", { shouldValidate: false, shouldDirty: true });
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#02120D] px-5 py-10 overflow-hidden">
      <div className="fixed top-20 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-[#C9A24D]/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] backdrop-blur-xl p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C9A24D]/10 text-[#C9A24D]">
              <ShieldCheck size={32} />
            </div>

            <h1 className="text-3xl font-bold text-white">User Login</h1>

            <p className="mt-2 text-sm text-white/50">
              Sign in to access your dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-white/70">Email</label>

              <input
                type="email"
                {...register("email")}
                placeholder="user@example.com"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#C9A24D]"
              />

              {errors.email && (
                <p className="mt-2 text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">Password</label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 pr-12 text-white outline-none focus:border-[#C9A24D]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#C9A24D]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-2 text-xs text-red-400">{errors.password.message}</p>
              )}
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur-sm">
              <p className="mb-3 text-center text-sm text-white/70">
                Security Verification
              </p>

              <div className="flex justify-center overflow-hidden rounded-xl">
                <ReCAPTCHA
                  ref={(instance) => {
                    // react-google-recaptcha typing may not expose instance methods,
                    // so we treat the ref as our minimal instance type.
                    recaptchaRef.current = (instance ?? null) as unknown as ReCaptchaInstance;
                    const current = (instance as unknown as { getValue?: () => string | null })?.getValue?.() ?? null;
                    setCaptchaVerified(!!current);
                    setValue("recaptchaToken", current ?? "", {
                      shouldValidate: false,
                      shouldDirty: true,
                    });
                  }}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                  theme="dark"
                  onChange={(token) => {
                    setCaptchaVerified(!!token);
                    setValue("recaptchaToken", token ?? "", {
                      shouldValidate: false,
                      shouldDirty: true,
                    });
                  }}
                  onExpired={() => {
                    setCaptchaVerified(false);
                    setValue("recaptchaToken", "", {
                      shouldValidate: false,
                      shouldDirty: true,
                    });
                    recaptchaRef.current?.reset?.();
                  }}
                />
              </div>

              <p className="mt-3 text-center text-xs text-white/40">
                Please verify that you're not a robot.
              </p>
            </div>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isSubmitting || !captchaVerified}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C9A24D] py-3 font-semibold text-[#02120D] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Login
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-5">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => router.push("/admin/login")}
              className="w-full rounded-xl border border-white/10 bg-black/20 py-3 font-semibold text-white hover:border-[#C9A24D]"
            >
              Login as Admin
            </motion.button>
          </div>

          <p className="mt-6 text-center text-sm text-white/60">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="text-[#C9A24D] hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

