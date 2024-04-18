import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import pages and components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import NewTask from "./components/NewTask";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewTask />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
