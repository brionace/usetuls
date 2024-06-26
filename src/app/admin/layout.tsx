import React from "react";
import { createClient } from "@/utils/supabase/server";
import { LoginForm } from "@/components/auth-components";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/signin");
  }

  return <>{children}</>;
}
