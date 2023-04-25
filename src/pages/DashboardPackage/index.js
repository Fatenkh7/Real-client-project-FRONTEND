import MySkeleton from "../../components/Skeleton/Skeleton.js";
import "./index.css";
import { Table, Space, Input, Switch, Form } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../components/Button";
import Popup from "../../components/Popup";
import Swal from "sweetalert2";

const Package = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://localhost:8000/package"
        );
        setData(response.data);
        console.log(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "packageTitle",
      key: "packageTitle",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Location",
      dataIndex: "locations",
      key: "locations",
      render: (locations) => {
        return locations.join(", ");
      },
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Tailored",
      dataIndex: "isCustomized",
      key: "isCustomized",
      render: (text) => (text ? "Yes" : "No"),
    },

    {
      title: "Customer Information",
      dataIndex: "idCustomer",
      key: "idCustomer",
      render: (customer) => {
        if (customer) {
          const preferredAirlines = customer.preferredAirlines
            ? JSON.parse(customer.preferredAirlines)
            : [];
          const preferredDestinations = customer.preferredDestinations
            ? JSON.parse(customer.preferredDestinations)
            : [];
          return (
            <div>
              <div>
                {" "}
                <strong>Name:</strong> {customer.firstName} {customer.lastName}
              </div>

              <div>
                <strong>Membership Status:</strong>{" "}
                {customer.isMember ? "Active" : "Inactive"}
              </div>
              <div>
                <strong>Email:</strong> {customer.email}
              </div>
              <div>
                <strong>Phone:</strong> {customer.phone}
              </div>
              <div>
                <strong>Passport ID:</strong> {customer.passportId}
              </div>
              <div>
                <strong>Preferred Destinations</strong>:
                <ul>
                  {preferredDestinations.map((destination, index) => (
                    <li key={index}>{destination}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong> Preferred Airlines:</strong>
                <ul>
                  {preferredAirlines.map((airline, index) => (
                    <li key={index}>{airline}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Points:</strong> {customer.points}
              </div>
              <div>
                <strong>Confirmed Status:</strong>{" "}
                {customer.isConfirmed ? "Confirmed" : "Unconfirmed"}
              </div>
            </div>
          );
        } else {
          return (
            <div>
              The program is not configurable to accommodate customer
              information.
            </div>
          );
        }
      },
    },
    {
      title: "Image",
      dataIndex: "idImage",
      key: "image",
      render: (idImage) => (
        <img
          src={`http://localhost:8000/${idImage.image}`}
          alt={idImage.title}
          width="100"
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <>
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(record.id)}
          />
          <EditOutlined
            style={{ cursor: "pointer" }}
            onClick={() => handleEdit(record.id)}
          />
        </>
      ),
    },
  ];

  const handleDelete = async (_id) => {
    console.log("Deleting item with id:", _id);

    try {
      await axios.delete(`http://localhost:8000/package/${_id}`);
      setData((prevData) => prevData.filter((item) => item._id !== _id));
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  const handleEdit = async (_id) => {
    console.log("Deleting item with id:", _id);

    try {
      await axios.put(`http://localhost:8000/package/${_id}`);
      setData((prevData) => prevData.filter((item) => item._id !== _id));
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };


  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      {loading ? (
        <MySkeleton />
      ) : (
        <div>
          <h2>PACKAGES</h2>
          <Table
            columns={columns}
            dataSource={
              Array.isArray(data)
                ? data.map((item, index) => {
                    try {
                      return {
                        ...item,
                        key: item.id || index,
                      };
                    } catch (e) {
                      console.error(e);
                      return {
                        ...item,
                        key: item.id || index,
                      };
                    }
                  })
                : []
            }
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
};

export default Package;
