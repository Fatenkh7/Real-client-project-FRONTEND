import { Table, Space, Input, Switch, Form, Upload } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./index.css";
import Button from "../../components/Button";
import Popup from "../../components/Popup";
import Swal from "sweetalert2";
import { RoleContext} from "../../App";
import Cookies from "universal-cookie";

export default function Home(props) {
  const config=React.useContext(RoleContext)
  const [data, setData] = useState([]);
  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [editedItemId, setEditedItemId] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const inputFileRef = useRef(null);

  const [adminData, setAdminData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    isSuper: false,
  });

  const [editValues, setEditValues] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    isSuper: false,
  });

  const getEditItem = (id) => {
    const gettedItem = data.filter((item) => id === item._id);
    setEditedItemId(id);
    setEditValues({
      firstName: gettedItem[0].firstName,
      lastName: gettedItem[0].lastName,
      userName: gettedItem[0].userName,
      email: gettedItem[0].email,
      password: gettedItem[0].password,
      isSuper: gettedItem[0].isSuper,
    });
    setEditPop(true);
  };

  const closePop = () => {
    setAddPop(false);
    setEditPop(false);
  };  
    const cookie= new Cookies()
    const headers = {
      Authorization: `Bearer ${cookie.get("token")}`,
      "id": cookie.get("id"),
      "role": cookie.get("role")
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL= process.env.REACT_APP_BASE_URL
        console.log(headers)
        const response = await axios.get(`${URL}admin`, {headers});
        const rawData = response.data.response;
        if (Array.isArray(rawData)) {
          setData(rawData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleEditValues = (event) => {
    const { name, value } = event.target;
    setEditValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const URL= process.env.REACT_APP_BASE_URL
      const updatedAdmin = { ...editValues };
      const response = await axios.put(
        `${URL}admin/${editedItemId}` , { headers },
        updatedAdmin
      );
      setData(
        data.map((admin) => (admin._id === editedItemId ? updatedAdmin : admin))
      );
      setEditPop(false);
    } catch (error) {
      console.log(error);
      Swal.fire("Error!", "There was an error updating the admin.", "error");
    }
  };

  const handleAddNewAdmin = async (event) => {
    // event.preventDefault(); // uncomment this line if you want to prevent the default form submission

    try {
      const URL= process.env.REACT_APP_BASE_URL
      const response = await axios.post(
        `${URL}admin/add`,
        adminData, {headers}
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    console.log(adminData);
  };

  const handleAddAdmin = () => {
    setSelectedAdmin(null); // reset selected record
    setAddPop(true); // show add admin popup
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const handleDelete = async (id) => {
    try {
      const URL= process.env.REACT_APP_BASE_URL
      await axios.delete(`${URL}admin/${id}`, { headers });
      setData((prevState) => prevState.filter((admin) => admin._id !== id));
      console.log("Admin deleted successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
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
            setAdminData((prevState) => ({ ...prevState, isSuper: !isSuper }));
          }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle" key={record._id}>
          <a
            onClick={() => {
              getEditItem(record._id);
            }}
          >
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
              }).then(async (result) => {
                if (result.isConfirmed) {
                  try {
                    await handleDelete(record._id);
                    console.log("select", result.isConfirmed);
                    Swal.fire(
                      "Deleted!",
                      "Your admin has been deleted.",
                      "success"
                    );
                  } catch (error) {
                    console.log(error);
                    Swal.fire(
                      "Error!",
                      "There was an error deleting the admin.",
                      "error"
                    );
                  }
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

  return (
    <div className="container-admins">
      <div className="add--button_container">
        <Button onClick={handleAddAdmin}>Add Admin</Button>
      </div>
      <Table
        columns={columns}
        key="admin-table"
        pagination={{ pageSize: 8 }}
        rowKey={(record) => record._id}
        style={{
          height: "560px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          width: "95%",
          background: "white",
          borderRadius: "4px",
        }}
        dataSource={data}
        onChange={onChange}
      />
      {addPop && (
        <Popup title="Add Admin" close={closePop}>
          <div className="input-container">
            <Input
              id="outlined-controlled"
              name="firstName"
              value={adminData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
            />
            <Input
              id="outlined-uncontrolled"
              name="lastName"
              value={adminData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
            <Input
              id="outlined-uncontrolled"
              name="userName"
              value={adminData.userName}
              onChange={handleInputChange}
              placeholder="Username"
            />
            <Input
              id="outlined-uncontrolled"
              name="email"
              value={adminData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <Form.Item label="Is Super">
              <Switch
                id="outlined-uncontrolled"
                name="isSuper"
                checked={adminData.isSuper}
                onChange={(value) =>
                  setAdminData({ ...adminData, isSuper: value })
                }
                placeholder="Is Super"
              />
            </Form.Item>
            <Input
              id="outlined-uncontrolled"
              name="password"
              value={adminData.password}
              onChange={handleInputChange}
              placeholder="Password"
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
                  title: "Are you sure you want to add this admin?",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonColor: "#3a70a1",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, add it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    // handleSubmit();
                    handleAddNewAdmin();
                    setAddPop(false);
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
      {editPop && (
        <Popup title="Edit Admin" close={closePop}>
          <div className="input-container">
            <Input
              id="outlined-controlled"
              placeholder="First Name"
              name="firstName"
              onChange={(e) => {
                setEditValues((prevState) => ({
                  ...prevState,
                  firstName: e.target.value,
                }));
              }}
              value={editValues.firstName}
            />
            <Input
              id="outlined-uncontrolled"
              placeholder="Last Name"
              name="lastName"
              onChange={(e) => {
                setEditValues((prevState) => ({
                  ...prevState,
                  lastName: e.target.value,
                }));
              }}
              value={editValues.lastName}
            />
            <Input
              id="outlined-uncontrolled"
              name="userName"
              onChange={(e) => {
                setEditValues((prevState) => ({
                  ...prevState,
                  userName: e.target.value,
                }));
              }}
              value={editValues.userName}
              placeholder="Username"
            />
            <Input
              id="outlined-uncontrolled"
              placeholder="Email"
              name="email"
              onChange={(e) => {
                setEditValues((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }));
              }}
              value={editValues.email}
            />
            <Form.Item label="Is Super">
              <Switch
                id="outlined-uncontrolled"
                placeholder="Is Super"
                name="isSuper"
                onChange={(value) => {
                  setEditValues((prevState) => ({
                    ...prevState,
                    isSuper: value,
                  }));
                }}
                value={editValues.isSuper}
              />
            </Form.Item>
            <Input
              id="outlined-uncontrolled"
              placeholder="Password"
              name="password"
              type="password"
              // value={editValues.password}
              onChange={(e) => {
                setEditValues((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }));
              }}
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
                    handleSave();
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
