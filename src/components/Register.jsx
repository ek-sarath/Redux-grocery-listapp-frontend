import React, {useState} from "react";
import axios from "axios";

export const Register = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post("http://localhost:8085/user/signup", {
          email,
          password,
          username,
        });

        console.log("Registration successful", response.data);
        setSuccessMessage("Registration successful! You can now login.");
        setEmail("");
        setPassword("");
        setUsername("");

      } catch (error) {
        console.error("Registration failed", error);
        setErrorMessage("Registration failed. Please try again.");
        setEmail("");
        setPassword("");
        setUsername("");
      }
    };
  
    return (
      <div className="auth-form-container">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="username">User Name</label>
          <input
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            placeholder="User Name"
            required
          />
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
          <button type="submit" className=" RegisterButton">Register</button>
        </form>
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button
          className="link-btn"
          onClick={() => props.onFormSwitch("login")}
        >
          Already have an account? Login here.
        </button>
      </div>
    );
  };