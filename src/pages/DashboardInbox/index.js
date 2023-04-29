import { Table, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
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
      .get("http://localhost:5000/inbox")
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/inbox/${id}`);
      setData(data.filter((inbox) => inbox._id !== id));
      console.log("Inbox deleted successfully!");
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
      title: "Email",
      dataIndex: "email",
      filters: [],
      onFilter: (value, record) => record.email.indexOf(value) === 0,
    },
    {
        title: "Feedback",
        dataIndex: "feedback",
        filters: [],
        onFilter: (value, record) => record.userName.indexOf(value) === 0,
      },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
            <a
            onClick={() =>
              Swal.fire({
                title: "Are you sure you want to delete this Inbox?",
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
                      "This inbox has been deleted.",
                      "success"
                    );
                  } catch (error) {
                    console.log(error);
                    Swal.fire(
                      "Error!",
                      "There was an error deleting this inbox.",
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
    <div className="container-inbox">
      <Table
        columns={columns}
        style={{
          height:"560px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          width: "95%",
          background: "white",
          borderRadius:"4px",
        }}
        dataSource={data}
        onChange={onChange}
      />
    </div>
  );
}
