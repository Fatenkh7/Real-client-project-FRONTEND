import { Button, Form, Input } from "antd";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  PhoneOutlined,
  MailOutlined,
  FacebookOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import "./contactForm.css";
const { TextArea } = Input;

const ContactUs = () => {
  const name = useRef();
  const email = useRef();
  const message = useRef();
  let formcontact=useRef();
  let batbat= new FormData();
  batbat.append("email", email)
  batbat.append("user_from", name)
  batbat.append("message", message)

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_to5zjam",
        "template_hxz6t3k",
        formcontact.current,
        "S_nsUMxTfeG5NFdhU"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    // form.current.reset();
  };
  return (
    <div div className="all-contact-form">
      <div className="div-1">
        {<Form
          className="form1"
          id="contact-form"
          // onSubmit={sendEmail}
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
            name="to_name"
            placeholder="enter your name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input ref={name} />
          </Form.Item>

          <Form.Item
            label="Enter your valid email"
            name="from_email"
            placeholder="enter your emai"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input ref={email} />
          </Form.Item>
          <Form.Item
            label="Enter your message "
            name="message"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea
              ref={message}
              name="message"
              rows={4}
              placeholder="Enter Your Message"
              maxLength={255}
            />
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
        </Form>}
        <form ref={formcontact} onSubmit={sendEmail}>
        
            <label>Name</label>
            <input type="text" required name="from_name"/>
     
          
            <label>Email</label>
            <input type="email" required name="email"/>
         
          
            <label></label>
            <textarea required name="message"/>
         
          <input type="submit" />
        </form>
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
