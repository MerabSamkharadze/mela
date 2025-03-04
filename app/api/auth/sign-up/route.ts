import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        message:
          "Thanks for signing up! Please check your email for a verification link.",
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
