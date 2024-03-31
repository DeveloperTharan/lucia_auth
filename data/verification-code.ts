import { VerificationCode } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export const getVerificationCodeByEmail = async (email: string) => {
  try {
    const verificationCode = await db.query.VerificationCode.findFirst({
      where: eq(VerificationCode.email, email),
    });

    return verificationCode;
  } catch (error) {
    return null;
  }
};

export const getVerificationCodeByCode = async (code: string) => {
  try {
    const verificationCode = await db.query.VerificationCode.findFirst({
      where: eq(VerificationCode.code, code),
    });

    return verificationCode;
  } catch {
    return null;
  }
};