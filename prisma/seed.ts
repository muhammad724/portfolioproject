import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail) {
    throw new Error(
      "Missing ADMIN_EMAIL env var for prisma seed. Add ADMIN_EMAIL and ADMIN_PASSWORD to .env"
    );
  }
  if (!adminPassword) {
    throw new Error(
      "Missing ADMIN_PASSWORD env var for prisma seed. Add ADMIN_EMAIL and ADMIN_PASSWORD to .env"
    );
  }

  // Prevent duplicates: seed only if not already present.
  const existing = await prisma.admin.findUnique({
    where: { email: adminEmail },
    select: { id: true },
  });
  if (existing) return;

  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS ?? "12");
  const passwordHash = await bcrypt.hash(adminPassword, saltRounds);

  await prisma.admin.create({
    data: {
      email: adminEmail,
      password: passwordHash,
      // role defaults to ADMIN
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

