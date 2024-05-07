document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "./index.html"; // Redirect to login page
  });

  // Check if the user is logged in
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "./index.html"; // Redirect to login page if not logged in
  }




 













   
});
