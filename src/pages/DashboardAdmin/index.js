import { Table, Space, Input, Switch, Form } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Button from "../../components/Button";
import Popup from "../../components/Popup";
import Swal from "sweetalert2";

export default function Home() {
  const [data, setData] = useState([]);
  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

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
    setSelectedRecord(record);
    setEditPop(true);
  };

  const handleDelete = (record) => {
    setSelectedRecord(record);
    Swal.fire({
      title: "Are you sure you want to delete this Admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3a70a1",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/admin/${record.key}`)
          .then((response) => {
            setData(response.data.response);
            console.log(response.data.response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
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
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
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
      filters: [
        { text: "Yes", value: "yes" },
        { text: "No", value: "no" },
      ],
      onFilter: (value, record) => record.isSuper.indexOf(value) === 0,
      render: (isSuper, record) => (
        <Switch
          checked={isSuper}
          onChange={() => {
            record.isSuper = !record.isSuper;
          }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>
            <EditOutlined />
          </a>
          <a
            onClick={() =>
              Swal.fire({
                title: "Are you sure you want to delete this Admin?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3a70a1",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleDelete(record);
                  Swal.fire(
                    "Deleted!",
                    "Your admin has been deleted.",
                    "success"
                  );
                }
              })
            }
          >
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
  const handleSubmit = (record) => {
    axios
      .post("http://localhost:5000/admin/add", record)
      .then((response) => {
        setData([...data, response]); // add the new admin to the existing data array
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
    setSelectedRecord(null); // clear the selected record
    setEditPop(false); // hide the popup
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
          <div className="input-container">
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
            <Form.Item label="Is Super">
              <Switch
                id="outlined-uncontrolled"
                placeholder="Is Super"
                name="is_super"
                allowClear
              />
            </Form.Item>
            <Input
              id="outlined-uncontrolled"
              placeholder="Password"
              name="password"
              allowClear
            />
            <button
              type="primary"
              ghost
              shape="round"
              size="middle"
              style={{
                backgroundColor: "#37a2f5",
                border: "none",
                color: "white",
                fontSize: "14px",
                padding: "12px 12px",
                borderRadius: "4px",
                display: "block",
                margin: "0 auto",
                marginTop: "10px",
              }}
              onClick={() => {
                Swal.fire({
                  title: "Are you sure you want to added?",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonColor: "#3a70a1",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, add it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleSubmit();
                    setEditPop(false);
                    Swal.fire(
                      "Added!",
                      "Your Admin has been added.",
                      "success"
                    );
                  }
                });
              }}
            >
              Submit
            </button>
          </div>
        </Popup>
      )}
      {editPop &&
        selectedRecord && ( // show popup if editPop is true and selectedRecord is not null
          <Popup title="Edit Admin" close={closePop}>
            <div className="input-container">
              <Input
                id="outlined-controlled"
                placeholder="First Name"
                name="first_name"
                allowClear
                value={selectedRecord.firstName} // populate input fields with selected record data
              />
              <Input
                id="outlined-uncontrolled"
                placeholder="Last Name"
                name="last_name"
                allowClear
                value={selectedRecord.lastName}
              />
              <Input
                id="outlined-uncontrolled"
                placeholder="Username"
                name="username"
                allowClear
                value={selectedRecord.userName}
              />
              <Input
                id="outlined-uncontrolled"
                placeholder="Email"
                name="email"
                allowClear
                value={selectedRecord.email}
              />
            <Form.Item label="Is Super">
              <Switch
                id="outlined-uncontrolled"
                placeholder="Is Super"
                name="is_super"
                allowClear
                value={selectedRecord.isSuper}
              />
            </Form.Item>
              <Input
                id="outlined-uncontrolled"
                placeholder="Password"
                name="password"
                allowClear
              />
              <button
                type="primary"
                ghost
                shape="round"
                size="middle"
                style={{
                  backgroundColor: "#37a2f5",
                  border: "none",
                  color: "white",
                  fontSize: "14px",
                  padding: "12px 12px",
                  borderRadius: "4px",
                  display: "block",
                  margin: "0 auto",
                  marginTop: "10px",
                }}
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure you want to edit this admin?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3a70a1",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, edit it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleSubmit();
                      setEditPop(false);
                      Swal.fire(
                        "Edited!",
                        "Your admin has been edited.",
                        "success"
                      );
                    }
                  });
                }}
              >
                Edit
              </button>
            </div>
          </Popup>
        )}
    </div>
  );
}
