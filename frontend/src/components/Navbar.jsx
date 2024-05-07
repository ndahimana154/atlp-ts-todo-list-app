import React from "react";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <h1>Todo tasks</h1>
      <div className="btnz">
        <a href="/"> Home </a>
        <a href="/new"> New Task </a>
        <a onClick={() => handleLogout}>Logout</a>
      </div>
    </>
  );
}

export default Navbar;
