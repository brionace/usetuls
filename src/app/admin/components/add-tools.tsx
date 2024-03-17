"use client";
import { isValidUrl } from "@/utils";
import { useState, type FormEvent, useEffect } from "react";

export default function AddTools() {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (content !== "") {
      return;
    }

    const urls = localStorage.getItem("urls");

    if (!urls) {
      return;
    }

    const fetchData = async () => {
      try {
        const fetchResponse = await fetch("/admin/api/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ urls }),
        });
        console.log("Response:", fetchResponse);
        localStorage.removeItem("urls");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [content]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleaneadContent = content.split(",");
    const validUrls = cleaneadContent.filter((url) => isValidUrl(url));

    localStorage.setItem("urls", JSON.stringify(validUrls));
    setContent(""); // Clear the content
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <textarea
          id="content"
          value={content}
          onChange={handleChange}
          placeholder="Enter a list of URLs separated by commas"
          cols={30}
          rows={10}
        ></textarea>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
