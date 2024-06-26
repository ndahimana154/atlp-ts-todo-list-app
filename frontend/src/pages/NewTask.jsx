import React, { useState } from "react";

// Import components and pages
import Navbar from "../components/Navbar";
// const token = localStorage("token");
var token = localStorage.getItem("token");
var userId = localStorage.getItem("userId")

function NewTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const task = { title, description };
    const response = await fetch(`http://localhost:3300/api/tasks/${userId}`, {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });

    const json = await response.json();

    if (response.status === 201) {
      setTitle("");
      setDescription("");
      alert("Task created");
    } else {
      alert("Task not created");
    }
  };
  return (
    <>
      <div className="table">
        <Navbar />
        <form className="new-form" onSubmit={handleSubmit}>
          <p>
            <label>Task title</label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </p>
          <p>
            <label>Description</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
          </p>
          <p>
            <button type="submit">Save</button>
          </p>
        </form>
      </div>
    </>
  );
}

export default NewTask;
