import { Layout, Menu } from 'antd';
import { useState } from 'react';
import logo from "../../images/logo.png"
import logo1 from "../../images/logo 1.png"
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"
import {MenuOutlined} from "@ant-design/icons"
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
  const [current, setCurrent]=useState({current:""})
  const handleClick=(e)=>{
    setCurrent({ current: e.key })
  }
  return (
    




  <Menu 
  onClick={handleClick} selectedKeys={[current]} mode="horizontal" overflowedIndicator={<MenuOutlined />} >
    <div style={{width:"80px"}}><img src={logo} alt="logo" width="60"/></div>
   <Menu.Item key="finance" >
    <Link href="/finances"> Finances </Link>
   </Menu.Item>
   <Menu.Item key="santé"  >
   <Link href="/sante">  Santé </Link>
   </Menu.Item>
   <Menu.Item key="apmathsp"  >
   <Link href="/mathematiques">   Mathématiques </Link>
   </Menu.Item>
   <Menu.Item key="autres" >
     Autres
   </Menu.Item>
   
 </Menu>
  );
};
export default WebsiteNav;


  /* <Menu 
  overflowedIndicator={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" 
  width="15px">
    <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" fill="#ffffff"/></svg>}	 mode="horizontal" items={items} />
  */

/*export function Sidebar(props) {
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
}*/

/*export  function ResponNav(){
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
}*/


export function TopNav() {
  const [isResponsive, setIsResponsive] = useState(false);

  const handleMenuClick = () => {
    setIsResponsive(!isResponsive);
  };

  return (
    <div className={`topnav ${isResponsive ? "responsive" : ""}`} id="myTopnav">
      <Link style={{height:"50px"}}to="/home" className="active">
        <img src={logo1} alt="logo" height="50px"/>
      </Link>
      <Link to="/services/package">Packages</Link>
      <Link to="/services/partner">Packages</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/about">About</Link>
      <a  className="icon" onClick={handleMenuClick}>
        <i className="fa fa-bars"></i>
      </a>
    </div>
  );
}
