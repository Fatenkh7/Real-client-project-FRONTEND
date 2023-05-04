import axios from "axios";
import { Table, Space, Input, Switch, Form, Upload, Select } from "antd";
import MySkeleton from "../../components/Skeleton/Skeleton.js";
import { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
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

  const [message, setMessage] = useState("");
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

  const [imageFile, setImageFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [users, setUsers] = useState("");

  const { Option } = Select;

  const onFileChange = (event) => {
    setSelectedFile(event.fileList[0]);
  };

  // const handleImageChange = (e) => {
  //   if (e.target.files.length) {
  //     setImageFile(e.target.files[0]);
  //   }
  // };

  // post a new package

  // event.preventDefault();

  // Upload image and get its id

  const imageUploadResponse = async () => {
    try {
      console.log("batata", selectedFile[0]);
      const imageData = new FormData();
      imageData.append("image", selectedFile, selectedFile.name);
      imageData.append("title", formData.title);

      const response = await axios.post(
        "http://localhost:5000/image/add",
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("aaaaaaaaaaaaaaaaaaaa");
      console.log("@res@", response.data.newImage._id);
      let imageId = response.data.newImage._id;
      setFormData({...formData, idImage:imageId});

      setMessage("image added successfully!");

      return response;
    } catch (error) {
      console.error(error);
      setMessage("Error adding image");
    }
  };

  const getAllUsers = async () => {
    try {
      const { data: response } = await axios.get("http://localhost:5000/user");
      setUsers(response.data);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  const postPackage = async (event) => {
    // Create package data object
    try {
      let packageData = {};
      packageData.packageTitle=formData.packageTitle;
      packageData.description= formData.description;
      packageData.locations= JSON.stringify(formData.locations);
      packageData.duration= formData.duration;
      packageData.isCustomized= formData.isCustomized;
      packageData.idImage= formData.idImage;
      packageData.idCustomer= formData.idCustomer;
      packageData.idImage= formData.idImage;
      console.log("forms data batata", packageData)
      const packageResponse = await axios.post(
        "http://localhost:5000/package/add",
        packageData
      );

      console.log(packageResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const closePop = () => {
    setAddPop(false);
    setEditPop(false);
  };

  const addPackage = () => {
    setSelectedRecord(null); // reset selected record
    setAddPop(true); // show add package popup
  };

  // get all packages
  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(
        "http://localhost:5000/package"
      );
      setData(response.data);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  //get data after rendering
  useEffect(() => {
    fetchData();
    getAllUsers();
  }, []);

  // delete a particular row
  // const deleteRow = async (_id) => {
  //   let originalPackages = [...data];
  //   try {
  //     await axios.delete(`http://localhost:5000/package/${_id}`);
  //     setData(data.filter((p) => p._id !== _id));
  //   } catch (error) {
  //     console.error(error.message);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Something went wrong!",
  //     });

  //     setData(originalPackages);
  //     fetchData();
  //   }
  // };

  const deleteRow = async (_id) => {
    let originalPackages = [...data];
    try {
      await axios.delete(`http://localhost:5000/package/${_id}`);
      setData((prevData) => prevData.filter((p) => p._id !== _id));
      setMessage("Package deleted successfully!");
    } catch (error) {
      console.error(error);
      setData(originalPackages);
      setMessage("Error deleting package!");
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
          {/* <a onClick={() => handleEdit(record)}>
              <EditOutlined />
            </a> */}

          {/* delete data icon */}

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
              name="Package Title"
              allowClear
              onChange={(e)=> {setFormData({...formData, packageTitle:e.target.value})}}
            />
            <Input
              id="outlined-uncontrolled"
              placeholder="Description"
              name="Description"
              allowClear
              onChange={(e)=> {setFormData({...formData, description:e.target.value})}}
            />
            <Input
              id="outlined-uncontrolled"
              placeholder="Location"
              name="Location"
              allowClear
              onChange={(e)=> {setFormData({...formData, locations:e.target.value})}}
            />
            <Input
              id="outlined-uncontrolled"
              placeholder="Duration"
              name="Duration"
              allowClear
              onChange={(e)=> {setFormData({...formData, duration:e.target.value})}}
            />
            <Form.Item label="Tailored">
              <Switch
                id="outlined-uncontrolled"
                placeholder="Tailored"
                name="Tailored"
                allowClear
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

            <Form.Item
              name="image"
              label="Image"
              rules={[
                {
                  required: true,
                  message: "Please upload an image",
                },
              ]}
            >
              <Upload
                accept=".jpg,.jpeg,.png"
                beforeUpload={(file) => {
                  setSelectedFile(file);
                  return false; // Prevent AntD from uploading the file immediately
                }}
                onChange={(info) => {
                  const { status } = info.file;
                  if (status === "done") {
                    setMessage("Image uploaded successfully!");
                  } else if (status === "error") {
                    setMessage("Error uploading image!");
                  }
                }}
              ></Upload>
            </Form.Item>

            <Form.Item
              name="image"
              label="Image"
              rules={[
                {
                  required: true,
                  message: "Please upload an image",
                },
              ]}
            >
             

<Upload
  accept=".jpg,.jpeg,.png"
  beforeUpload={(file) => {
    setSelectedFile(file);
    return false; // Prevent AntD from uploading the file immediately
  }}
  onChange={(info) => {
    const { status } = info.file;
    if (status === "done") {
      setMessage("Image uploaded successfully!");
    } else if (status === "error") {
      setMessage("Error uploading image!");
    }
  }}
>
+
</Upload>

            </Form.Item>
            <Form.Item
              name="title"
              label="Image Title"
              rules={[
                {
                  required: true,
                  message: "Please enter the image title",
                },
              ]}
            >
              <Input
                placeholder="Enter the title for the image"
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    title: e.target.value,
                  }))
                }
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
                  title: "You are adding a new Package",
                  showCancelButton: true,
                  confirmButtonColor: "#3a70a1",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, add it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    //call post function
                    imageUploadResponse().then(function (success) {
                      console.log("response image",success);
                      postPackage().then(
                        function(success){
                          setEditPop(false);
                    Swal.fire(
                      "Added!",
                      "Your Package has been added.",
                      "success"
                    );
                        }
                      )
                    }).catch(
                      Swal.fire(
                      "Added!",
                      "Error",
                      "warning"
                    )
                    
                    );
                    
                  }
                }).catch(console.error())
              }}
            >
              Submit
            </button>
          </div>
        </Popup>
      )}
    </>
  );
};

export default Package;
