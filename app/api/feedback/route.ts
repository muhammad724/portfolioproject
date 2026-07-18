'use server';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const feedbackSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  rating: z.number().min(1).max(5),
  message: z.string().min(10),
  company: z.string().optional(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = feedbackSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid feedback data.' }, { status: 400 });
  }

  await prisma.feedback.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      rating: parsed.data.rating,
      message: parsed.data.message,
      company: parsed.data.company,
      approved: false,
    },
  });

  return NextResponse.json({ success: true });
}
