import getCategoriesData from "@/utils/getCategoriesData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const categoriesResults = await getCategoriesData({});

  return NextResponse.json({ data: categoriesResults });
}
