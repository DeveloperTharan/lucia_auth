"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";

import { FaGithub } from "react-icons/fa";

export const AuthMainlayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isSignInPage = pathname.endsWith("sign-in");
  
  return (
    <div className="relative w-full h-screen flex flex-row bg-neutral-950 text-neutral-200 p-10">
      <div className="h-full w-1/2 hidden md:flex flex-row items-center justify-center gap-x-4">
        <Image
          src="/favicon.ico"
          alt="Authentication"
          width={80}
          height={80}
        />
        <h1 className="text-3xl font-extrabold">Lucia-Auth</h1>
      </div>
      <div className="w-[1px] h-1/2 m-auto bg-neutral-700 hidden md:block" />
      <div className="h-full w-full md:w-1/2">
        <Link
          href={isSignInPage ? "/auth/sign-up" : "/auth/sign-in"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          {isSignInPage ? "SignUp" : "SignIn"}
        </Link>
        <div
          className="w-full h-full flex flex-col items-center justify-center text-center 
          max-w-[350px] mx-auto gap-y-5"
        >
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              {isSignInPage ? "Login your account" : "Create an account"}
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to
              {isSignInPage ? "Login your account" : "Create an account"}
            </p>
          </div>
          <div className="w-full h-fit">{children}</div>
          <div className="relative border-b border-neutral-700 w-full h-[1px] my-3">
            <span className="uppercase absolute -top-2 left-[33%] text-[10px] bg-neutral-950 px-2">
              Or continue with
            </span>
          </div>
          <Button
            variant="outline"
            type="button"
            className="w-full bg-neutral-950" /* disabled={isLoading} */
          >
            <FaGithub className="mr-2 h-4 w-4" />
            GitHub
          </Button>
          <p className="px-8 text-center text-xs text-muted-foreground">
            By clicking continue, you agree to our
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-neutral-600"
            >
              Terms of Service
            </Link>
            and
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-neutral-600"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
