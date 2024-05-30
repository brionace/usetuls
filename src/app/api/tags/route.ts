import getTags from "@/utils/getTags";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") as string;
  const results = await getTags({ id: parseInt(id) });

  return NextResponse.json({ data: results });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { id } = await req.json();

  const results = await getTags({ id: id });

  return NextResponse.json({ data: results });
}
