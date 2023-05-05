import React from "react";
import {
  Row,
  Col,
  Layout,
  Typography,
  Avatar,
  Divider,
  Carousel,
  Image,Space
} from "antd";
import {
  TwitterOutlined,
  PhoneOutlined,
  LinkedinOutlined,
  LikeOutlined,
  HeartOutlined,
  DislikeOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Content } = Layout;

const About = () => {
  const teamMembers = [
    {
      name: "Emma Nguyen",
      poste: "CEO",
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
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. orem ipsum dolor orem ipsum dolor sit amet, consectetur adipiscing elit. Aenean hendrerit ultrices nibh, vitae luctus quam vestibulum sed orem ipsum dolor sit amet, consectetur adipiscing elit. Aenean hendrerit ultrices nibh, vitae luctus quam vestibulum sed sit amet, consectetur adipiscing elit. Aenean hendrerit ultrices nibh, vitae luctus quam vestibulum sed Aenean hendrerit ultrices nibh, vitae luctus quam vestibulum sed.",
    },
    {
      author: "Olivia Lee",
      text: "Praesent eget odio magna. Fusce nec tristique orem ipsum dolor sit amet, consectetur adipiscing elit. Aenean hendrerit ultrices nibh, vitae luctus quam vestibulum sed sapien. Nunc hendrerit leo vitae lectus vehicula, vel consectetur eros aliquam.",
    },
  ];

  return (
    <div>
      <Image
        src={require("./blue-sky.png")}
        width="100%"
        height="70vh"
        alt={"Blue sky"}
      />
<div width='100%'>
      <Layout style={{ padding: " 1vw 2vw" }}>
        <Content>
          <Row>
            <Col span={16}>
              <Title style={{ marginLeft: "2vw" }}>About Us</Title>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                hendrerit ultrices nibh, Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Aenean hendrerit ultrices nibh, vitae luctus
                quam vestibulum sed. Nullam euismod pellentesque nisi, quis
                blandit enim convallis at. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Aenean hendrerit ultrices nibh,
                vitae luctus quam vestibulum sed. Nullam euismod pellentesqueu
                nisi, quis blandit enim convallis at. vitae luctus quam
                vestibulum sed. Nullam euismod pellentesque nisi, quis blandit
                enim convallis at.
              </Text>

              <Divider />
              <Title level={2} style={{ marginLeft: "2vw" }}>
                Our Team
              </Title>
              {teamMembers.map((member) => (
                <Row key={member.name} align="middle">
                   {/* <Space align="baseline"> */}
                  <Col span={6}>
                    <Avatar
                      src={member.avatar}
                      size={230}
                      style={{ margin: "1.5vw 5vw 1.5vw 5vw" }}
                    />
                    <Title level={5} style={{ margin: "0.8vw 2vw 1vw 8vw" }}>
                      {member.name}
                    </Title>

                    <div style={{ margin: "0vw 2vw 1.5vw 9vw" }}>
                      <a style={{ marginRight: "0.4rem" }}>
                        <TwitterOutlined style={{ fontSize: "1.1rem" ,color:'#0077b6'}} />
                      </a>
                      <a style={{ marginRight: "0.4rem" }}>
                        <LinkedinOutlined style={{ fontSize: "1.1rem",color:'#0077b6' }} />
                      </a>
                      <a>
                        <PhoneOutlined style={{ fontSize: "1.1rem" ,color:'#0077b6'}} />
                      </a>
                    </div>
                  </Col>
                  <Col span={18}>
                    <Title level={3}>{member.poste}</Title>
                    <Text style={{ width: "100%" }}>{member.bio}</Text>
                  </Col>
                  {/* </Space> */}
                </Row>
              ))}
              <Divider />

              <div></div>

              <div
                style={{
                  padding: "20px",
                  boxShadow: "#00F0FF",
                  backgroundColor: "white",
                }}
              >
                <Title level={2}>Words From Our Clients!</Title>
                <Carousel autoplay>
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.author}>
                      <Text>{testimonial.text}</Text>
                      <Text strong>- {testimonial.author}</Text>
                    </div>
                  ))}
                </Carousel>

                <div style={{ textAlign: "right", marginTop: "2rem" }}>
                  <a style={{ marginRight: "1rem" }}>
                    <HeartOutlined
                      style={{ fontSize: "1.3rem", color:'#0077b6'}}
                    />
                  </a>
                  <a style={{ marginRight: "1rem" }}>
                    <LikeOutlined
                      style={{ fontSize: "1.3rem",  color:'#0077b6' }}
                    />
                  </a>
                  <a>
                    <DislikeOutlined
                      style={{ fontSize: "1.3rem", color:'#0077b6'}}
                    />
                  </a>
                </div>
              </div>
            </Col>
          </Row>


        </Content>
      </Layout>
    </div>
     </div>
  );
};

export default About;
