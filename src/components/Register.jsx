import React, {useState} from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/registerSlice";

export const Register = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    const success = useSelector((state) => state.registration.successMessage)
    const error = useSelector((state) => state.registration.errorMessage)

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(email,password,username)
      dispatch(registerUser({ email, password, username }))
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
        {success && (
          <p className="success-message">{success}</p>
        )}
        {error && <p className="error-message">{error}</p>}
        <button
          className="link-btn"
          onClick={() => props.onFormSwitch("login")}
        >
          Already have an account? Login here.
        </button>
      </div>
    );
  };