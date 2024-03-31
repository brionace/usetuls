import getToolsData from "@/utils/getToolsData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const results = await getToolsData({ id: id ? parseInt(id) : undefined });

  return NextResponse.json({ data: results });
}
