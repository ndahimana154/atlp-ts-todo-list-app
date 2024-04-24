import React, { useEffect, useState } from "react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Task {
  _id: string;
  title: string;
  description: string;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [msg, setMsg] = useState<string>("");
  const [deleteMsg, setDeleteMsg] = useState<string>("");

  //   Fetch data
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3300/api/tasks", {
        method: "GET",
      });

      // Check if the response is not OK
      if (response.status !== 200) {
        const json = await response.json();
        throw new Error(json.error || "Failed to fetch tasks");
      }

      // Parse response body as JSON
      const json = await response.json();

      // Update tasks state with the fetched data
      setTasks(json.data);
    } catch (error) {
      setMsg(error.message);
    }
  };

  //   Deelte Task
  const handleDelete = async (taskId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3300/api/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );

      if (response.status !== 200) {
        // throw new Error(response.json.error);
        setMsg("Couldn't get data");
      }

      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);

      setDeleteMsg("Deleted successfully");
    } catch (error) {
      setDeleteMsg(error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="tasks">
      {deleteMsg && <p>{deleteMsg}</p>}
      <div className="title">
        <div className=""></div>
      </div>
      <table>
        <thead>
          <tr>
            <th colSpan={2} width="200px">Tasks</th>
            <th width="40px">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks ? (
            tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>| {task.description}</td>
                <td>
                  <span>
                    <FontAwesomeIcon icon={faEdit} />
                  </span>
                  <span
                    onClick={() => handleDelete(task._id)}
                    className="delete"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={100}> {msg && <p className="msg">{msg}</p>}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
