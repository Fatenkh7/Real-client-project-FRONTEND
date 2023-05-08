import { Button, Form, Input } from 'antd';
import {PhoneOutlined,MailOutlined } from '@ant-design/icons';
import './contactForm.css';
import React, {  useState } from 'react';
import axios from "axios";

const { TextArea } = Input;


const Booking = () => {

  const [bookigValues, setbookingValues] = useState({
    firstName: '',
    lastName: '',
    from_email: '',
    feedback: ''
  });

  const sendBooking = (event) => {
    //   event.preventDefault();
    const URL= process.env.REACT_APP_BASE_URL
      axios.post(`${URL}bookingmeeting/add`, bookigValues)
        .then(response => {
          // setData(response.data.data);
          console.log(response)
          
        })
        .catch(error => {
          console.log(error);
        });
        console.log(bookigValues)
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
      <Input />
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
      <Input />
      
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