import React, { useRef, useState } from "react";
import users from "../data/users.json";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { successLogin } from "../data/account/accountSlice";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (user) {
            resolve(user);
          } else {
            reject("invalid username/password");
          }
        }, 1000);
      });

      dispatch(successLogin(user));

      navigate("/");
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
            ref={usernameRef}
            required
          />
        </div>
        <div>
          <label htmlFor="username"> Password : </label>
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
