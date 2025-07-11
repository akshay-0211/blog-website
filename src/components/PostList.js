import React from "react";

function PostList({ posts, onEdit, onDelete }) {
  return (
    <div className="mt-4">
      {posts.length === 0 && <div>No posts yet.</div>}
      {posts.map((post) => (
        <div className="card mb-3" key={post._id}>
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {new Date(post.createdAt).toLocaleString()}
            </h6>
            <p className="card-text">{post.content}</p>
            {post.tags && post.tags.length > 0 && (
              <div className="mb-2">
                {post.tags.map((tag, i) => (
                  <span key={i} className="badge bg-secondary me-1">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <button
              className="btn btn-sm btn-primary me-2"
              onClick={() => onEdit(post)}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => onDelete(post._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
