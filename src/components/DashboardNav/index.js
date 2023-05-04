import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import "./index.css";
const { Header } = Layout;

export default function DashboardNav() {
  return (
    <Layout>
      <Header
        style={{
          position: "relative",
          top: 0,
          width: "100%",
          height: "32vh",
          borderRadius: "0.2vh",
          background: "#005D8F",
        }}
      >
        <div
          style={{
            float: "left",
            width: 120,
            height: 31,
            margin: "16px 24px 16px 0",
            background: "#3a70a1",
          }}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ background: "#f7f7f7",
        color:"#000000" }}
        >
          <Menu.Item key="1">
            <Link to="/dashboard/admin">Admins</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/dashboard/user">Users</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/dashboard/booking">Booking</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/dashboard/bookingmeeting">Meeting</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/dashboard/inbox">Inbox</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/dashboard/website-content">Web-Content</Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to="/dashboard/news">News</Link>
          </Menu.Item>
          <Menu.SubMenu key="sub3" title="Service" className="service-menu">
            <Menu.Item key="8">
              <Link to="/dashboard/partner">Partner</Link>
            </Menu.Item>
            <Menu.Item key="9">
              <Link to="/dashboard/package">Package</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="10">
              <Link to="/dashboard/type-travel">Type Travel</Link>
            </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
}
