import React, { useRef, useState, useEffect, navigate } from "react";
import "./index.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { motion } from "framer-motion";

export default function Home() {
  const btnRef = useRef(null);
  const formRef = useRef(null);
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
  function showSecondForm() {
    const firstForm = document.querySelector('.form-signup:first-of-type');
    const secondForm = document.querySelector('.form-signup:last-of-type');
    
    firstForm.style.display = 'none';
    secondForm.style.display = 'block';
  }
  

  const handleInputChange = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
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
      cookies.set("data", response.data.data);
      if (btnRef.current) {
        btnRef.current.classList.add("bubble-swap");
      }
      // Redirect to dashboard page after successful login
      window.location = "/dashboard";
      //   alert("Login succeeded");
    } catch (error) {
      console.log(error.message);
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
            <form
              className="form form-login"
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <fieldset>
                <legend>
                  Please, enter your email and password for login.
                </legend>
                <div className="input-block">
                  <label htmlFor="login-email">E-mail</label>
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    required
                    onChange={handleInputChange}
                    value={login.email}
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="login-password">Password</label>
                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    required
                    onChange={handleInputChange}
                    value={login.password}
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
                  <label htmlFor="signup-firstname">First Name</label>
                  <input
                    id="signup-firstname"
                    type="text"
                    name="firstName"
                    required
                  ></input>
                </div>
                <div className="input-block">
                  <label htmlFor="signup-lastname">Last Name</label>
                  <input
                    id="signup-lastname"
                    type="text"
                    name="lastName"
                    required
                  ></input>
                </div>
                <div className="input-block">
                  <label htmlFor="signup-email">E-mail</label>
                  <input id="signup-email" type="email" required></input>
                </div>
                <div className="input-block">
                  <label htmlFor="signup-phone">Phone</label>
                  <input
                    id="signup-phone"
                    type="telephone"
                    name="phone"
                    required
                  ></input>
                </div>
                <button
                  type="button"
                  className="btn-signup"
                  onClick={() => showSecondForm()}
                >
                  Continue
                </button>
              </fieldset>
            </form>
            <form className="form form-signup">
              <div className="input-block">
                <label htmlFor="signup-title">Title</label>
                <input id="signup-title" type="text" name="title"></input>
              </div>
              <div className="input-block">
                <label htmlFor="signup-passport">Passport Id</label>
                <input
                  id="signup-passport"
                  type="text"
                  name="passportId"
                ></input>
              </div>
              <div className="input-block">
                <label htmlFor="signup-destinations">
                  Preferred Destinations
                </label>
                <input
                  id="signup-destinations"
                  type="text"
                  name="preferredDestinations"
                ></input>
              </div>
              <div className="input-block">
                <label htmlFor="signup-airlines">Preferred Airlines</label>
                <input
                  id="signup-airlines"
                  type="text"
                  name="preferredAirlines"
                ></input>
              </div>
              <div className="input-block">
                <label htmlFor="signup-password">Password</label>
                <input id="signup-password" type="password" required></input>
              </div>
              {/* </fieldset> */}
              <button type="submit" className="btn-signup">
                Continue
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
