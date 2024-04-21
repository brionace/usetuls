import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import fetch from "node-fetch";
import { isValidUrl } from "@/utils";
import getTags from "@/utils/getTags";

export async function POST(req: NextRequest, res: NextResponse) {
  const { url } = await req.json();
  const html = await (await fetch(url)).text(); // html as text
  // const doc = new DOMParser().parseFromString(html, "text/html");
  const $ = cheerio.load(html);
  const title = $("title").text().trim();
  const description = $("meta[name='description']").attr("content")?.trim();
  const favicon =
    $("link[rel='icon']").attr("href") ||
    $("link[rel='shortcut icon']").attr("href") ||
    $("meta[property='og:image']").attr("content");
  const icon = isValidUrl(favicon as string) ? favicon : url + favicon;
  const faviconTrimmed = icon.trim();
  const tags = await handleCategorisation();

  console.log({ tags });

  async function handleCategorisation() {
    try {
      const request = await fetch(
        "https://api.deepinfra.com/v1/inference/meta-llama/Llama-2-7b-chat-hf",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            input: `[INST] <<SYS>>
					You are a web crawler. You are given a websites meta data. Classify it based on the following categories: ${(
            await getTags({})
          ).map((tag: { name: any }) => tag.name)}\n\n

          You must follow these rules:\n
          - If you are unable to determine a category, return an empty array. For example: []\n
					- Do not generate new categories. Only return the ones provided on the lists.\n
					- Do not rewrite the categories in your answer. Return them as they are on the list.\n
          - You must select all categories that apply to the website.\n
          - Your answer must be in an array format. For example: ["Design", "Web"...].\n
          - You must not include any explanations in your answer.\n
					<<SYS>>

					Title: ${title}\n
          Description: ${description}\n
					[/INST]
					`,
            max_new_tokens: 128,
            temperature: 0,
          }),
        }
      );

      const requestJSON: any = await request.json();
      return requestJSON.results[0].generated_text.trim();
    } catch (error) {
      console.error(error);
      return "Failed to generate categories";
    }
  }

  return NextResponse.json({
    title,
    description,
    favicon: faviconTrimmed,
    categories: tags,
  });
}
