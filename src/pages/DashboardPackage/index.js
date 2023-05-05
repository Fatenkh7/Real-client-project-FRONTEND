import axios from "axios";
import { Table, Space, Input, Switch, Form, Upload, Select } from "antd";
import MySkeleton from "../../components/Skeleton/Skeleton.js";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import Button from "../../components/Button";
import "../DashboardAdmin/index.css";
import Popup from "../../components/Popup";
import FormData from "form-data";

const Package = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  //edit image
  const [editImage, setEditImage] = useState(null);
  const [ImageTitle, setImageTitle] = useState("");

  const [formData, setFormData] = useState({
    //package
    packageTitle: "",
    description: "",
    locations: [],
    duration: "",
    isCustomized: false,
    idImage: "",
    idCustomer: "",
  });

  //image
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");

  const [users, setUsers] = useState("");

  const { Option } = Select;

  const onFileChange = (info) => {
    setSelectedFile(info.file);
  };

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const imageUploadResponse = () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("title", title);

    axios
      .post("http://localhost:8000/image/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("response", response);

        const idImage = response.data.newImage._id;
        setFormData((prevFormData) => ({
          ...prevFormData,
          idImage,
        }));

        console.log("idImage", idImage);
        console.log(formData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log("formData changed: ", formData);
  }, [formData]);

  const getAllUsers = async () => {
    try {
      const { data: response } = await axios.get("http://localhost:5000/user");
      setUsers(response.data);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  const postPackage = async () => {
    try {
      const packageResponse = await axios.post(
        "http://localhost:8000/package/add",
        formData
      );
      console.log(packageResponse.data);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "locations") {
      const locationsArray = value.split(",");
      setFormData({ ...formData, [name]: locationsArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const closePop = () => {
    setAddPop(false);
    setEditPop(false);
  };

  const addPackage = () => {
    setAddPop(true); // show add package popup
  };

  const editPackage = () => {
    setEditPop(true); // show add package popup
  };

  // edit a particular package
  const putPackage = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/package/${formData.id}`,
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onImageChange = (info) => {
    setEditImage(info.file);
  };

  const onImageTitleChange = (event) => {
    setImageTitle(event.target.value);
  };

  const imageUpdateResponse = () => {
    const formData = new FormData();

    formData.append("image", editImage);
    formData.append("title", ImageTitle);

    axios
      .post(`http://localhost:8000/image/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("response", response);
        console.log('image updated successfully');

        const idImage = response.data.newImage._id;
        setFormData((prevFormData) => ({
          ...prevFormData,
          idImage,
        }));

        console.log("idImage", idImage);
        console.log(formData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let newForm = formData;
    newForm[name] = value;
    setFormData({
      ...newForm,
    });
  };

  // get all packages
  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(
        "http://localhost:5000/package"
      );
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setFormData({
      id: record._id,
      packageTitle: record.packageTitle,
      description: record.description,
      locations: record.locations.join(","),
      duration: record.duration,
      isCustomized: record.isCustomized,
      idImage: record.idImage._id,
      idCustomer: record.idCustomer?._id,
    });
    setEditPop(true);
  };

  //get data after rendering
  useEffect(() => {
    fetchData();
    getAllUsers();
  }, []);

  // delete a particular row
  const deleteRow = async (_id) => {
    let originalPackages = [...data];
    try {
      await axios.delete(`http://localhost:8000/package/${_id}`);
      setData(data.filter((p) => p._id !== _id));
    } catch (error) {
      console.error(error.message);
      setData(originalPackages);
      fetchData();
    }
  };

  const columns = [
    {
      title: "Package Title",
      dataIndex: "packageTitle",
      key: "packageTitle",
    },
    {
      title: "Image",
      dataIndex: "idImage",
      key: "idImage",
      render: (idImage) => (
        <img
          src={`http://localhost:5000/${idImage.image}`}
          alt={idImage.title}
          width="100"
        />
      ),
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
      title: "Actions",
      key: "actions",
      render: (row) => (
        <Space size="middle">
          {/* edit data icon */}

          <a onClick={() => handleEdit(row)}>
            <EditOutlined />
          </a>

          <a
            onClick={() =>
              Swal.fire({
                title: "Are you sure you want to delete this Package?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3a70a1",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  deleteRow(row._id);

                  Swal.fire(
                    "Deleted!",
                    "Your Package has been deleted.",
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

  return (
    <>
      {loading && <MySkeleton />}
      <Table
        columns={columns}
        dataSource={data.map((row, index) => ({ ...row, key: index }))}
      />

      {/* form to add a new package */}

      {<Button onClick={addPackage}>Add Package</Button>}

      {addPop && (
        <Popup title="Add a new Package" close={closePop}>
          <div className="input-container">
            <Input
              id="outlined-controlled"
              placeholder="Package Title"
              name="packageTitle"
              allowClear
              value={formData.packageTitle}
              onChange={handleChange}
            />
            <Input
              id="outlined-uncontrolled"
              placeholder="Description"
              name="description"
              allowClear
              value={formData.description}
              onChange={handleChange}
            />
            <Input
              id="outlined-uncontrolled"
              placeholder="Location1, Location2, Location3..."
              name="locations"
              allowClear
              value={formData.locations}
              onChange={handleChange}
            />
            <Input
              id="outlined-uncontrolled"
              placeholder="Duration"
              name="duration"
              allowClear
              value={formData.duration}
              onChange={handleChange}
            />
            <Form.Item label="Tailored">
              <Switch
                id="outlined-uncontrolled"
                placeholder="Tailored"
                name="isCustomized"
                allowClear
                checked={formData.isCustomized}
                onChange={(e) => setFormData({ ...formData, isCustomized: e })}
              />
            </Form.Item>

            <Select
              showSearch
              placeholder="Select customer"
              optionFilterProp="children"
              value={formData.idCustomer}
              onChange={(value) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  idCustomer: value,
                }));
              }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {users.map((user) => (
                <Option key={user._id} value={user._id}>
                  {user.firstName} {user.lastName}
                </Option>
              ))}
            </Select>

            <Input
              id="outlined-uncontrolled"
              placeholder="Image Title"
              name="Image Title"
              allowClear
              value={title}
              onChange={onTitleChange}
            />

            <Form.Item>
              <Upload beforeUpload={() => false} onChange={onFileChange}>
                <button
                  style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "4px",
                    border: "1px solid #3a70a1",
                  }}
                >
                  <PlusOutlined
                    style={{ color: "#3a70a1", cursor: "pointer" }}
                  />{" "}
                  Upload Image
                </button>
              </Upload>
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
                padding: "12px 30px",
                borderRadius: "4px",
                display: "block",
                margin: "0 auto",
                marginTop: "10px",
              }}
              onClick={() => {
                Swal.fire({
                  title: "You are adding a new Package",
                  showCancelButton: true,
                  confirmButtonColor: "#3a70a1",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, add it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    //call post function
                    imageUploadResponse();
                    postPackage();
                    setAddPop(false);
                    Swal.fire(
                      "Added!",
                      "Your Package has been added.",
                      "success"
                    );
                     }
                    
                    }).catch(
                      Swal.fire(
                      "Added!",
                      "Error",
                      "warning"
                    )
                    
                    );
                    
                  }
                }
              
            >
              SUBMIT
            </button>
          </div>
        </Popup>
      )}

      {/* form to edit package */}

      {editPop && (
        <Popup title="Edit a Package" close={closePop}>
          <div className="input-container">
            <Input
              id="outlined-controlled"
              placeholder="Package Title"
              name="packageTitle"
              allowClear
              value={formData.packageTitle}
              onChange={handleInputChange}
            />
            <Input
              id="outlined-uncontrolled"
              placeholder="Description"
              name="description"
              allowClear
              value={formData.description}
              onChange={handleInputChange}
            />
            <Input
              id="outlined-uncontrolled"
              placeholder="Location1, Location2, Location3..."
              name="locations"
              allowClear
              value={formData.locations}
              onChange={handleInputChange}
            />
            <Input
              id="outlined-uncontrolled"
              placeholder="Duration"
              name="duration"
              allowClear
              value={formData.duration}
              onChange={handleInputChange}
            />
            <Form.Item label="Tailored">
              <Switch
                id="outlined-uncontrolled"
                placeholder="Tailored"
                name="isCustomized"
                allowClear
                checked={formData.isCustomized}
                onChange={(e) => setFormData({ ...formData, isCustomized: !e })}
              />
            </Form.Item>

            <Select
              showSearch
              placeholder="Select customer"
              optionFilterProp="children"
              value={formData.idCustomer}
              onChange={(value) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  idCustomer: value,
                }));
              }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {users.map((user) => (
                <Option key={user._id} value={user._id}>
                  {user.firstName} {user.lastName}
                </Option>
              ))}
            </Select>

            <Input
              id="outlined-uncontrolled"
              placeholder="Image Title"
              name="Image Title"
              allowClear
              value={title}
              onChange={onImageTitleChange}
            />

            <Form.Item>
              <Upload beforeUpload={() => false} onChange={onImageChange}>
                <button
                  style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "4px",
                    border: "1px solid #3a70a1",
                  }}
                >
                  <PlusOutlined
                    style={{ color: "#3a70a1", cursor: "pointer" }}
                  />{" "}
                  Upload Image
                </button>
              </Upload>
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
                padding: "12px 30px",
                borderRadius: "4px",
                display: "block",
                margin: "0 auto",
                marginTop: "10px",
              }}
              onClick={() => {
                Swal.fire({
                  title: "You are editing this Package",
                  showCancelButton: true,
                  confirmButtonColor: "#3a70a1",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, edit it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    //call put function
                    putPackage();
                    imageUpdateResponse();

                    setEditPop(false);
                    Swal.fire(
                      "Edited!",
                      "This package has been edited.",
                      "success"
                    );
                  }
                });
              }}
            >
              EDIT
            </button>
          </div>
        </Popup>
      )}
    </>
  );
};

export default Package;
