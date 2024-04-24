import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    const user = { username, password };
    e.preventDefault();
    const response = await fetch("http://localhost:3300/api/users/login/", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (response.status === 200) {
      setUsername("");
      setPassword("");
      localStorage.setItem("token", json);
      alert("Login succed!");
      window.location.href = "/";
    } else {
      alert(json.error);
    }
  };
  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h1>Sign into your account</h1>
      <p>
        <label> Username </label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />
      </p>
      <p>
        <label> Password </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </p>
      <p>
        <button>Login</button>
      </p>
      <p>
        Don't have account? <a href="/signup">Signup</a>
      </p>
    </form>
  );
}

export default Login;
