import React from "react";
import { auth } from "@clerk/nextjs/server";
import { onboard } from "@/features/auth/action/onboard";

const RootGroupLayout = async({ children }: { children: React.ReactNode }) => {
    await auth.protect()
    await onboard()
  return (
    <>{children}</>
  );
};

export default RootGroupLayout;