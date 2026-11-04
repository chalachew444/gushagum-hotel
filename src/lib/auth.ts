import jwt from "jsonwebtoken";

import type { UserRole } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET ?? "development-secret-change-me";

export type AuthTokenPayload = {
  userId: string;
  email: string;
  role: UserRole;
  name?: string | null;
};

export function signToken(payload: AuthTokenPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
}
