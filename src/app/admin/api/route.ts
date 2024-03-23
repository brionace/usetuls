import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import * as cheerio from "cheerio";
import { isValidUrl } from "@/utils";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest, res: NextResponse) {
  const { urls, inputContent, selectedTags } = await req.json();
  const { id, favicon, title, description, url, category_id, is_published } =
    inputContent;
  const supabase = createClient();
  let idExt = favicon;

  if (isValidUrl(favicon)) {
    // const imageName = title.replace(/\s/g, "-").toLowerCase();
    const response = await fetch(favicon);
    const buffer = await response.arrayBuffer();
    const extension = path.extname(new URL(favicon).pathname);
    idExt = id + extension;
    const tmp = "/tmp";
    const tmpName = path.join(tmp, idExt);

    fs.writeFile(tmpName, Buffer.from(buffer), () =>
      console.log("finished downloading!")
    );

    fs.readFile(tmpName, async (err, data) => {
      if (err) throw err;

      const uint8Array = new Uint8Array(data.buffer);
      const { error } = await supabase.storage
        .from("images")
        .upload(`favicons/${idExt}`, uint8Array);

      if (error) {
        console.error(error);
        // {
        //   statusCode: '409',
        //   error: 'Duplicate',
        //   message: 'The resource already exists'
        // }
      }
    });
  }

  if (urls) {
    const parsedUrls = JSON.parse(urls);

    parsedUrls?.forEach(async (url: string) => {
      const html = await (await fetch(url)).text(); // html as text
      // const doc = new DOMParser().parseFromString(html, "text/html");
      const $ = cheerio.load(html);
      const title = $("title").text();
      const description = $("meta[name='description']").attr("content");
      const favicon =
        $("meta[property='og:image']").attr("content") ||
        $("link[rel='icon']").attr("href");
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

  const { error } = await supabase
    .from("tools")
    .update({
      title,
      description,
      url,
      category_id,
      favicon: idExt,
      is_published,
    })
    .eq("id", id);

  if (error) {
    console.error(error);
  }

  if (selectedTags) {
    const { error } = await supabase.from("tagged").delete().eq("tools_id", id);

    if (error) {
      console.error(error);
    }

    selectedTags?.forEach(async (tagId: number) => {
      const { error } = await supabase.from("tagged").insert({
        tools_id: id,
        tag_id: tagId,
      });

      if (error) {
        console.error(error);
      }
    });
  }

  return NextResponse.json({ message: "success" });
}