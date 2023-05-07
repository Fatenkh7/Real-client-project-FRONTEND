import React, { useRef, useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { motion } from "framer-motion";

export default function Home() {
  const btnRef = useRef(null);
  const formRef = useRef(null);
  const [login, setLogin] = useState({
    userName: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const URL= process.env.REACT_APP_BASE_URL
      const response = await axios.post(`${URL}admin/login`, {
        userName: login.userName,
        password: login.password,
      });
      console.log(response);
      const cookies = new Cookies();
      cookies.set("token", response.data.token);
      btnRef.current.classList.add("bubble-swap");
      // Redirect to dashboard page after successful login
      window.location = "/dashboard/admin";
      //   alert("Login succeeded");
    } catch (error) {
      console.log(error);
      // Show error message to user
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <form ref={formRef} onSubmit={handleSubmit}>
        <div id="back">
          <canvas id="canvas" className="canvas-back"></canvas>
          <motion.div
            className="backLeft"
            initial={{ opacity: 0, transition: { duration: 1 } }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0 }}
          ></motion.div>
        </div>
        <div id="slideBox">
          <div className="topLayer">
            <div className="right">
              <div className="content">
                <h2>Login</h2>
                <div className="form-element form-stack">
                  <label htmlFor="username-login" className="form-label">
                    Username
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={login.userName}
                    name="userName"
                    id="username-login"
                    type="text"
                  ></input>
                </div>
                <div className="form-element form-stack">
                  <label htmlFor="password-login" className="form-label">
                    Password
                  </label>
                  <input
                    name="password"
                    onChange={handleInputChange}
                    value={login.password}
                    id="password-login"
                    type="password"
                  ></input>
                </div>
                <div className="form-element form-submit">
                  <button
                    ref={btnRef}
                    id="logIn"
                    className="login"
                    type="submit"
                    name="login"
                  >
                    Log In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
