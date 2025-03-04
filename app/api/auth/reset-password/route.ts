import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password, confirmPassword } = await request.json();

  if (!password || !confirmPassword) {
    return NextResponse.json(
      { error: "Password and confirm password are required" },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { error: "Passwords do not match" },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Password update failed" },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "Password updated" }, { status: 200 });
}
