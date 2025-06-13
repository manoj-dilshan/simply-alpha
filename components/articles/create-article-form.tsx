"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const CreateArticleForm = () =>{
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/articles", {
      method: "POST",
      body: JSON.stringify({ title, content }),
    });
    // Optionally redirect or show success
  };

  return (
    <div className="space-y-4">
      <input
        className="w-full border p-2 rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button onClick={handleSubmit}>Publish</Button>
    </div>
  );
}
export default CreateArticleForm;
