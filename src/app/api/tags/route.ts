import getTags from "@/utils/getTags";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const results = await getTags({});

  return NextResponse.json({ data: results });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { id } = await req.json();

  const results = await getTags({ id: id });

  return NextResponse.json({ data: results });
}
