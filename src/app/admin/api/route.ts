import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { chromium } from "@playwright/test";
import * as cheerio from "cheerio";
import { isValidUrl } from "@/utils";
import { Url } from "next/dist/shared/lib/router/router";

const userAgentStrings = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.2227.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.3497.92 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
  "Mozilla/5.0 (compatible; U; ABrowse 0.6; Syllable) AppleWebKit/420+ (KHTML, like Gecko)",
  "Mozilla/5.0 (compatible; U; ABrowse 0.6; Syllable) AppleWebKit/420+ (KHTML, like Gecko)",
  "Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; Acoo Browser 1.98.744; .NET CLR 3.5.30729)",
  "Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; Acoo Browser 1.98.744; .NET CLR 3.5.30729)",
  "Mozilla/5.0 (X11; U; Linux; sk-SK) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.2 (Change: 0 )",
  "Mozilla/5.0 (X11; U; Linux; nb-NO) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.2 (Change: 0 )",
  "Mozilla/5.0 (X11; U; Linux; es-CR) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.2 (Change: 0 )",
  "Mozilla/5.0 (X11; U; Linux; en-US) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.2 (Change: 189 35c14e0)",
  "Mozilla/5.0 (X11; U; Linux; en-US) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.2 (Change: 0 )",
  "Mozilla/5.0 (X11; U; Linux; de-DE) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.2 (Change: 0 )",
  "Mozilla/5.0 (Windows; U; Windows NT 6.0; de-DE) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.2",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; nl-NL) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.2",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.2",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; de-CH) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.2",
];

export async function POST(req: NextRequest, res: NextResponse) {
  const { urls } = await req.json();
  const parsedUrls = JSON.parse(urls);
  const supabase = createClient();

  // Launch Chromium browser instance
  // const browser = await chromium.launch({
  //   proxy: {
  //     server: process.env.NEXT_PUBLIC_IPROYAL_SERVER!,
  //     username: process.env.NEXT_PUBLIC_IPROYAL_USERNAME,
  //     password: process.env.NEXT_PUBLIC_IPROYAL_PASSWORD,
  //   },
  // headless: false,
  //   args: ["--start-maximized"],
  // });
  // const browser = await chromium.launch({
  //   headless: false,
  //   args: ["--start-maximized"],
  // });

  // // Create a new browser context with a randomly selected user agent string
  // const context = await browser.newContext({
  //   userAgent:
  //     userAgentStrings[Math.floor(Math.random() * userAgentStrings.length)],
  // });

  // // Create a new page in the browser context and navigate to target URL
  // const page = await context.newPage();

  // parsedUrls.forEach(async (url: string) => {
  //   await page.goto(url);

  //   const html = await page.$eval(
  //     "body",
  //     (element: { innerHTML: any }) => element.innerHTML
  //   );
  //   const $ = cheerio.load(html);
  //   const title = $("title").text();
  //   const description = $("meta[name='description']").attr("content");
  //   const favicon = $("link[rel='icon']").attr("href");
  //   const ogImage = $("meta[property='og:image']").attr("content") || favicon;

  //   const { error } = await supabase.from("tools").insert({
  //     title,
  //     description,
  //     favicon: ogImage,
  //     url,
  //   });

  //   if (error) {
  //     throw Error("failed to add to db");
  //   }
  // });

  // await context.close();
  // await page.close();
  // await browser.close();

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

  return NextResponse.json({ message: "success" });
}
