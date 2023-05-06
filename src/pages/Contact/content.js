import './content.css'
import React, { useState } from 'react';
import ContactForm from './contactForm.js'
import Booking from './booking'
import sky from "./image 2.png";

export default function Content(){
    const [contact, setContact]=useState(true)
    return(
        <div className="content-container">
<div className="contact-nav">
   <h3 onClick={()=>{setContact(true)}}>Contact US</h3> 
   <h3 onClick={()=>{setContact(false)}}>Booking</h3> 
</div>
<div className="forms-content">
<img src={sky} alt="hhh"/>
{ contact && <ContactForm />}
   { !contact&&
   <Booking />}
</div>
        </div>
    )
}