import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png"
import "./Sidebar.css";

function Sidebar(props) {
  let sidebar = useRef();

  const [isVisible, setVisible] = useState(false);
  function hoverHandler(element, swicther) {
    if (swicther === "on") {
      element.current.className = "tab tab_active";
      element.current.children[0].className = "link link_active";
    } else if (swicther === "off") {
      element.current.className = "tab";
      element.current.children[0].className = "link";
    }
  }
  function sidebarToggler() {
    if (sidebar.current.className === "sidebar") {
      sidebar.current.className = "sidebar sidebar_full";
    } else if (sidebar.current.className === "sidebar sidebar_full") {
      sidebar.current.className = "sidebar";
    }
    setVisible(!isVisible);
  }
  return (
    <div className="sidebar" ref={sidebar}>
      <div>
        <Link to="/dashboard"><img src={logo} id="logo"  alt="logo" />{" "}</Link>
        {!isVisible && (
          /*<img
            className="toggler"
            onClick={sidebarToggler}
            src={menu2}
            width="20px"
          />*/
          /*<Menu  className="toggler"
          onClick={sidebarToggler}
          width="20px"/>*/
          <svg className="toggler-down" onClick={sidebarToggler} width="20px" height="20" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 13L7 7L1 0.999999" stroke="#8A70D6" stroke-width="2"/>
<path d="M7 13L13 7L7 0.999999" stroke="#8A70D6" stroke-width="2"/>
</svg>
        )}
        {isVisible && (
          /*<img
            className="toggler"
            onClick={sidebarToggler}
            src={close}
            width="20px"
          />*/
          <svg className="toggler-up" onClick={sidebarToggler} width="20px" height="20" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 13L7 7L1 0.999999" stroke="#FFA600" stroke-width="2"/>
<path d="M7 13L13 7L7 0.999999" stroke="#FFA600" stroke-width="2"/>
</svg>
        )}
      </div>
      <div>
        <div
          className="tab"

        >
          <Link to="/dashboard/classes" className="link">
            Classes
          </Link>
        </div>
        <div
          className="tab"

        >
          {" "}
          <Link to="/dashboard/sections" className="link">
            Sections
          </Link>
        </div>
        <div
          className="tab"
        >
          <Link to="/dashboard/students" className="link">
            Students
          </Link>
        </div>
        <div
          className="tab"
        >
          <Link to="/dashboard/attendance" className="link">
            {" "}
            Attendance
          </Link>
        </div>
        <div
          className="tab"
        >
          <Link to="/dashboard/report" className="link">
            {" "}
            Reports
          </Link>
        </div>
      </div>

    </div>
  );
}

export default Sidebar;