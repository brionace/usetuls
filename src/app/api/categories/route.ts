import getCategories from "@/utils/getCategories";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const categoriesResults = await getCategories({});

  return NextResponse.json({ data: categoriesResults });
}
