import {
  Table,
  Space,
  Input,
  Switch,
  Form,
  Upload,
  Select,
  DatePicker,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import moment from "moment";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Button from "../../components/Button";
import Popup from "../../components/Popup";
import Swal from "sweetalert2";

const { Option } = Select;

export default function Home(props) {
  const [data, setData] = useState([]);
  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [editedItemId, setEditedItemId] = useState("");
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);


  const [meetingData, setMeetingData] = useState({
    idUser: "",
    idAdmin: "",
    datetime: "",
    isGuest: "",
    isConfirmed: "",
  });

  const [editValues, setEditValues] = useState({
    idUser: "",
    idAdmin: "",
    datetime: "",
    isGuest: "",
    isConfirmed: "",
  });

  const getEditItem = (id) => {
    const gettedItem = data.filter((item) => id === item._id);
    setEditedItemId(id);
    setEditValues({
      idUser: gettedItem[0].idUser,
      idAdmin: gettedItem[0].idAdmin,
      datetime: gettedItem[0].datetime,
      isGuest: gettedItem[0].isGuest,
      isConfirmed: gettedItem[0].isConfirmed,
    });
    setEditPop(true);
  };

  const closePop = () => {
    setAddPop(false);
    setEditPop(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/bookingmeeting"
        );
        console.log(response.data.data);
        setData(response.data.data);
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
      const updatedMeeting = { ...editValues };
      const response = await axios.put(
        `http://localhost:5000/bookingmeeting/${editedItemId}`,
        updatedMeeting
      );
      setData(
        data.map((meeting) =>
          meeting._id === editedItemId ? updatedMeeting : meeting
        )
      );
      setEditPop(false);
    } catch (error) {
      console.log(error);
      Swal.fire("Error!", "There was an error updating the admin.", "error");
    }
  };

  const handleUserSelect = (value) => {
    setMeetingData((prevData) => ({ ...prevData, idUser: value }));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user");
        console.log(response.data.data);
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const handleAdminSelect = (value) => {
    setMeetingData((prevData) => ({ ...prevData, idAdmin: value }));
  };

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin");
        console.log(response.data.response);
        setAdmins(response.data.response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdmins();
  }, []);

  const handleAddNewMeeting = (event) => {
    //   event.preventDefault();
      axios.post('http://localhost:5000/bookingmeeting/add', meetingData)
        .then(response => {
          // setData(response.data.data);
          console.log(response)
          
        })
        .catch(error => {
          console.log(error);
        });
        console.log(meetingData)
    }

  const handleAddMeeting = () => {
    setSelectedMeeting(null); // reset selected record
    setAddPop(true); // show add admin popup
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    if (date) {
      setMeetingData((prevData) => ({
        ...prevData,
        datetime: date.format("YYYY-MM-DD HH:mm:ss"),
      }));
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/bookingmeeting/${id}`);
      setData((prevState) => prevState.filter((meeting) => meeting._id !== id));
      console.log("This meeting deleted successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "User",
      dataIndex: "idUser",
      render: (_, record) =>
        record.idUser ? `${record.idUser.firstName} ${record.idUser.lastName}` : "",
    },
    {
      title: "Admin",
      dataIndex: "idAdmin",
      render: (_, record) =>
        record.idAdmin ? `${record.idAdmin.firstName} ${record.idAdmin.lastName}` : "",
    },
    {
      title: "Date and Time",
      dataIndex: "datetime",
      filters: [],
      onFilter: (value, record) => record.datetime.indexOf(value) === 0,
    },
    {
      title: "Is Guest",
      dataIndex: "isGuest",
      filters: [
        { text: "Yes", value: "yes" },
        { text: "No", value: "no" },
      ],
      onFilter: (value, record) => record.isGuest.indexOf(value) === 0,
      render: (isGuest, record) => (
        <Switch
          checked={isGuest}
          onChange={() => {
            setMeetingData((prevData) => ({
              ...prevData,
              isGuest: !isGuest,
            }));
          }}
        />
      ),
    },
    {
      title: "Is Confirmed",
      dataIndex: "isConfirmed",
      filters: [
        { text: "Yes", value: "yes" },
        { text: "No", value: "no" },
      ],
      onFilter: (value, record) => record.isConfirmed.indexOf(value) === 0,
      render: (isConfirmed, record) => (
        <Switch
          checked={isConfirmed}
          onChange={() => {
            setMeetingData((prevData) => ({
              ...prevData,
              isConfirmed: !isConfirmed,
            }));
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
    <div className="container-meeting">
      <div className="add--button_container">
        <Button onClick={handleAddMeeting}>Add Meeting</Button>
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
        <Popup title="Add meeting" close={closePop}>
          <div className="input-container">
            <Select
              placeholder="Select an admin"
              name="idAdmin"
              onChange={handleAdminSelect}
              value={meetingData.idAdmin}
              style={{ width: "100%", marginBottom: "10px" }}
            >
              {admins.map((admin) => (
                <Option key={admin._id} value={admin._id}>
                  {admin.firstName}
                </Option>
              ))}
            </Select>
            <Select
              placeholder="Select a user"
              name="idUser"
              onChange={handleUserSelect}
              value={meetingData.idUser}
              style={{ width: "100%", marginBottom: "10px" }}
            >
              {users.map((user) => (
                <Option key={user._id} value={user._id}>
                  {user.firstName}
                </Option>
              ))}
            </Select>
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              value={moment(meetingData.datetime)}
              onChange={handleDateChange}
            />
            <Form.Item label="Is Guest">
              <Switch
                id="outlined-uncontrolled"
                name="isGuest"
                checked={meetingData.isGuest}
                onChange={(value) =>
                  setMeetingData({ ...meetingData, isGuest: value })
                }
                placeholder="Is Guest"
              />
            </Form.Item>
            <Form.Item label="Is Confirmed">
              <Switch
                id="outlined-uncontrolled"
                name="isConfirmed"
                checked={meetingData.isConfirmed}
                onChange={(value) =>
                  setMeetingData({ ...meetingData, isConfirmed: value })
                }
                placeholder="Is Confirmed"
              />
            </Form.Item>
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
                  title: "Are you sure you want to add this meeting?",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonColor: "#3a70a1",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, add it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleAddNewMeeting();
                    setAddPop(false);
                    Swal.fire(
                      "Added!",
                      "Your Meeting has been added.",
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
        <Popup title="Edit meeting" close={closePop}>
          <div className="input-container">
            <Input
              id="outlined-controlled"
              name="idAdmin"
              value={meetingData.idAdmin}
              onChange={handleInputChange}
              placeholder="Admin"
            />
            <Input
              id="outlined-uncontrolled"
              name="idUser"
              value={meetingData.idUser}
              onChange={handleInputChange}
              placeholder="User"
            />
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              value={moment(meetingData.datetime)}
              onChange={handleDateChange}
            />
            <Form.Item label="Is Guest">
              <Switch
                id="outlined-uncontrolled"
                name="isGuest"
                checked={meetingData.isGuest}
                onChange={(value) =>
                  setMeetingData({ ...meetingData, isGuest: value })
                }
                placeholder="Is Guest"
              />
            </Form.Item>
            <Form.Item label="Is Super">
              <Switch
                id="outlined-uncontrolled"
                name="isConfirmed"
                checked={meetingData.isConfirmed}
                onChange={(value) =>
                  setMeetingData({ ...meetingData, isConfirmed: value })
                }
                placeholder="Is Confirmed"
              />
            </Form.Item>
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
                  title: "Are you sure you want to add this meeting?",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonColor: "#3a70a1",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, add it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    // handleSubmit();
                    handleAddNewMeeting();
                    setEditPop(false);
                    Swal.fire(
                      "Added!",
                      "Your Meeting has been edited.",
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
    </div>
  );
}
