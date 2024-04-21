import getTools from "@/utils/getTools";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const results = await getTools({ id: id ? parseInt(id) : undefined });

  return NextResponse.json({ data: results });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { id } = await req.json();
  const results = await getTools({ id: id });

  return NextResponse.json({ data: results });
}
