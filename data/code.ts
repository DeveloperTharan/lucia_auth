import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { VerificationCode } from "@/drizzle/schema";
import { generateRandomString, alphabet } from "oslo/crypto";
import { getVerificationCodeByEmail } from "./verification-code";
import { createId } from "@paralleldrive/cuid2";

export const generateVerificationCode = async (email: string) => {
  const code = generateRandomString(6, alphabet("0-9"));
  const expires = new Date(new Date().getTime() + 15 * 60 * 1000);
  const id = createId();

  const existingVerificationCode = await getVerificationCodeByEmail(email);

  if (existingVerificationCode) {
    await db.delete(VerificationCode).where(eq(VerificationCode.email, email));
  }

  const res = await db
    .insert(VerificationCode)
    .values({
      id: id,
      email: email,
      code: code,
      expiresAt: expires,
    })
    .returning({
      code: VerificationCode.code,
    });

  const newCode = res.map((data) => data.code) as unknown as string;

  return newCode;
};
