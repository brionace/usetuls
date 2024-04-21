import search from "@/components/search";
import getCategories from "@/utils/getCategories";
import getTools from "@/utils/getTools";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { term } = await req.json();
  const toolsResults = await getTools({ searchTerm: term });
  const categoriesResults = await getCategories({ searchTerm: term });
  // const results = [...toolsResults, ...categoriesResults];

  return NextResponse.json({
    data: { tools: [...(toolsResults as any)], tags: [...categoriesResults] },
  });
}
