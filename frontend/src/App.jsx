import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import pages and components
import Home from "./pages/Home";
import NewTask from "./pages/NewTask";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import EditTask from "./pages/EditTask";

function App() {
  var token = localStorage.getItem("token");
  var userId = localStorage.getItem("userId")
  if (!token || !userId) {
    var isAuthenticated = false;
  } else {
    var isAuthenticated = true;
  }
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/new" element={isAuthenticated ? <NewTask /> : <Navigate to="/login" />} />
            <Route path="/update" element={isAuthenticated ? <EditTask /> : <Navigate to="/login" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
