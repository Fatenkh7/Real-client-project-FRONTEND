import { Table, Space, Input } from "antd";
import { EditOutlined, DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Button from "../../components/Button";
import Popup from "../../components/Popup";

export default function Home() {
  const [data, setData] = useState([]);
  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const closePop = () => {
    setAddPop(false);
    setEditPop(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin")
      .then((response) => {
        setData(response.data.response);
        console.log(response.data.response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEdit = (record) => {
    console.log(`Edit record ${record.key}`);
    // handle edit here
  };

  const handleDelete = (record) => {
    console.log(`Delete record ${record.key}`);
    // handle delete here
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "Image",
      filters: [],
      onFilter: (value, record) => record.Image.indexOf(value) === 0,
      sorter: (a, b) => a.Image.length - b.Image.length,
      sortDirections: ["descend"],
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.firstName - b.firstName,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      filters: [],
      onFilter: (value, record) => record.lastName.indexOf(value) === 0,
    },
    {
      title: "Username",
      dataIndex: "userName",
      filters: [],
      onFilter: (value, record) => record.userName.indexOf(value) === 0,
    },
    {
      title: "Email",
      dataIndex: "email",
      filters: [],
      onFilter: (value, record) => record.email.indexOf(value) === 0,
    },
    {
      title: "Is Super",
      dataIndex: "isSuper",
      filters: [],
      onFilter: (value, record) => record.isSuper.indexOf(value) === 0,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>
            <EditOutlined />
          </a>
          <a onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const handleAddAdmin = () => {
    setAddPop(true);
    console.log("clicked");
  };
  const handleSubmit = () => {
    console.log("Add new admin");
  };

  return (
    <div className="container-admins">
      <Button onClick={handleAddAdmin}>Add Admin</Button>
      <Table
        columns={columns}
        style={{
          marginTop: "-300px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          width: "1600px",
        }}
        dataSource={data}
        onChange={onChange}
      />
      {addPop && (
        <Popup title="Add Admin" close={closePop}>
          <div>
            <Input
              id="outlined-controlled"
              placeholder="First Name"
              name="first_name"
              allowClear
            />
            <Input
              id="outlined-uncontrolled"
              placeholder="Last Name"
              name="last_name"
              allowClear
            />
            <Input
              id="outlined-uncontrolled"
              placeholder="Username"
              name="username"
              allowClear
            />
            <Input
              id="outlined-uncontrolled"
              placeholder="Email"
              name="email"
              allowClear
            />
            <Input
              id="outlined-uncontrolled"
              placeholder="Is Super"
              name="is_super"
              allowClear
            />
            <Input
              id="outlined-uncontrolled"
              placeholder="Password"
              name="password"
              allowClear
            />
            <Button
              variant="contained"
              disableElevation
              style={{ height: 55 }}
              sx={{ backgroundColor: "#3d0066" }}
              onClick={() => {
                handleSubmit();
                setAddPop(false);
              }}
            >
              Submit
            </Button>
          </div>
        </Popup>
      )}
    </div>
  );
}
