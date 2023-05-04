
import { Row, Col, Avatar, Layout } from "antd";
import {
  TwitterOutlined,
  PhoneOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

const About = () => {
  return (
    <Layout>
      <Content style={{ padding: "50px", background: "#fff" }}>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={24} md={10} style={{ textAlign: "center" }}>
            <Avatar size={150} src={require("./avatar.png")} />
            <h2 style={{ marginTop: "20px" }}>Fake Name</h2>
            <p style={{ color: "#888" }}>Manager</p>
            <div style={{ marginTop: "30px" }}>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginRight: "10px" }}
              >
                <TwitterOutlined style={{ fontSize: "20px" }} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginRight: "10px" }}
              >
                <LinkedinOutlined style={{ fontSize: "20px" }} />
              </a>
              <a href="tel:123456789">
                <PhoneOutlined style={{ fontSize: "20px" }} />
              </a>
            </div>
          </Col>
          <Col xs={24} sm={24} md={14}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12}>
                <img
                  src={require("./aboutImg.png")}
                  alt="About Image"
                  style={{ maxWidth: "100%" }}
                />
              </Col>
              <Col xs={24} sm={24} md={12}>
                <h2 style={{ marginBottom: "20px" }}>Title</h2>
                <p style={{ marginBottom: "20px" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  non risus. Suspendisse lectus tortor, dignissim sit amet,
                  adipiscing nec, ultricies sed, dolor.
                </p>
                <p style={{ marginBottom: "20px" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  non risus. Suspendisse lectus tortor, dignissim sit amet,
                  adipiscing nec, ultricies sed, dolor. Cras elementum ultrices
                  diam. Maecenas ligula massa, varius a, semper congue, euismod
                  non, mi.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default About;
