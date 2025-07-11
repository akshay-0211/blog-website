import React, { useEffect, useState } from "react";
import api from "../api";
import PostForm from "./PostForm";
import PostList from "./PostList";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      setPosts(res.data);
    } catch (err) {
      setError("Session expired or not authorized.");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
    else fetchPosts();
    // eslint-disable-next-line
  }, []);

  const handleCreate = async (data) => {
    try {
      await api.post("/posts", data, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      setEditing(null);
      fetchPosts();
    } catch (err) {
      setError("Failed to create post.");
    }
  };

  const handleEdit = (post) => setEditing(post);

  const handleUpdate = async (data) => {
    try {
      await api.put(`/posts/${editing._id}`, data, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      setEditing(null);
      fetchPosts();
    } catch (err) {
      setError("Failed to update post.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      fetchPosts();
    } catch (err) {
      setError("Failed to delete post.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>My Blog Posts</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-4">
        <h4>{editing ? "Edit Post" : "Create New Post"}</h4>
        <PostForm
          initial={editing || {}}
          onSubmit={editing ? handleUpdate : handleCreate}
          submitLabel={editing ? "Update" : "Create"}
        />
        {editing && (
          <button
            className="btn btn-secondary mt-2"
            onClick={() => setEditing(null)}
          >
            Cancel Edit
          </button>
        )}
      </div>
      <PostList posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default Dashboard;
