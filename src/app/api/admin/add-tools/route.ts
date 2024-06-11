import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import * as cheerio from "cheerio";
import { isValidUrl } from "@/utils";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest, res: NextResponse) {
  const supabase = createClient();
  const { content, selectedCategory } = await req.json();
  let jsonContent;

  try {
    jsonContent = JSON.parse(content);
  } catch (error) {
    console.error("Invalid JSON:", error);
    return NextResponse.json({ data: error, success: false });
  }

  jsonContent.forEach(async (item: any) => {
    const { url, name, description, tags, slogan } = item;
    const slug = name.trim().replace(/\s/g, "-").toLowerCase();
    const html = await (await fetch(url)).text();
    const $ = cheerio.load(html);
    const favicon =
      $("link[rel='icon']").attr("href") ||
      $("link[rel='shortcut icon']").attr("href") ||
      "/favicon.ico";
    const icon = isValidUrl(favicon) ? favicon : url + favicon;
    const imageName = await getFavicon(slug, icon, supabase);

    const { error } = await supabase.from("tools").insert({
      title: name,
      description,
      favicon: imageName,
      url,
      slug,
      tagz: [...tags, selectedCategory.name],
      slogan,
      is_published: true,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ data: error, success: false });
    }

    tags.forEach(async (tag: string) => {
      const { error: errorUpsertTag } = await supabase.from("tags").upsert(
        [
          {
            name: tag,
            slug: tag.trim().replace(/\s/g, "-").toLowerCase(),
            category_id: selectedCategory.id,
          },
        ],
        { onConflict: "slug" }
      );

      if (errorUpsertTag) {
        console.error({ errorUpsertTag });
        return NextResponse.json({ data: errorUpsertTag, success: false });
      }
    });
  });

  return NextResponse.json({ success: true });
}

async function getFavicon(slug: string, faviconUrl: string, supabase: any) {
  // const $ = cheerio.load(html);
  // const favicon =
  //   $("link[rel='icon']").attr("href") ||
  //   $("link[rel='shortcut icon']").attr("href") ||
  //   "/favicon.ico";
  // return isValidUrl(favicon) ? favicon : url + favicon;
  const response = await fetch(faviconUrl);
  const buffer = await response.arrayBuffer();
  const extension = path.extname(new URL(faviconUrl).pathname);
  const imageName = slug + extension;
  const tmp = "/tmp";

  if (!fs.existsSync(tmp)) {
    fs.writeFileSync(tmp, "");
    console.log("File created successfully.");
  } else {
    console.log("File already exists.");
  }

  const tmpName = path.join(tmp, imageName);

  fs.writeFile(tmpName, Buffer.from(buffer), (err) => {
    if (err) throw err;
    console.log("finished downloading!");

    fs.readFile(tmpName, async (err, data) => {
      if (err) throw err;

      const image = new Uint8Array(data.buffer);

      const { error: errorImage } = await supabase.storage
        .from("images")
        .upload(`favicons/${imageName}`, image);

      if (errorImage) {
        console.error(errorImage);
        // return NextResponse.json({ data: errorImage, success: false });
      }
    });
  });

  return imageName;
}
