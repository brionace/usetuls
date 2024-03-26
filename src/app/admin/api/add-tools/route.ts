import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import * as cheerio from "cheerio";
import { isValidUrl } from "@/utils";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest, res: NextResponse) {
  const supabase = createClient();
  const { urls } = await req.json();

  if (urls) {
    const parsedUrls = JSON.parse(urls);

    parsedUrls?.forEach(async (url: string) => {
      const html = await (await fetch(url)).text(); // html as text
      // const doc = new DOMParser().parseFromString(html, "text/html");
      const $ = cheerio.load(html);
      const title = $("title").text();
      const description = $("meta[name='description']").attr("content");
      const favicon =
        $("link[rel='icon']").attr("href") ||
        $("meta[property='og:image']").attr("content");
      const icon = isValidUrl(favicon as string) ? favicon : url + favicon;

      const { error } = await supabase.from("tools").insert({
        title,
        description,
        favicon: icon,
        url,
        is_published: false,
      });

      if (error) {
        console.error(error);
        // throw Error(error.message);
      }
    });
  }

  return NextResponse.json({ message: "success" });
}
