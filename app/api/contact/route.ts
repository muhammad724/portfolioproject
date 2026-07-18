'use server';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid contact data.' }, { status: 400 });
  }

  const { name, email, subject, message } = parsed.data;

  await prisma.contact.create({
    data: {
      name,
      email,
      subject,
      message,
    },
  });

  return NextResponse.json({ success: true });
}
