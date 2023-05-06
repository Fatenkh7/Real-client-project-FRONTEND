import { Table, Space, Input, Switch, Form, Upload } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./index.css";
import Button from "../../components/Button";
import Popup from "../../components/Popup";
import Swal from "sweetalert2";

export default function Home(props) {
  const [data, setData] = useState([]);
  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [editedItemId, setEditedItemId] = useState("");

  const [meetingData, setMeetingData] = useState({
    idUser: "",
    idAdmin: "",
    datetime: "",
    isGuest: false,
    isConfirmed: false,
  });

  const [editValues, setEditValues] = useState({
    idUser: "",
    idAdmin: "",
    datetime: "",
    isGuest: false,
    isConfirmed: false,
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

  const handleAddNewMeeting = async (event) => {
    try {
      const newMeeting = new FormData();
      newMeeting.append("idAdmin", meetingData.idAdmin);
      newMeeting.append("idUser", meetingData.idUser);
      newMeeting.append("datetime", meetingData.datetime);
      newMeeting.append("isConfirmed", meetingData.isConfirmed);
      newMeeting.append("isGuest", meetingData.isGuest);

      const meetingResponse = await axios.post(
        "http://localhost:5000/bookingmeeting/add",
        newMeeting
      );

      console.log(meetingResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddMeeting = () => {
    setSelectedMeeting(null); // reset selected record
    setAddPop(true); // show add admin popup
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingData({ ...meetingData, [name]: value });
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
      title: " User ",
      dataIndex: "idUser",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.idUser.localeCompare(b.idUser),
    },
    {
      title: "Admin",
      dataIndex: "idAdmin",
      filters: [],
      onFilter: (value, record) => record.idAdmin.indexOf(value) === 0,
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
            setMeetingData((prevState) => ({
              ...prevState,
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
            setMeetingData((prevState) => ({
              ...prevState,
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
