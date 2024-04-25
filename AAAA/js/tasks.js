const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
  
    const task = { title, description };
  
    const response = await fetch("http://localhost:3302/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (response.status !== 201) {
      alert("Task not added");
    }
};
