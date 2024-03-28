import React from "react";
import Link from "next/link";
import Image from "next/image";

export const AuthMainlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex flex-row">
      <div className="bg-neutral-900 h-full w-1/2">left</div>
      <div className="h-full w-1/2">right</div>
    </div>
  );
};
