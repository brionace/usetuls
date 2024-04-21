import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { isValidUrl } from "@/utils";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest, res: NextResponse) {
  const { inputContent, selectedTags } = await req.json();
  const {
    id,
    favicon,
    title,
    description,
    url,
    category_id,
    is_published,
  }: any = inputContent;
  const supabase = createClient();
  let faviconImage = favicon;

  if (isValidUrl(favicon)) {
    // const imageName = title.replace(/\s/g, "-").toLowerCase();
    const response = await fetch(favicon);
    const buffer = await response.arrayBuffer();
    const extension = path.extname(new URL(favicon).pathname);
    faviconImage = id + extension;
    const tmp = "/tmp";

    if (!fs.existsSync(tmp)) {
      fs.writeFileSync(tmp, "");
      console.log("File is created successfully.");
    } else {
      console.log("File already exists.");
    }

    const tmpName = path.join(tmp, faviconImage);

    // fs.writeFile(tmpName, Buffer.from(buffer), () =>
    //   console.log("finished downloading!")
    // );

    // fs.readFile(tmpName, async (err, data) => {
    //   if (err) throw err;

    //   const uint8Array = new Uint8Array(data.buffer);
    //   const { error } = await (await supabase).storage
    //     .from("images")
    //     .upload(`favicons/${faviconImage}`, uint8Array);

    //   if (error) {
    //     console.error(error);
    //     // {
    //     //   statusCode: '409',
    //     //   error: 'Duplicate',
    //     //   message: 'The resource already exists'
    //     // }
    //   }
    // });
    fs.writeFile(tmpName, Buffer.from(buffer), (err) => {
      if (err) throw err;
      console.log("finished downloading!");

      fs.readFile(tmpName, async (err, data) => {
        if (err) throw err;

        const uint8Array = new Uint8Array(data.buffer);
        const { error } = await (await supabase).storage
          .from("images")
          .upload(`favicons/${faviconImage}`, uint8Array);

        if (error) {
          console.error(error);
        }
      });
    });
  }

  const { error } = await (
    await supabase
  )
    .from("tools")
    .update({
      title,
      description,
      url,
      favicon: faviconImage,
      is_published,
      slug: title.trim().replace(/\s/g, "-").toLowerCase(),
    })
    .eq("id", id);

  if (error) {
    console.error(error);
  }

  if (selectedTags) {
    const { data: updatedData, error: updateError } = await (await supabase)
      .from("tools")
      .update({ tags: selectedTags })
      .eq("id", id);
    // const { error } = await supabase.from("tagged").delete().eq("tools_id", id);

    // if (error) {
    //   console.error(error);
    // }

    // selectedTags?.forEach(async (tagId: number) => {
    //   const { error } = await supabase.from("tagged").insert({
    //     tools_id: id,
    //     tags_id: tagId,
    //   });

    //   if (error) {
    //     console.error(error);
    //   }
    // });
  }

  return NextResponse.json({ message: "success" });
}
