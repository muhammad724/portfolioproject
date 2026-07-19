'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut, Loader2 } from "lucide-react";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
        rounded-[2rem]
        border
        border-white/10
        bg-white/[0.05]
        backdrop-blur-xl
        p-8
        shadow-2xl
      "
    >
      {children}
    </div>
  );
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadMe() {
      const res = await fetch("/api/user/me", { credentials: "include" }).catch(
        () => null
      );
      if (!res || !res.ok) return;
      const data = await res.json().catch(() => null);
      if (!data || cancelled) return;
      setUser({ name: data.name, email: data.email });
    }

    loadMe();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onLogout() {
    setIsLoggingOut(true);
    try {
      const res = await fetch("/api/user/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json().catch(() => null);
      if (data?.redirectTo) router.push(data.redirectTo);
      else router.push("/login");
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#02120D] px-5 py-10 overflow-hidden">
      <div className="fixed top-20 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-[#C9A24D]/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-xl"
      >
        <Card>
          <div className="mb-8 text-center">
            <div
              className="
                mx-auto
                mb-5
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-[#C9A24D]/10
                text-[#C9A24D]
              "
            >
              <div className="text-2xl font-bold">★</div>
            </div>
            <h1 className="text-3xl font-bold text-white">Welcome</h1>
            <p className="mt-2 text-sm text-white/50">
              You&apos;re signed in to your demo dashboard.
            </p>
          </div>

          {user ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs text-white/50">User Name</div>
                <div className="text-white font-semibold mt-1">{user.name}</div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs text-white/50">Email</div>
                <div className="text-white font-semibold mt-1">{user.email}</div>
              </div>

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onLogout}
                disabled={isLoggingOut}
                className="
                  flex w-full items-center justify-center gap-2
                  rounded-xl
                  bg-[#C9A24D]
                  py-3
                  font-semibold
                  text-[#02120D]
                  transition
                  disabled:opacity-50
                "
                type="button"
              >
                {isLoggingOut ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Logging out...
                  </>
                ) : (
                  <>
                    <LogOut size={18} />
                    Logout
                  </>
                )}
              </motion.button>
            </div>
          ) : (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="animate-spin text-[#C9A24D]" size={22} />
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}

