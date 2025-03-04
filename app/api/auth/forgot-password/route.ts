import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    console.error(error.message);
    return NextResponse.json(
      {
        error: "Could not reset password." + " " + error.message.toUpperCase(),
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "Check your email for a link to reset your password." },
    { status: 200 }
  );
}
