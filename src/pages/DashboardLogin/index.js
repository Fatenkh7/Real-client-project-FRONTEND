import React, { useRef,useState } from "react";
import "./index.css";
import axios from "axios";
import Cookies from "universal-cookie";


export default function Home() {
  const btnRef = useRef(null);
  const formRef = useRef(null);
  const [login , setlogin]=useState({
    username:'',
    password:'',})

  function signIn() {
    if (formRef.current.checkValidity()) {
      btnRef.current.classList.add("pending");
      window.setTimeout(function () {
        btnRef.current.classList.add("granted");
      }, 1500);
    }
  }
  
  const handleloginChange = (e) => {
    const value = e.target.value;
    setlogin({
      ...login,
      [e.target.name]: value,
    });
  };
  
   async function handelSubmit(e){
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/admin/login', {
        username: login.username,
        password: login.password
      });
  
      const token = response.data.access_token
      ;
      console.log(response)
      // Set the token in the cookies
      Cookies.set('token', token    );
      
      axios.create({
  
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });
      console.log(token)
      // Redirect the user to the dashboard page
  
      if (token) {window.location.href = 'http://localhost:3000/dashboard/admin'};
      
    } catch (error) {
      console.log(error);
    }
  
  }
  console.log(login)
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
        <form ref={formRef}>
          <label className="form-input">
            <i className="material-icons">person</i>
            <input type="text" autoFocus required />
            <span className="label">Username</span>
            <span className="underline"></span>
          </label>

          <label className="form-input">
            <i className="material-icons">lock</i>
            <input type="password" required />
            <span className="label">Password</span>
            <div className="underline"></div>
          </label>

          <div
            className="submit-container clearfix"
            style={{ marginTop: "2rem" }}
          >
            <div
              ref={btnRef}
              role="button"
              type="button"
              className="btn btn-irenic float-right"
              tabIndex="0"
              onClick={signIn}
            >
              <span>SIGN IN</span>
            </div>

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
