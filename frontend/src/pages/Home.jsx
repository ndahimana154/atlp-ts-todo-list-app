import React, { useEffect, useState } from "react";

// Import components
import Navbar from "../components/Navbar";

// Import images
import bin from "../assets/images/bin.png";
import edit from "../assets/images/edit.png";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3300/api/tasks", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const json = await response.json();
        setTasks(json.data);
      } catch (error) {
        setMsg(error.message);
      }
    };
    fetchTasks();
  }, []);

  //   Delete task
  const handleDelete = async (taskId) => {
    const response = await fetch(`http://localhost:3300/api/tasks/${taskId}`, {
      method: "DELETE",
    }).catch((error) => {
      alert(error);
      window.location.href = "/";
    });
    const json = response.json();

    if (response.status !== 200) {
      alert(response.error);
      window.location.href = "/";
    } else {
      alert("Deleted successfully");
      window.location.href = "/";
    }
  };

  //Navigate update
  const navigaUpdate = (taskId) => {
    window.location.href = `/update/${taskId}`;
  };
  return (
    <div className="table">
      <Navbar />
      <div className="tb">
        <div className="tb-head">
          <div className="tk-title">Task title</div>
          <div className="actions">Actions</div>
        </div>
        <div className="tb-body">
          {tasks &&
            tasks.map((task) => (
              <div key={task._id} className="tb-row">
                <div className="left">
                  <div className="check">
                    {/* <input
                      type="checkbox"
                      checked={task.isCompleted}
                      onClick={() => handleComplete(task._id)}
                    /> */}
                  </div>
                  <div className="tb-title">{task.title}</div>
                  <div className="tb-desc">| {task.description}</div>
                </div>
                <div className="tb-act">
                  {/* <img src={edit} alt="Edit" onClick={()=>navigaUpdate(task._id)} /> */}
                  <img
                    src={bin}
                    alt="Delete"
                    onClick={() => handleDelete(task._id)}
                  />
                </div>
              </div>
            ))}
          {msg && msg}
        </div>
      </div>
    </div>
  );
}

export default Home;
