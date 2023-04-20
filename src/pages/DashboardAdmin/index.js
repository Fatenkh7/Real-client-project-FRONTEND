import { Table, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

export default function Home() {
  const [data, setData] = useState([]);

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
    // handle edit logic here
  };

  const handleDelete = (record) => {
    console.log(`Delete record ${record.key}`);
    // handle delete logic here
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
    // handle add admin logic here
    console.log("Add new admin");
  };

  return (
    <div className="container-admins">
      <div className="button-container">
        <button onClick={handleAddAdmin}>Add New Admin</button>
      </div>
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
    </div>
  );
}
