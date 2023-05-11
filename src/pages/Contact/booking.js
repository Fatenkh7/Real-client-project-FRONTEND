import { Button, Form, Input } from 'antd';
import {PhoneOutlined,MailOutlined } from '@ant-design/icons';
import './contactForm.css';
import React, {  useState , useRef} from 'react';
import axios from "axios";
import Swal from "sweetalert2"

const { TextArea } = Input;


const Booking = () => {

  const fullName=useRef()
  const email=useRef();
  const sendBooking = (event) => {
    //   event.preventDefault();
    try{
    const URL= process.env.REACT_APP_BASE_URL
    const meeting={fullName: fullName.current.input.value, email:email.current.input.value, isGuest:true}

     axios.post(`${URL}bookingmeeting/add`, meeting)
        .then(response => {
          // setData(response.data.data);
          console.log("@hbhghgh")
          Swal.fire(
            "Your message is sent!",
            "We will contact you.",
            "success"
          );
          
        })
        console.log(meeting)}
        catch(error){
          console.log(error);
        }
    }
 
  return (

<div div className='all-contact-form'>

    
    <div className='div-1'>
  <Form className='form1'
    name="wrap"
    layout="vertical" 
    // labelRow={{
    //   flex: '100%',
      
    // }}
    // // labelAlign="left"
    // labelWrap
    // wrapperCol={{
    //   flex: 1,
    // }}
    colon={false}
    style={{
      maxWidth: '90%',
    }}
  >
    <h1>Booking</h1>
    <Form.Item
      label="Enter your name"
      name="name"
      
      placeholder="enter your name"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input ref={fullName} />
    </Form.Item>

    <Form.Item
      label="Enter your valid email"
      name="email"
      placeholder="enter your emai"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input  ref={email}
/>
      
    </Form.Item>
{/* <Form.Item 
label="Enter your message "
name="message"
rules={[
    {
      required: true,
    },
  ]}
>
    <TextArea rows={4} placeholder="enter your emaill" maxLength={255} />
    </Form.Item> */}
    <Form.Item label=" ">
      <Button type="primary" htmlType="submit" onClick={sendBooking}  size="large">
        Send
      </Button>
    </Form.Item>
  </Form>
  </div>
{/* <div className='div-2'>
<div className='phoneNumber'>
<PhoneOutlined style={{ color: '#005d8f' }} />
<p>71817501</p>
</div>
<div className='email-form'>
<MailOutlined style={{ color: '#005d8f' }}/>
<p>mhamadmlhm0@gmail.com</p>
</div>
</div> */}
  </div>
)
};
export default Booking;