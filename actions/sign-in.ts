"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { lucia } from "@/auth";
import { cookies } from "next/headers";

import { getUserByEmail } from "@/data/user";
import { sign_in_schema } from "@/schema/auth-schema";
import { generateVerificationCode } from "@/data/code";
import { sendVerificationEmail } from "@/lib/mail";

export const signIn = async (data: z.infer<typeof sign_in_schema>) => {
  const validatedFields = sign_in_schema.safeParse(data);

  if (!validatedFields.success) return { error: "Invaid data! try again!" };

  const { email, password } = validatedFields.data;

  const existinguser = await getUserByEmail(email);

  if (!existinguser) return { error: "No suh user found!" };

  const passwordMatch = await bcrypt.compare(password, existinguser.password);

  if (!passwordMatch) return { error: "Invaid Password" };

  if (!existinguser.email_verified) {
    const verificationCode = await generateVerificationCode(existinguser.email);

    await sendVerificationEmail(existinguser.email, verificationCode);

    return { success: "Verification mail sended!" };
  }

  const session = await lucia.createSession(existinguser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return { success: "SignIn successful!" };
};
