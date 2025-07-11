import React, { useState } from "react";

function PostForm({ initial = {}, onSubmit, submitLabel }) {
  const [title, setTitle] = useState(initial.title || "");
  const [content, setContent] = useState(initial.content || "");
  const [tags, setTags] = useState(initial.tags ? initial.tags.join(", ") : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      content,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Title</label>
        <input
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label>Content</label>
        <textarea
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={4}
        />
      </div>
      <div className="mb-3">
        <label>Tags (comma separated)</label>
        <input
          className="form-control"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <button className="btn btn-success" type="submit">
        {submitLabel}
      </button>
    </form>
  );
}

export default PostForm;
