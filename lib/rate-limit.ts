import { prisma } from "@/lib/prisma";

const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15;

// Runtime-safe rate limiting.
// This uses `any` to avoid TS build failures when Prisma client types are stale.
// Logic remains: lock after MAX_ATTEMPTS failed attempts for LOCK_MINUTES.
export async function checkRateLimit(email: string) {
  const admin = (await (prisma as any).admin.findUnique({
    where: { email },
    select: { lockedUntil: true },
  })) as any;

  if (!admin) return;

  const lockedUntil: Date | null | undefined = admin.lockedUntil;
  if (lockedUntil && lockedUntil > new Date()) {
    const seconds = Math.ceil((lockedUntil.getTime() - Date.now()) / 1000);
    throw new Error(
      `Too many failed attempts. Try again in ${seconds} seconds.`
    );
  }
}

export async function increaseAttempts(email: string) {
  const admin = (await (prisma as any).admin.findUnique({
    where: { email },
    select: { failedAttempts: true },
  })) as any;

  if (!admin) return;

  const failedAttempts = (admin.failedAttempts as number) + 1;

  await (prisma as any).admin.update({
    where: { email },
    data: {
      failedAttempts,
      lockedUntil:
        failedAttempts >= MAX_ATTEMPTS
          ? new Date(Date.now() + LOCK_MINUTES * 60 * 1000)
          : null,
    },
  });
}

export async function resetAttempts(email: string) {
  const admin = (await (prisma as any).admin.findUnique({
    where: { email },
    select: { email: true },
  })) as any;

  if (!admin) return;

  await (prisma as any).admin.update({
    where: { email },
    data: {
      failedAttempts: 0,
      lockedUntil: null,
    },
  });
}


