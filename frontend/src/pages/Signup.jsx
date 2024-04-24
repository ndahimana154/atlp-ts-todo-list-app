import React, { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [retype, setRetype] = useState("");
  const [error, setError] = useState("");

  const isStrongPassword = (password) => {
    // Define the password criteria (e.g., minimum length, character types)
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Check if the password meets the criteria
    return (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasDigit &&
      hasSpecialChar
    );
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const user = { username, password };
    if (password !== retype) {
      alert("Password doesn't match");
    } else if (!isStrongPassword(password)) {
      setError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
    } else {
      const response = await fetch("http://localhost:3300/api/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 201) {
        setUsername("");
        setPassword("");
        setRetype("");
        alert("Account created successfully");
        window.location.href = "/login";
      } else if (response.status === 400) {
        setError(data.error);
      } else {
        setError("Failed to create account");
      }
    }
  };

  return (
    <form className="login-form" onSubmit={handleSignUp}>
      <h1>Create your account</h1>
      {error && <div className="error">{error}</div>} {/* Display error message if exists */}
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
        <label> Retype password </label>
        <input
          type="password"
          onChange={(e) => setRetype(e.target.value)}
          value={retype}
        />
      </p>
      <p>
        <button type="submit">Signup</button>
      </p>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </form>
  );
}

export default Signup;
