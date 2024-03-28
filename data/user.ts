import { db } from "@/lib/db";
import { userTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.userTable.findFirst({
      where: eq(userTable.email, email),
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.query.userTable.findFirst({
      where: eq(userTable.id, id),
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserByName = async (user_name: string) => {
  try {
    const user = await db.query.userTable.findFirst({
      where: eq(userTable.user_name, user_name),
    });

    return user;
  } catch {
    return null;
  }
};
