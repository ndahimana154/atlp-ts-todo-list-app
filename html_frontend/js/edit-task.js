document.addEventListener("DOMContentLoaded", function () {
  // Check if the user is logged in
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "./index.html"; // Redirect to login page if not logged in
  }
  const params = new URLSearchParams(window.location.search);

  const task = params.get("task");
  if (!task) {
    // Handle the case where the task parameter is missing or invalid
    alert("Task parameter is missing or invalid");
    // window.location.href="./home.html"
  }

  //   Form fields
  const title = document.getElementById("taskTitle");
  const description = document.getElementById("description");

  // Function to fetch tasks
  async function fetchCurrentTask() {
    try {
      const response = await fetch(`http://localhost:3302/api/tasks/${task}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const json = await response.json();
      const currentTask = json.data;
      title.value = currentTask.title;
      description.value = currentTask.description;

      //  alert(json)
    } catch (error) {
      alert(error);
    }
  }

  fetchCurrentTask();

  const editTaskForm = document.getElementById("editTaskForm");
  editTaskForm.addEventListener("submit", async function updateTask(event) {
    event.preventDefault(); // Prevent default form submission
    const updatedTitle = title.value; // Use different variable names
    const updatedDescription = description.value;
    const updatedTask = { title: updatedTitle, description: updatedDescription };
    
    try {
      const response = await fetch(`http://localhost:3302/api/tasks/${task}`, {
        method: "PATCH",
        body: JSON.stringify(updatedTask),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      if (response.status == 200) {
        alert("Task updated successfully");
        location.reload();
      } else {
        alert(json.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error);
    }
  });
});
