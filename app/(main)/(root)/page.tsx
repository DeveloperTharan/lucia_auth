import React from "react";
import { redirect } from "next/navigation";

import { getUser } from "@/auth";
import { signOut } from "@/actions/sign-out";
import { Button } from "@/components/ui/button";

export default async function RootPage() {
  const { user, session } = await getUser();

  if (!user || !session) {
    return redirect("/auth/sign-in");
  }

  return (
    <div className="max-w-[1200px] flex flex-col items-center justify-center space-y-5 p-10 mx-auto">
      <div>user: {JSON.stringify(user)}</div>
      <div>session: {JSON.stringify(session)}</div>
      <form action={signOut}>
        <Button type="submit">signOut</Button>
      </form>
    </div>
  );
}
