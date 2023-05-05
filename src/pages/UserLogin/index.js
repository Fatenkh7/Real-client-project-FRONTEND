import React, { useRef, useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { motion } from "framer-motion";
export default function Home() {
  const btnRef = useRef(null);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const switcherRefs = [useRef(null), useRef(null)];

  const switchForm = (index) => {
    switcherRefs.forEach((switcherRef, i) => {
      if (i === index) {
        switcherRef.current.parentElement.classList.add("is-active");
      } else {
        switcherRef.current.parentElement.classList.remove("is-active");
      }
    });
  };

  const handleInputChange = (event) => {
    setLogin({
      ...login,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        email: login.email,
        password: login.password,
      });
      console.log(response);
      const cookies = new Cookies();
      cookies.set("token", response.data.token);
      btnRef.current.classList.add("bubble-swap");
      // Redirect to meraviglia-club page after successful login
      window.location = "/meraviglia-club";
      //   alert("Login succeeded");
    } catch (error) {
      console.log(error);
      // Show error message to user
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container-user-login">
      <section className="forms-section">
        <div className="forms">
          <div className="form-wrapper is-active">
            <button
              type="button"
              className="switcher switcher-login"
              ref={switcherRefs[0]}
              onClick={() => switchForm(0)}
            >
              Login
              <span className="underline"></span>
            </button>
            <form className="form form-login" onSubmit={handleSubmit}>
              <fieldset>
                <legend>
                  Please, enter your email and password for login.
                </legend>
                <div className="input-block">
                  <label htmlFor="login-email">E-mail</label>
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={login.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="login-password">Password</label>
                  <input
                    id="login-password"
                    type="password"
                    required
                    value={login.password}
                    onChange={handleInputChange}
                  />
                </div>
              </fieldset>
              <button type="submit" className="btn-login">
                Login
              </button>
            </form>
          </div>
          <div className="form-wrapper">
            <button
              type="button"
              className="switcher switcher-signup"
              ref={switcherRefs[1]}
              onClick={() => switchForm(1)}
            >
              Sign Up
              <span className="underline"></span>
            </button>
            <form className="form form-signup">
              <fieldset>
                <legend>
                  Please, enter your email, password and password confirmation
                  for sign up.
                </legend>
                <div className="input-block">
                  <label htmlFor="signup-email">E-mail</label>
                  <input id="signup-email" type="email" required></input>
                </div>
                <div className="input-block">
                  <label htmlFor="signup-password">Password</label>
                  <input id="signup-password" type="password" required></input>
                </div>
                <div className="input-block">
                  <label htmlFor="signup-password-confirm">
                    Confirm password
                  </label>
                  <input
                    id="signup-password-confirm"
                    type="password"
                    required
                  ></input>
                </div>
              </fieldset>
              <button type="submit" class="btn-signup">
                Continue
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
