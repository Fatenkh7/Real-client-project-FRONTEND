import React, { useRef, useState } from "react";
import "./index.css";
import axios from "axios";
import Cookies from "universal-cookie";

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
      const response = await axios.post("http://localhost:5000/admin/login", {
        userName: login.userName,
        password: login.password,
      });
      const cookies = new Cookies();
      cookies.set("token", response.data.token);
      btnRef.current.classList.add("bubble-swap");
      // Redirect to dashboard page after successful login
      window.location = "/dashboard";
      //   alert(" Login Succssed ");
    } catch (error) {
      console.error(error);
      // Show error message to user
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="tile">
        <div className="tile-header">
          <h2
            style={{
              color: "white",
              opacity: 0.75,
              fontSize: "4rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            SIGN IN
          </h2>
        </div>

        <div className="tile-body">
          <form ref={formRef} onSubmit={handleSubmit}>
            <label className="form-input">
              <i className="material-icons">person</i>
              <input
                type="text"
                name="userName"
                value={login.userName}
                onChange={handleInputChange}
                autoFocus
                required
              />
              <span className="label">Username</span>
              <span className="underline"></span>
            </label>

            <label className="form-input">
              <i className="material-icons">lock</i>
              <input
                type="password"
                name="password"
                value={login.password}
                onChange={handleInputChange}
                required
              />
              <span className="label">Password</span>
              <div className="underline"></div>
            </label>

            <div
              className="submit-container clearfix"
              style={{ marginTop: "2rem" }}
            >
              <button
                ref={btnRef}
                type="submit"
                className="btn btn-irenic float-right"
              >
                <span>SIGN IN</span>
              </button>

              <div className="login-pending">
                <div>
                  <span className="dot1"></span>
                  <span className="dot2"></span>
                </div>

                <div className="login-granted-content">
                  <i className="material-icons">done</i>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
