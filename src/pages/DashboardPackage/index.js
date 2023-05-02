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

    //image
    image: null,
    title: "",

    //user
    // firstName: "",
    // lastName: "",
    // isMember: false,
    // createDate: new Date().toISOString().slice(0, 10),
    // isConfirmed: true,
    // points: 0,
    // email: "",
    // password: "",
    // phone: "",
    // title: "",
    // passportId: "",
    // preferredDestinations: [],
    // preferredAirlines: [],
  });

  const [imageFile, setImageFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

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
      const imageData = new FormData();
      imageData.append("image", selectedFile.originFileObj, selectedFile.name);
      imageData.append("title", formData.title);

      const response = await axios.post(
        "http://localhost:8000/image/add",
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageId = response.data._id;
      setFormData((prevFormData) => ({
        ...prevFormData,
        idImage: imageId, // set the idImage field in formData to the imageId
      }));

      setMessage("image added successfully!");

      return response;
    } catch (error) {
      console.error(error);
      setMessage("Error adding image");
    }
  };

  const getAllUsers = async () => {
    try {
      const { data: response } = await axios.get("http://localhost:8000/user");
      setData(response.data);
      console.log("data:", data);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  const postPackage = async (event) => {
    // Create package data object
    try {
      const packageData = new FormData();
      packageData.append("packageTitle", formData.packageTitle);
      packageData.append("description", formData.description);
      packageData.append("locations", JSON.stringify(formData.locations));
      packageData.append("duration", formData.duration);
      packageData.append("isCustomized", formData.isCustomized);
      packageData.append("idImage", formData.idImage);
      packageData.append("idCustomer", formData.idCustomer);
      packageData.append("title", formData.title);
      packageData.append("image", imageFile);

      const packageResponse = await axios.post(
        "http://localhost:8000/package/add",
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
        "http://localhost:8000/package"
      );
      setData(response.data);
      console.log("data:", data);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  //get data after rendering
  useEffect(() => {
    fetchData();
  }, []);

  // delete a particular row
  const deleteRow = async (_id) => {
    let originalPackages = [...data];
    try {
      await axios.delete(`http://localhost:8000/package/${_id}`);
      setData(data.filter((p) => p._id !== _id));
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });

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
          src={`http://localhost:8000/${idImage.image}`}
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
      render: (idCustomer) => (
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a user"
          optionFilterProp="children"
          value={idCustomer}
          onChange={(value) => {
            setFormData((prevFormData) => ({
              ...prevFormData,
              idCustomer: value,
            }));
          }}
        >
          {data.map((user) => (
            <Select.Option key={user._id} value={user._id}>
              {user.firstName} {user.lastName}
            </Select.Option>
          ))}
        </Select>
      ),
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
            />
            <Input
              id="outlined-uncontrolled"
              placeholder="Description"
              name="Description"
              allowClear
            />
            <Input
              id="outlined-uncontrolled"
              placeholder="Location"
              name="Location"
              allowClear
            />
            <Input
              id="outlined-uncontrolled"
              placeholder="Duration"
              name="Duration"
              allowClear
            />
            <Form.Item label="Tailored">
              <Switch
                id="outlined-uncontrolled"
                placeholder="Tailored"
                name="Tailored"
                allowClear
              />
            </Form.Item>
            <Input
              id="outlined-uncontrolled"
              placeholder="Customer Information"
              name="Customer Information"
              allowClear
            />
            <Input
              id="outlined-uncontrolled"
              placeholder="Image Title"
              name="Image Title"
              allowClear
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

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
                onChange={onFileChange}
                accept=".jpg,.jpeg,.png"
                fileList={selectedFile ? [selectedFile] : []}
              >
                <Button icon={<UploadOutlined />}>Select Image</Button>
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
                    postPackage();

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
    </>
  );
};

export default Package;
