document.addEventListener("DOMContentLoaded", function () {
  // Check if the user is logged in
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "./index.html"; // Redirect to login page if not logged in
  }

  // Function to handle task deletion
  async function handleDelete(taskId) {
    try {
      const response = await fetch(
        `http://localhost:3302/api/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      alert("Deleted successfully");
      fetchTasks(); // Fetch tasks again to update the list
    } catch (error) {
      alert(error.message);
    }
  }

  // Function to render tasks
  function renderTasks(tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear previous tasks
    let tasksArr = tasks.data;

    if (tasksArr.length < 1) {
      const taskRow = ` <div class="tb-row">
      No task found!
      </div>`;
      taskList.innerHTML = taskRow;
    }
    tasksArr.forEach((task) => {
      // const isCompleted = task.isCompleted;
      const taskRow = `
        <div class="tb-row">
          <div class="left">
            <div class="tb-title">${task.title}</div>
            <div class="tb-desc">| ${task.description}</div>
          </div>
          <div class="tb-act">
            <button value="${task._id}" class="edit-btn">
              <img src="./images/edit.png" alt="Edit" 
                data-taskid="${task._id}">
            </button>
            <button value="${task._id}" class="delete-btn">
              <img src="./images/bin.png" alt="Delete" 
                data-taskid="${task._id}">
            </button>
          </div>
        </div>`;
      taskList.innerHTML += taskRow;
    });

    // Get all delete buttons with the class "delete-btn"
    const deleteButtons = document.querySelectorAll(".delete-btn");

    // Loop through each delete button and attach event listener
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const taskId = event.target.dataset.taskid;
        handleDelete(taskId);
      });
    });

    const editButtons = document.querySelectorAll(".edit-btn");

    // Edit buttons
    editButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const taskId = event.target.dataset.taskid;
        window.location.href = `./edit-task.html?task=${taskId}`;
      });
    });
  }

  // Function to fetch tasks
  async function fetchTasks() {
    try {
      const response = await fetch("http://localhost:3302/api/users/tasks/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const json = await response.json();
      renderTasks(json);
    } catch (error) {
      alert(error);
    }
  }

  // Fetch tasks from server
  fetchTasks();
});
