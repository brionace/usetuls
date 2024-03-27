import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import fetch from "node-fetch";
import { isValidUrl } from "@/utils";

export async function POST(req: NextRequest, res: NextResponse) {
  const { url } = await req.json();
  const html = await (await fetch(url)).text(); // html as text
  // const doc = new DOMParser().parseFromString(html, "text/html");
  const $ = cheerio.load(html);
  const title = $("title").text().trim();
  const description = $("meta[name='description']").attr("content")?.trim();
  const favicon =
    $("link[rel='icon']").attr("href") ||
    $("meta[property='og:image']").attr("content");
  const icon = isValidUrl(favicon as string) ? favicon : url + favicon;
  const faviconTrimmed = icon.trim();

  return NextResponse.json({ title, description, favicon: faviconTrimmed });
}
