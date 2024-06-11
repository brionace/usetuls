"use client";
import { useState, type FormEvent, useEffect } from "react";

export default function AddTools({ categories }: any) {
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [doingTheDeed, setDoingTheDeed] = useState(false);

  const fetchData = async (e: any) => {
    e.preventDefault();

    setDoingTheDeed(true);

    const selectedCategory = categories.find(
      (category: any) => category.id === Number(categoryId)
    );

    if (!content || !selectedCategory) {
      alert("Please fill in all fields");
      setDoingTheDeed(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/add-tools", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, selectedCategory }),
      });

      const jsonResult = await response.json();
      const { success } = jsonResult;

      if (success) {
        setContent("");
        setDoingTheDeed(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setDoingTheDeed(false);
    }
  };

  if (doingTheDeed) {
    return <div>Processing...</div>;
  }

  return (
    <form onSubmit={fetchData}>
      <div>
        <textarea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Paste JSON content here"
          cols={30}
          rows={10}
        ></textarea>
      </div>
      <div>
        <select onChange={(event) => setCategoryId(event.target.value)}>
          <option value="">Select a category</option>
          {categories.map((category: any) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
