"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { getUserByEmail } from "@/data/user";
import { verification_schema } from "@/schema/auth-schema";
import { VerificationCode, userTable } from "@/drizzle/schema";
import { getVerificationCodeByCode } from "@/data/verification-code";

export const newVerification = async (
  data: z.infer<typeof verification_schema>
) => {
  const validateCode = verification_schema.safeParse(data);
  if (!validateCode.success) return { error: "Invalid data!" };

  const existingCode = await getVerificationCodeByCode(data.code);
  if (!existingCode) return { error: "Code does not exist!" };

  const hasExpired = new Date(existingCode.expiresAt) < new Date();
  if (hasExpired) return { error: "Code expired!" };

  const existingUser = await getUserByEmail(existingCode.email);
  if (!existingUser) return { error: "Email does not exist!" };

  await db
    .update(userTable)
    .set({
      email_verified: true,
    })
    .where(eq(userTable.email, existingCode.email));

  await db
    .delete(VerificationCode)
    .where(eq(VerificationCode.id, existingCode.id));

  return { success: "Accound verified successfully!" };
};
