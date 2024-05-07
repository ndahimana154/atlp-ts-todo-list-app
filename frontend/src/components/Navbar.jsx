import React from "react";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  return (
    <>
      <h1>Todo tasks</h1>
      <div className="btnz">
        <a href="/"> Home </a>
        <a href="/new"> New Task </a>
        <button className="logout" onClick={ handleLogout}>Logout</button>
      </div>
    </>
  );
}

export default Navbar;
