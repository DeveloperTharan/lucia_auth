import { VerificationCode } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export const getVerificationCodeByEmail = async (email: string) => {
  try {
    const code = await db.query.VerificationCode.findFirst({
      where: eq(VerificationCode.email, email),
    });

    return code;
  } catch (error) {
    return null;
  }
};
