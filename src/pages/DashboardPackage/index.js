import MySkeleton from "../../components/Skeleton/Skeleton.js";
import { Table, Space, Upload, Input, Switch, Form } from "antd";
import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "../../components/Button";
import Popup from "../../components/Popup";
import Swal from "sweetalert2";

const Package = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [custome, setCustome] = useState(false);
  const packageTitle = useRef();
  const description = useRef();
  const location = useRef();
  const duration = useRef();
  const isCustomized = useRef();
  const idCustomer = useRef();
  const titleUpdate = useRef();
  const uploadInputRef = useRef();
  // const fileInput=useRef();
  const fileInput = useRef(null);


  const handleAddAdmin = () => {
    setSelectedRecord(null); // reset selected record
    setAddPop(true); // show add admin popup
  };

  const isCustom = () => {
    setCustome(!custome);
  };
  const handleSubmit = (record) => {
    console.log(record);
    axios
      .post("http://localhost:8000/package/add", record)
      .then((response) => {
        setAddPop(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const addImage = (image) => {
    axios
      .post("http://localhost:8000/image/add", image)
      .then((response) => {
        setAddPop(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


  const handleEdit = (record) => {
    setSelectedRecord(record);

    setEditPop(true);
  };

  const handleUpdate = (record) => {
    axios
      .put(`http://localhost:8000/package/update/${record._id}`, record)
      .then((response) => {
        setData((prevData) =>
          prevData.map((item) => (item._id === record._id ? record : item))
        ); // update the list with the updated record
        setEditPop(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
    console.log(record);
  };

  const handleDelete = async (_id) => {
    console.log("Deleting item with id:", _id);

    try {
      await axios.delete(`http://localhost:8000/package/${_id}`);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://localhost:8000/package"
        );
        setData(response.data);
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
          return (
            <div>
              <strong>Name:</strong> {customer.firstName} {customer.lastName}
            </div>
          );
        } else {
          return <div></div>;
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
                  handleDelete(record._id);
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

  const closePop = () => {
    setAddPop(false);
    setEditPop(false);
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
          <Button onClick={handleAddAdmin}>Add Admin</Button>
          <Table
            columns={columns}
            dataSource={data}
            onChange={onChange}
            rowKey={(data) => data._id}
          />
          {addPop && (
            <Popup title="Add Admin" close={closePop}>
              <div className="input-container">
                <Input
                  id="outlined-controlled"
                  placeholder="Title"
                  name="title"
                  ref={packageTitle}
                  allowClear
                />
                <Input
                  id="outlined-uncontrolled"
                  ref={description}
                  placeholder="Description"
                  name="description"
                  allowClear
                />
                <Input
                  id="outlined-uncontrolled"
                  ref={location}
                  placeholder="Locations"
                  name="locations"
                  allowClear
                />
                <Input
                  id="outlined-uncontrolled"
                  ref={duration}
                  placeholder="Duration"
                  name="duration"
                  allowClear
                />
                <Form.Item label="Tailored">
                  <Switch
                    id="outlined-uncontrolled"
                    ref={isCustomized}
                    onChange={isCustom}
                    placeholder="Tailored"
                    name="isCustomized"
                    allowClear
                  />
                </Form.Item>
                <Input
                  id="outlined-uncontrolled"
                  ref={idCustomer}
                  placeholder="Customer Information"
                  name="idCustomer"
                  allowClear
                />
                <Upload
                  name="image"
                  action="http://localhost:8000/image/add"
                  // listType="picture"
                  // className="avatar-uploader"
                  // showUploadList={false}
                 /* onChange={(info) => {
                    const file = info.file.originFileObj;
                    setImageFile(file);
                  }}*/
                  //ref={fileInput}
                >
                  <button>
                    <PlusOutlined /> Upload Image
                  </button>
                  <input
                    type="file"
                    ref={fileInput}
                    style={{ display: "none" }}
                  />
                </Upload>

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
                        addImage({image:fileInput.current.file[0]})
                        handleSubmit({
                          packageTitle: packageTitle.current.input.value,
                          description: description.current.input.value,
                          location: location.current.input.value,
                          duration: duration.current.input.value,
                          isCustomized: custome,
                          idCustomer: idCustomer.current.input.value,
                        });
                        setEditPop(false);
                        Swal.fire(
                          "Added!",
                          "Your Package has been added.",
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
                    placeholder="Title"
                    ref={titleUpdate}
                    name="title"
                    allowClear
                    defaultValue={selectedRecord.packageTitle} // populate input fields with selected record data
                  />
                  <Input
                    id="outlined-uncontrolled"
                    placeholder="Description"
                    name="description"
                    allowClear
                    defaultValue={selectedRecord.description}
                  />
                  <Input
                    id="outlined-uncontrolled"
                    placeholder="Locations"
                    name="locations"
                    allowClear
                    defaultValue={selectedRecord.locations}
                  />
                  <Input
                    id="outlined-uncontrolled"
                    placeholder="Duration"
                    name="duration"
                    allowClear
                    defaultValue={selectedRecord.duration}
                  />
                  <Form.Item label="Tailored">
                    <Switch
                      id="outlined-uncontrolled"
                      placeholder="Tailored"
                      name="isCustomized"
                      allowClear
                      defaultValue={selectedRecord.isCustomized}
                    />
                  </Form.Item>
                  <Input
                    id="outlined-uncontrolled"
                    placeholder="Customer Information"
                    name="idCustomer"
                    allowClear
                  />
                 <Upload
                  name="image"
                  //action="/uploads"
                  // listType="picture"
                  // className="avatar-uploader"
                  // showUploadList={false}
                >
                  <button onClick={() => uploadInputRef.current.click()}>
                    <PlusOutlined /> Upload Image
                  </button>
                  <input
                    type="file"
                    ref={uploadInputRef}
                    style={{ display: "none" }}
                  />
                </Upload>

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
                        title: "Are you sure you want to edit this package?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3a70a1",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, edit it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleUpdate({
                            new: titleUpdate.current.input.value,
                            old: titleUpdate.current.input._wrapperState
                              .initialValue,
                          });
                          setEditPop(false);
                          Swal.fire(
                            "Edited!",
                            "Your package has been edited.",
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
      )}
    </div>
  );
};

export default Package;
