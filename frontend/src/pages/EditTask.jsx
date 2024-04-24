import React, { useState } from "react";

function EditTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleUpdate = () => {};
  return (
    <>
      <div className="table">
        <Navbar />
        <form className="new-form" onSubmit={handleUpdate}>
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

export default EditTask;
