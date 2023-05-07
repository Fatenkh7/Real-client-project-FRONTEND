import React, { useRef, useState, useEffect, navigate } from "react";
import "./index.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { motion } from "framer-motion";
import { async } from "q";

export default function Home() {
  const btnRef = useRef(null);
  const formRef = useRef(null);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [signUp, setSignUp] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    title: "",
    passportId: "",
    preferredAirlines: "",
    preferredDestinations: "",
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
    const firstForm = document.querySelector(".form-signup:first-of-type");
    const secondForm = document.querySelector(".form-signup:last-of-type");

    firstForm.style.display = "none";
    secondForm.style.display = "block";
  }

  const handleInputChange = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  };

  const handleInputChangeSignUp = (event) => {
    setSignUp({
      ...signUp,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    try {
      const URL= process.env.REACT_APP_BASE_URL
      const response = await axios.post(`${URL}user/login`, {
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
      window.location = "/home";
      //   alert("Login succeeded");
    } catch (error) {
      console.log(error.message);
      // Show error message to user
      alert("Invalid email or password");
    }
  };

  const handleSubmitSignUp = async (event) => {
    event.preventDefault();
    try {
      const URL= process.env.REACT_APP_BASE_URL
      const response = await axios.post(`${URL}user/add`, {
        firstName: signUp.firstName,
        lastName: signUp.lastName,
        email: signUp.email,
        phone: signUp.phone,
        title: signUp.title,
        passportId: signUp.passportId,
        preferredAirlines: signUp.preferredAirlines,
        preferredDestinations: signUp.preferredDestinations,
        password: signUp.password, // added missing password field
      });
      console.log(response);
      const cookies = new Cookies();
      cookies.set("data", response.data.data);
      if (btnRef.current) {
        btnRef.current.classList.add("bubble-swap");
      }
      // Redirect to dashboard page after successful signup
      window.location = "/home";
      // alert("Signup succeeded");
    } catch (error) {
      console.log(error.message);
      // Show error message to user
      alert("Signup failed");
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
              onSubmit={handleSubmitLogin}
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
            <form
              className="form form-signup"
              ref={formRef}
              onSubmit={handleSubmitSignUp}
            >
              <fieldset>
                <legend>
                  Please enter your first name, last name, email, phone, and
                  password to sign up.
                </legend>
                <div className="input-block">
                  <label htmlFor="signup-firstname">First Name</label>
                  <input
                    value={signUp.firstName}
                    onChange={handleInputChangeSignUp}
                    id="signup-firstname"
                    type="text"
                    name="firstName"
                    required
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="signup-lastname">Last Name</label>
                  <input
                    value={signUp.lastName}
                    onChange={handleInputChangeSignUp}
                    id="signup-lastname"
                    type="text"
                    name="lastName"
                    required
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="signup-email">E-mail</label>
                  <input
                    value={signUp.email}
                    onChange={handleInputChangeSignUp}
                    name="email"
                    id="signup-email"
                    type="email"
                    required
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="signup-phone">Phone</label>
                  <input
                    value={signUp.phone}
                    onChange={handleInputChangeSignUp}
                    id="signup-phone"
                    type="telephone"
                    name="phone"
                    required
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="signup-password">Password</label>
                  <input
                    value={signUp.password}
                    onChange={handleInputChangeSignUp}
                    name="password"
                    id="signup-password"
                    type="password"
                    required
                  />
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
            <form
              className="form form-signup"
              ref={formRef}
              onSubmit={handleSubmitSignUp}
            >
              <div className="input-block">
                <label htmlFor="signup-title">Title</label>
                <input
                  value={signUp.title}
                  onChange={handleInputChangeSignUp}
                  id="signup-title"
                  type="text"
                  name="title"
                ></input>
              </div>
              <div className="input-block">
                <label htmlFor="signup-passport">Passport Id</label>
                <input
                  value={signUp.passportId}
                  onChange={handleInputChangeSignUp}
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
                  value={signUp.preferredDestinations}
                  onChange={handleInputChangeSignUp}
                  id="signup-destinations"
                  type="text"
                  name="preferredDestinations"
                ></input>
              </div>
              <div className="input-block">
                <label htmlFor="signup-airlines">Preferred Airlines</label>
                <input
                  value={signUp.preferredAirlines}
                  onChange={handleInputChangeSignUp}
                  id="signup-airlines"
                  type="text"
                  name="preferredAirlines"
                ></input>
              </div>
              <button type="submit" className="btn-signup">
                sing up
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
