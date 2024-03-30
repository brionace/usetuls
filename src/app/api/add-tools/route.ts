import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import * as cheerio from "cheerio";
import { isValidEmail, isValidUrl } from "@/utils";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest, res: NextResponse) {
  const supabase = createClient();
  const {
    title,
    url,
    description,
    favicon,
    selectedTags,
    suggestedTag,
    userEmail,
  } = await req.json();

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

  const toolsId = data.tools_id;

  // Insert suggested tag
  if (typeof suggestedTag === "string" && suggestedTag.length > 0) {
    const slug = suggestedTag.trim().replace(/\s/g, "-").toLowerCase();
    const { data: dataSuggestedTag, error: errorSuggestedTag } =
      await supabase.rpc("insert_suggested_tag", {
        name: suggestedTag,
        slug: slug,
      });
    if (errorSuggestedTag) {
      console.error({ errorSuggestedTag });
      throw Error(errorSuggestedTag.message);
    }

    // Update tools with the suggested tag
    const { data: dataNewTag } = await supabase
      .from("tags")
      .select("id")
      .eq("slug", slug)
      .single();
    const { data: dataTools } = await supabase
      .from("tools")
      .select("tags")
      .eq("id", toolsId)
      .single();
    const { data: dataToolsTag, error: errorToolsTag } = await supabase
      .from("tools")
      .update({ tags: [...dataTools?.tags, dataNewTag?.id] })
      .eq("id", toolsId);
  }

  // Insert suggester
  if (isValidEmail(userEmail)) {
    const { error: errorSuggester } = await supabase
      .from("suggester")
      .insert({ email: userEmail, suggestion_id: toolsId });

    if (errorSuggester) {
      console.error({ errorSuggester });
      throw Error(errorSuggester.message);
    }
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
