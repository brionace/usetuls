import getTags from "@/utils/getTags";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const results = await getTags({});

  return NextResponse.json({ data: results });
}
