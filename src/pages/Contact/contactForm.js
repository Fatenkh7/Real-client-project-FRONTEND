import { Button, Form, Input } from 'antd';
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { PhoneOutlined, MailOutlined, FacebookOutlined, InstagramOutlined } from '@ant-design/icons';
import './contactForm.css';
import axios from "axios";

const { TextArea } = Input;

const ContactUs = () => {
  const name = useRef();
  const email = useRef();
  const message = useRef();
  const [emailValues, setEmailValues] = useState({
    firstName: '',
    lastName: '',
    from_email: '',
    feedback: ''
  });
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ0MDg3MzQ0N2Q4OTM2M2IyYTQxMjU5IiwidXNlck5hbWUiOiJzdXBlckFkbWluIiwiaWF0IjoxNjgzNDA3MjcwLCJleHAiOjE2ODM0MjE2NzB9.QduVAhUBzOxwEsvMW844IpiIphJwH5NHJpOhJG0P5_E';
  
    const headers = {
      Authorization: `Bearer ${token}`,
      "id": "6440873447d89363b2a41259",
      "role": "superAdmin"
    };

  const sendEmail = (event) => {
    const URL= process.env.REACT_APP_BASE_URL
    //   event.preventDefault();
      axios.post(`${URL}inbox/add`, emailValues, { headers })
        .then(response => {
          // setData(response.data.data);
          console.log(response)
          
        })
        .catch(error => {
          console.log(error);
        });
        console.log(emailValues)
    }
  // const sendEmail = (e) => {
  //   e.preventDefault();
  //   const form = document.getElementById('contact-form');
  //   emailjs.sendForm('service_14fxwz5', 'template_sh75a1h', form, 'xirLPuZW7bbhp375b')
  //     .then((result) => {
  //       console.log(result.text);
  //     }, (error) => {
  //       console.log(error.text);
  //     });

  //   // form.current.reset();
  // };
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setEmailValues(prevState => ({
  //     ...prevState,
  //     [name]: value
  //   }));
  // };
  return (
    <div div className='all-contact-form'>


      <div className='div-1'>

        <Form className='form1'
          id='contact-form'
          onSubmit={sendEmail}
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
            maxWidth: "90%",
          }}
        >
          <h1>Send us a message</h1>
          <Form.Item
            label="Enter your name"
            name="firstName"
            ref={name}
            placeholder="enter your First Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input  name="firstName" value={emailValues.firstName} onChange={(event) => setEmailValues({...emailValues, firstName: event.target.value})}/>
          </Form.Item>

          <Form.Item
            label="Enter your Last Name"
            name="lastName"
            ref={name}
            placeholder="enter your name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input name="lastName"  onChange={(event) => setEmailValues({...emailValues, lastName: event.target.value})}/>
          </Form.Item>

          <Form.Item
            label="Enter your valid email"
            name="email"
            ref={email}
            placeholder="enter your emai"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input name="email"  onChange={(event) => setEmailValues({...emailValues, email: event.target.value})}/>

          </Form.Item>
          <Form.Item
            label="Enter your message "
            name="feedback"
            ref={message}
            rules={[
              {
                required: true,
              },
              
            ]}
              
          >
            <TextArea name="feedback" rows={4} placeholder="Enter Your Message" maxLength={255}  onChange={(event) => setEmailValues({...emailValues, feedback: event.target.value})}/>
          </Form.Item>
          <Form.Item label=" ">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              onClick={sendEmail}
            >
              Send
            </Button>
          </Form.Item>
        </Form>

      </div>
      <div className="div-2">
        <div className="phoneNumber">
          <PhoneOutlined style={{ color: "#005d8f" }} />
          <p>71817501</p>
        </div>
        <div className="email-form">
          <MailOutlined style={{ color: "#005d8f" }} />
          <p>mhamadmlhm0@gmail.com</p>
        </div>
        <div className="facebook">
          <FacebookOutlined style={{ color: "#005d8f" }} />
          <p>facebook.com</p>
        </div>
        <div className="facebook">
          <InstagramOutlined style={{ color: "#005d8f" }} />
          <p>Instagram.com</p>
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
