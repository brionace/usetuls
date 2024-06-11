import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import * as cheerio from "cheerio";
import { isValidEmail, isValidUrl } from "@/utils";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest, res: NextResponse) {
  const supabase = createClient();
  const { toggle, user_id, tool_id } = await req.json();

  // const { data, error } = await supabase.rpc("add_or_remove_pin", {
  //   p_user_id: user_id,
  //   p_bookmark_id: tool_id,
  // });
  let data, error;

  if (toggle === "add") {
    ({ data, error } = await supabase
      .from("bookmarks")
      .insert([{ user_id, bookmark_id: tool_id }]));
  } else if (toggle === "remove") {
    ({ data, error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("user_id", user_id)
      .eq("bookmark_id", tool_id));
  } else {
    ({ data, error } = await supabase
      .from("bookmarks")
      .select("bookmark_id")
      .eq("user_id", user_id));
  }

  if (error) console.error(error);

  return NextResponse.json({ data });
}
