"use server";

import { getUser, lucia } from "@/auth";
import { cookies } from "next/headers";

export const signOut = async () => {
  const { session } = await getUser();
  if (!session) {
    return { error: "Unauthorized" };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return { success: "SignOut!" };
};
