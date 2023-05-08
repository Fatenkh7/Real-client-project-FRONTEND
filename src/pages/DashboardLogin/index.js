import React, { useRef, useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { motion } from "framer-motion";
import { RoleContext} from "../../App";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const config=React.useContext(RoleContext)
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
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const URL= process.env.REACT_APP_BASE_URL
      const response = await axios.post(`${URL}admin/login`, {
        userName: login.userName,
        password: login.password,
      });
      console.log("bosbos",response.data.data);
      config.changeConfig(response.data.data, response.data.id, response.data.role)
      const cookies = new Cookies();
      cookies.set("token", response.data.data);
      cookies.set("id", response.data.id);
      cookies.set("role", response.data.role);
      btnRef.current.classList.add("bubble-swap");
      
      // Redirect to dashboard page after successful login
      //window.location = "/dashboard/admin";
      //   alert("Login succeeded");
      navigate("/dashboard/admin");
    } catch (error) {
      console.log(error);
      // Show error message to user
      alert("Invalid username or password");
    }
  };

  return (
    <motion.div  initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ y: 30}}
    transition={{ duration: 1.5 }} className="login-container">
      <form ref={formRef} onSubmit={handleSubmit}>
        <div id="back">
          <canvas id="canvas" className="canvas-back"></canvas>
          <motion.div
            className="backLeft"
         
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
    </motion.div>
  );
}
