import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

import { db } from "./lib/db";
import { sessionTable, userTable } from "./drizzle/schema";

interface DatabaseUserAttributes {
  id: string;
  user_name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
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
      image: attributes.image,
      createdAt: attributes.createdAt,
      updatedAt: attributes.updatedAt,
    };
  },
});
