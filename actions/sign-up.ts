"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import bycrypt from "bcryptjs";
import { createId } from "@paralleldrive/cuid2";

import { userTable } from "@/drizzle/schema";
import { sign_up_schema } from "@/schema/auth-schema";
import { getUserByEmail, getUserByName } from "@/data/user";
import { lucia } from "@/auth";
import { cookies } from "next/headers";

export const signUp = async (data: z.infer<typeof sign_up_schema>) => {
  const validatedFields = sign_up_schema.safeParse(data);

  if (!validatedFields.success) return { error: "Invaid data! try again!" };

  const { user_name, email, password } = validatedFields.data;

  const hashedPassword = await bycrypt.hash(password, 10);

  const existinguser_name = await getUserByName(user_name);
  if (existinguser_name) return { error: "username already exist!" };

  const existinguser_email = await getUserByEmail(email);
  if (existinguser_email) return { error: "email already exist!" };

  const id = createId();

  await db.insert(userTable).values({
    id: id,
    user_name: user_name,
    email: email,
    password: hashedPassword,
  });

  const session = await lucia.createSession(id, {
    id: id,
    user_name: user_name,
    image: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return { success: "SignUp sucessfully completed!" };
};
