import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

import { signToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const payload = loginSchema.parse(await request.json());
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user || !user.passwordHash) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
    }

    const validPassword = await compare(payload.password, user.passwordHash);

    if (!validPassword) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch {
    return NextResponse.json({ message: "Login failed." }, { status: 400 });
  }
}
