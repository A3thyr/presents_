"use client";

import { Typography } from "@/components";
import { useAuth } from "@/shared/lib/hooks/use-auth";
import { ReactNode } from "react";
import { Loader } from "../ui";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { userQuery, authCheck } = useAuth();

  if (userQuery.isLoading || authCheck.isLoading) {
    return <Loader fullScreen />;
  }

  if (userQuery.isError || authCheck.isError) {
    return (
      <div className="fixed w-screen h-screen top-0 left-0 z-[100] bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">Authorization error</div>
          <Typography tag="span" className="text-xl">
            Please refresh the page
          </Typography>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
