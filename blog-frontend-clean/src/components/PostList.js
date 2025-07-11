import React from "react";

function PostList({ posts, onEdit, onDelete }) {
  return (
    <div className="mt-4">
      {posts.length === 0 && <div className="alert alert-info">No posts yet.</div>}
      {posts.map((post) => (
        <div className="card mb-3 shadow-sm" key={post._id}>
          <div className="card-header d-flex justify-content-between align-items-center">
            <span className="fw-bold">{post.title}</span>
            <span className="text-muted small">{new Date(post.createdAt).toLocaleString()}</span>
          </div>
          <div className="card-body">
            <p className="card-text">{post.content}</p>
            {post.tags && post.tags.length > 0 && (
              <div className="mb-2">
                {post.tags.map((tag, i) => <span key={i} className="badge bg-secondary me-1">{tag}</span>)}
              </div>
            )}
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-primary" onClick={() => onEdit(post)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => onDelete(post._id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
