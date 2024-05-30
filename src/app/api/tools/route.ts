import getTools from "@/utils/getTools";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" });
  }

  const results = await getTools({ slug: slug });

  return NextResponse.json({ data: results });
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { tag, tags, pinned } = await req.json();

    const results = await getTools({ tag, tags, pinned });

    return NextResponse.json({ data: results });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Invalid JSON in request body" });
  }
}
