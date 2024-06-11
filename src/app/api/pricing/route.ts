import getPricing from "@/utils/getPricing";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const results = await getPricing({});

  return NextResponse.json({ data: results });
}
