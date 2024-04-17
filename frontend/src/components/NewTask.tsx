import React, { useState } from "react";

function NewTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");

  const handleNewTask = async (e) => {
    e.preventDefault();
    const task = { title, description };
    // try {
    const response = await fetch("http://localhost:3300/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (response.status !== 201) {
      setMsg("Task is not added");
      console.log(response.status)
    } else {
      setTitle("");
      setDescription("");
      setMsg("Task created successfully.");
    }
    // } catch (error) {
    //   setMsg("Error creating task");
    // }
  };

  return (
    <div className="navbar">
      <h3>New Task</h3>
      <form onSubmit={handleNewTask}>
        <p>
          <label>Task title</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </p>
        <p>
          <label>Task description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </p>
        
          <button>Create task</button>

      </form>
      {msg && <div className="msg">{msg}</div>}
    </div>
  );
}

export default NewTask;
