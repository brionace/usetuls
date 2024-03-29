import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import * as cheerio from "cheerio";
import { isValidUrl } from "@/utils";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest, res: NextResponse) {
  const supabase = createClient();
  const { title, url, description, favicon, selectedTags, suggestedTag } =
    await req.json();

  // Insert suggested web tool
  const { data, error } = await supabase.rpc("insert_suggested_tools", {
    url,
    title,
    favicon,
    description,
  });

  if (error) {
    console.error({ error });
    throw Error(error.message);
  }

  // Insert selected tags
  const { data: updatedData, error: updateError } = await supabase
    .from("tools")
    .update({ tags: selectedTags })
    .eq("id", data.tools_id);

  if (updateError) {
    console.error({ updateError });
    throw Error(updateError.message);
  }

  // Insert suggested tag
  if (typeof suggestedTag === "string" && suggestedTag.length > 0) {
    const { data: dataSuggestedTag, error: errorSuggestedTag } =
      await supabase.rpc("insert_suggested_tag", {
        name: suggestedTag,
        slug: suggestedTag.trim().replace(/\s/g, "-").toLowerCase(),
      });
    if (errorSuggestedTag) {
      console.error({ errorSuggestedTag });
      throw Error(errorSuggestedTag.message);
    }
    console.log("INSERT SUGGESTED TAG", {
      dataSuggestedTag,
      errorSuggestedTag,
    });
  }

  // Insert favicon
  // const response = await fetch(favicon);
  // const buffer = await response.arrayBuffer();
  // const extension = path.extname(new URL(favicon).pathname);
  // const idExt = data.tools_id + extension;
  // const tmp = "/tmp";
  // const tmpName = path.join(tmp, idExt);

  // fs.writeFile(tmpName, Buffer.from(buffer), () =>
  //   console.log("finished downloading!")
  // );

  // fs.readFile(tmpName, async (err, data) => {
  //   if (err) throw err;

  //   const uint8Array = new Uint8Array(data.buffer);
  //   const { error } = await supabase.storage
  //     .from("images")
  //     .upload(`favicons/${idExt}`, uint8Array);

  //   if (error) {
  //     console.error(error);
  //     throw Error(error.message);
  //   }
  //   console.log("INSERT FAV", {
  //     error,
  //   });
  // });

  return NextResponse.json({
    type: "success",
    message:
      "Thank you! If you gave us your contact information, we'll reach out to you when its live.",
  });
}
