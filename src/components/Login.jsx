import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeLogin } from "../Redux/authSlice";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const {loginSuccess} = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        setErrorMessage("Email and password are required.");
        return;
      }
      const response = dispatch(makeLogin({ email, password }));
      if (response || loginSuccess) {
        props.onLoginSuccess();
      }
    } catch (error) {
      console.error("Login failed", error);
      dispatch(setErrorMessage("Invalid username or password. Try Again"));
    }
  };

  return (
    <div className="auth-form-container">
      <h5>List Manager</h5>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
          required
        />
        <button type="submit" className="LogInButton">
          Log In
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch("register")}
      >
        Don't have an account? Register here.
      </button>
    </div>
  );
};
