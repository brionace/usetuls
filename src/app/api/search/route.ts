import search from "@/components/search";
import getCategoriesData from "@/utils/getCategoriesData";
import getToolsData from "@/utils/getToolsData";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { term } = await req.json();
  const toolsResults = await getToolsData({ searchTerm: term });
  const categoriesResults = await getCategoriesData({ searchTerm: term });
  const results = [...toolsResults, ...categoriesResults];

  return NextResponse.json({ data: results });
}
