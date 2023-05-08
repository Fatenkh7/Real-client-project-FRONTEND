import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import "./Sidebar.css"
const { Header } = Layout;

//import Styles from "./index2.module.css"
const items = [
  {
    label: (
      <Link to="/home" > Meraviglia
      </Link>
    ),
  },
  {
    label: <Link to="/about" >About Us</Link>,
  }, {
    label: <Link to="/services/package" >Our Packages</Link>,
  }, {
    label: <Link to="/services/partner" >Our Partners</Link>,
  },
  {
    label: (
      <Link to="/contact" >
        Contact Us
      </Link>
    ),
    key: 'contact',
  },

];
const WebsiteNav = () => { 
  return (
    <Menu 
  overflowedIndicator={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" 
  width="15px">
    <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" fill="#ffffff"/></svg>}	 mode="horizontal" items={items} />

  );
};
export default WebsiteNav;




export function Sidebar(props) {
  const isSuper = true;
  let sidebar = useRef();
  let submenu = useRef();
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
      props.dimHandler();
    } else if (sidebar.current.className === "sidebar sidebar_full") {
      sidebar.current.className = "sidebar";
    }
    setVisible(!isVisible);
    props.dimHandler();
  }

  return (
    <nav className={styles.navbar} ref={sidebar}>
      <div className={styles.dimmer}></div>
    <Link to="/home" className={styles.brandLink}>Meraviglia{" "}</Link>
<ul className={styles.navList}>
  <li><Link to="/about" className={styles.navLink}>About Us</Link></li>
  <li><Link to="/services/package" className={styles.navLink}>Packages</Link></li>
  <li><Link to="/services/partner" className={styles.navLink}>Our Partners</Link></li>
  <li><Link to="/meraviglia-club" className={styles.navLink}>Meraviglia Club</Link></li>
  <li><Link to="/contact" className={styles.navLink}>Contact Us</Link></li>
</ul>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20px" className={styles.menuIcon}><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" fill="#FFA600"/></svg>
      

    </nav>
  );
}

export  function ResponNav(){
  const topnav=useRef()
  function myFunction() {
    let x = document.getElementById("myTopnav");
    console.log(topnav.current.className)
    if (topnav.current.className === "topnav") {
      topnav.current.className+= " responsive";
    } else {
      topnav.current.className = "topnav";
    }
  }
  
  return(
    <nav className="topnav" id="myTopnav" ref={topnav}>
      <span id="logo">Meraviglia</span>
  <Link to="/home">Meraviglia</Link >
  <Link to="/meraviglia-club">Meraviglia Club</Link >
  <Link to="/about">About Meraviglia</Link >
  <div className="dropdown">
    <button className="dropbtn">Services 
      <i className="fa fa-caret-down"></i>
    </button>
    <div className="dropdownContent">
      <Link to="/services/partner">Our Partners</Link >
      <Link to="/services/packages">Travel With Us</Link >
      <Link to="/services/package">Packages</Link >
    </div>
  </div> 
  <Link to="/contact">Contact Us</Link >
  <Link to="/booking">Request A Meeting</Link >
  <a  style={{fontSize:"15px"}} className="icon" onClick={myFunction}>&#9776;</a >
</nav>

  )
}