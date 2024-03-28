import React from "react";
import { Metadata } from "next";
import { AuthMainlayout } from "@/components/auth/auth-layout";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function Authlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthMainlayout>{children}</AuthMainlayout>;
}
