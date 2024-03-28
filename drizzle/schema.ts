import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  user_name: varchar("username", { length: 191 }).notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  image: text("image").default(""),
  email_verified: boolean("email_verified").default(false),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").$onUpdateFn(() => new Date()),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const VerificationToken = pgTable("VerificationToken", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  token: text("token"),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const PasswordResetToken = pgTable("PasswordResetToken", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  token: text("token"),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});