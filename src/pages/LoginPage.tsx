import React, { useState } from "react";
import users from "../data/users.json"; // Assuming you have a JSON file with user data
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    try {
      // Simulate an API call for login
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // if user exist
          if (user) {
            resolve("Login successful");
            navigate("/main"); // Redirect to main page
          } else {
            reject("Invalid username or password");
          }
        }, 1000);
      });

      // Redirect to notes page or perform further actions
      alert("Login successful!");
      // Here you can redirect to another page or update the app state
    } catch (err) {
      setError(err as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "400px",
        margin: "auto",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1>Login to access your notes</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <div>
          <label htmlFor="username"> Username : </label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="username"> Password : </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
