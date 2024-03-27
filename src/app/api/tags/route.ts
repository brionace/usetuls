import getTagsData from "@/utils/getTagsData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const results = await getTagsData();

  return NextResponse.json({ data: results });
}
