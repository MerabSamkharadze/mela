import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient();
  const courseId = await params.id;

  if (!courseId)
    return NextResponse.json(
      { error: "Course ID is required" },
      { status: 400 }
    );

  const { data, error } = await supabase
    .from("courses")
    .select("title, cover_image, description, videos(video_url),created_at")
    .eq("id", courseId)
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}
