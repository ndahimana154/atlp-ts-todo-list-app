document.addEventListener("DOMContentLoaded", function () {
  // Check if the user is logged in
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "./index.html"; // Redirect to login page if not logged in
  }

  
  // New task
  const newTaskForm = document.getElementById("newTaskForm");
  newTaskForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("description").value;
    const task = { title, description };

    try {
      const response = await fetch("http://localhost:3302/api/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();

      if (response.status === 201) {
        document.getElementById("taskTitle").value = "";
        document.getElementById("description").value = "";
        alert("Task created");
      } else {
        alert("Task not created");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the task.");
    }
  });
});
