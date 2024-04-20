import { Button } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export function LoginForm() {
  const signIn = async () => {
    const supabase = createClient();
    const origin = headers().get("origin"); //headers().get("referer")

    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${origin}/auth/callback` },
    });

    if (error) {
      console.error("Error:", error.message);
    } else {
      return redirect(data.url);
    }
  };

  return (
    <form action={signIn}>
      <Button variant="ghost" type="submit">
        Sign In
      </Button>
    </form>
  );
}
