import { Lucia } from "lucia";
import { cache } from "react";
import { cookies } from "next/headers";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

import { db } from "@/lib/db";
import { sessionTable, userTable } from "@/drizzle/schema";

interface DatabaseUserAttributes {
  id: string;
  user_name: string;
  email: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  email_verified: boolean;
}

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      user_name: attributes.user_name,
      email: attributes.email,
      image: attributes.image,
      email_verified: attributes.email_verified,
      createdAt: attributes.createdAt,
      updatedAt: attributes.updatedAt,
    };
  },
});

export const getUser = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId)
    return {
      user: null,
      session: null,
    };
  const { user, session } = await lucia.validateSession(sessionId);
  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {}
  return { user, session };
});
