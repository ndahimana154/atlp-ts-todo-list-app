import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const user = { username, password };
  };

  return (
    <div className="login">
      <form action="">
        <p>
          <label>Username</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </p>
        <p>
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </p>
        <p>
          <button onClick={() => handleLogin()}>Login</button>
        </p>
      </form>
    </div>
  );
}

export default Login;
