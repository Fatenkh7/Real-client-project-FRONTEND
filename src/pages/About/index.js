import {motion} from "framer-motion"
import Banner from "../../components/Banner";
import React, { useState } from "react";
import {
  Row,
  Col,
  Layout,
  Typography,
  Avatar,
  Divider,
  Carousel,
  Image,
  Card,
  Button,
} from "antd";

import {
  TwitterOutlined,
  PhoneOutlined,
  LinkedinOutlined,
  StarFilled,
  StarOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "./index.css";

const { Title, Text } = Typography;

const { Content } = Layout;

const About = () => {
  const teamMembers = [
    {
      name: "Emma Nguyen",
      poste: "Manager",
      avatar: require("./avatar1.png"),
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing  consectetur  consectetur adipiscing elit. Aenean hendrerit ultrices nibh, vitae luctus quam vestibulum sed consectetur adipiscing elit. Aenean hendrerit ultrices nibh, vitae luctus quam vestibulum sed consectetur adipiscing elit. Aenean hendrerit ultrices nibh, vitae luctus quam vestibulum sed adipiscing elit. Aenean hendrerit ultrices nibh, vitae luctus quam vestibulum sed elit. Aenean hendrerit ultrices nibh, vitae luctus quam vestibulum sed.",
    },
    {
      name: "Samuel Garcia",
      poste: "Marketing Manager",
      avatar: require("./avatar2.png"),
      bio: "Praesent eget odio magna. Fusce nec  consectetur adipiscing elit. Aenean hendrerit ultrices nibh, vitae luctus quam vestibulum sed  consectetur adipiscing elit. Aenean hendrerit ultrices nibh, vitae luctus quam vestibulum sed tristique sapien. Nunc hendrerit leo vitae lectus vehicula, vel consectetur eros aliquam.",
    },
  ];

  const testimonials = [
    {
      author: "Ethan Williams",
      text: "Lorem ipsum dolor sit. Aenean hendrerit ultrices nibh, vitae luctus quam vestibulum sed orem ipsum dolor sit amet, consectetur adipiscing elit. Aenean hendrerit ultrices nibh, vitae luctus quam vestibulum sed sit amet, consectetur adipiscing elit. Aenean hendrerit ultrices nibh, vitae luctus quam vestibulum sed Aenean hendrerit ultrices nibh, vitae luctus quam vestibulum sed.",
      headshot: <Avatar size={140}  src={require("./test1.png")} alt={"Blue sky"} />,
    },
    {
      headshot: <Avatar  size={140}  src={require("./test2.png")} alt={"Blue sky"} />,
      author: "Olivia Lee",
      text: "Praesent eget odio magna. Fusce nec tristique orem ipsum dolor sit amet, consectetur adipiscing elit. Aenean hendrerit ultrices nibh, vitae luctus quam vestibulum sed sapien. Nunc hendrerit leo vitae lectus vehicula, vel consectetur eros aliquam.",
    },
    {
      headshot: <Avatar size={140} src={require("./test3.png")} alt={"Blue sky"} />,
      author: "Evelyn Brown",
      text: "Aluctus quam vestibulum sed sapien. luctus quam vestibulum sed sapien.raesent eget odio magna. consectetur adipiscing elit.  luctus quam vestibulum sed sapien. luctus quam vestibulum sed sapien. luctus quam vestibulum sed sapien. luctus quam vestibulum sed sapien. Nunc hendrerit leo vitae  lectus vehicula, vel consectetur eros aliquam.",
    },
  ];

  const managers = [
    // {
    //   name: "Lorem ipsum",
    //   imageSrc: require("./avatar1.png"), width: "30vw",
    //   align: "left",
    //   description:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis magna sed tortor fringilla, vel rhoncus sapien laoreet. Aliquam erat volutpat.",
    //   icons: [{ type: "twitter" }, { type: "linkedin" }, { type: "phone" }],
    // },
    {
      name: "Lorem ipsum",
      imageSrc: require("./avatar1.png"), 
      align: "center",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis magna sed tortor fringilla, vel rhoncus sapien laoreet. Aliquam erat volutpat.",
      icons: [{ type: "twitter" }, { type: "linkedin" }, { type: "phone" }],
    },
    {
      name: "Lorem ipsum",
      imageSrc: require("./avatar2.png") , 
      align: "right",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis magna sed tortor fringilla, vel rhoncus sapien laoreet. Aliquam erat volutpat.",
      icons: [{ type: "twitter" }, { type: "linkedin" }, { type: "phone" }],
    },
  ];


  return (
    <motion.div
    initial={{ opacity: 0, x:-10 }}
  animate={{ opacity: 1, x:0 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 1.5 }}>
    <Banner
        img={require("./blue-sky.png")}
        text="Meraviglia"
      />
      <Col span={24}>
        <Image
          src={require("./blue-sky.png")}
          width="100%"
          height="70vh"
          alt={"Blue sky"}
        />
      </Col>
      <div width="100%">
        <Layout style={{ padding: "2vw" }}>
          <Content>
            <Row>
              <Col span={24}>
                <Title align="left">We’ll Do the Planning For You!</Title>
                <Text style={{textAlign:'right', fontSize:"1.2rem"}}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean hendrerit ultrices nibh, Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Aenean hendrerit ultrices nibh,
                  vitae luctus quam vestibulum sed. Nullam euismod pellentesque
                  nisi, quis blandit enim convallis at. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Aenean hendrerit ultrices
                  nibh, vitae luctus quam vestibulum sed. Nullam euismod
                  pellentesqueu nisi, quis blandit enim convallis at. vitae
                  luctus quam vestibulum sed. Nullam euismod pellentesque nisi,
                  quis blandit enim convallis at.
                </Text>


                <div className="container">
                  {managers.map((manager, index) => (
                    <div key={index} className="manager">
                      <Image src={manager.imageSrc} width="35vw" alt={manager.name} />
                      <div className="description">
                        <h2>{manager.name}</h2>
                        <p>{manager.description}</p>
                        <div>
                          {manager.icons.map((icon, index) => (
                            <a key={index} style={{ marginRight: "0.4rem" }}>
                              {icon.type === "twitter" && (
                                <TwitterOutlined
                                  style={{ fontSize: "1.1rem", color: "white" }}
                                />
                              )}
                              {icon.type === "linkedin" && (
                                <LinkedinOutlined
                                  style={{ fontSize: "1.1rem", color: "white" }}
                                />
                              )}
                              {icon.type === "phone" && (
                                <PhoneOutlined
                                  style={{ fontSize: "1.1rem", color: "white" }}
                                />
                              )}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

{/* 
<div className="container">
                  <div align="left" className="manager">
                    <Image src={require("./avatar1.png")}  width="30vw"  alt="Manager 1" />
                    <div className="description">
                      <h2>Lorem ipsum</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed lobortis magna sed tortor fringilla, vel rhoncus
                        sapien laoreet. Aliquam erat volutpat.
                      </p>
                    </div>
                  </div>
                  <div align="center" className="manager" >
                    <Image src={require("./avatar2.png")} width="30vw" alt="Manager 2" />
                    <div className="description">
                      <h2>Lorem ipsum</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed lobortis magna sed tortor fringilla, vel rhoncus
                        sapien laoreet. Aliquam erat volutpat.
                      </p>
                    </div>
                  </div>
                  <div align="right" className="manager">
                    <Image src={require("./avatar3.png")}  alt="Manager 3" />
                    <div className="description">
                      <h2>Lorem ipsum</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed lobortis magna sed tortor fringilla, vel rhoncus
                        sapien laoreet. Aliquam erat volutpat.
                      </p>

                      <div>
                      <a style={{ marginRight: "0.4rem" }}>
                        <TwitterOutlined style={{ fontSize: "1.1rem" ,color:'white'}} />
                      </a>
                      <a style={{ marginRight: "0.4rem" }}>
                        <LinkedinOutlined style={{ fontSize: "1.1rem",color:'white' }} />
                      </a>
                      <a>
                        <PhoneOutlined style={{ fontSize: "1.1rem" ,color:'white'}} />
                      </a>
                    </div>


                    </div>
                  </div>
                </div> */}

                <Divider></Divider>

                <div
                  style={{
                    padding: "1.5vw",
                    boxShadow: "#00F0FF",
                    backgroundColor: "white",
                    margin:'1.9vw'
                  }}
                >
                  <div>
                    <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",

                    }}
                    >
                      <Title level={2}>Words From Our Clients!</Title>
                     
                    </div>
                    <Carousel autoplay>
                      {testimonials.map((testimonial) => (
                        <div key={testimonial.author}>
                          <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            marginTop:'1.5vh'
                          }}
                          >
                            <div height="5vh" width="5vh"className="zoom" >
                              {testimonial.headshot}
                            </div>

                            <div>
                            <Text style={{ padding: "0 1.2rem", fontSize:"1.4rem" }} strong>{testimonial.author}</Text>
                              <Text style={{ padding: "0 1.2rem", fontSize:"1.2rem", display:'flex', alignItems:'flex-start'}}>{testimonial.text}</Text>
                            </div>
                          </div>

                          <br />

                          <div style={{ marginTop: "2rem" }}>
                            <div className="signatureAndStars">
                              <Text className="signature">
                                - {testimonial.author}
                              </Text>
                              <a>
                                <StarFilled
                                  style={{
                                    fontSize: "1.3rem",
                                    color: "#0077b6",
                                  }}
                                />
                                {"  "}
                                <StarFilled
                                  style={{
                                    fontSize: "1.3rem",
                                    color: "#0077b6",
                                  }}
                                />
                                {"  "}
                                <StarFilled
                                  style={{
                                    fontSize: "1.3rem",
                                    color: "#0077b6",
                                  }}
                                />
                                {"  "}
                                <StarFilled
                                  style={{
                                    fontSize: "1.3rem",
                                    color: "#0077b6",
                                  }}
                                />
                                {"  "}
                                <StarFilled
                                  style={{
                                    fontSize: "1.3rem",
                                    color: "#0077b6",
                                  }}
                                />
                                <StarOutlined
                                  style={{
                                    fontSize: "1.3rem",
                                    color: "#0077b6",
                                  }}
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </div>
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    </motion.div>
  );
};
export default About;
