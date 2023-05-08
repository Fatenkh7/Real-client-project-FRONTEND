import { useState, useEffect, useMemo, useRef } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Space, Input, Switch, Form, Table } from "antd";
import axios from "axios";
import Button from "../../components/Button";
import Popup from "../../components/Popup";
import Swal from "sweetalert2";
import "./index.css";
import Cookies from "universal-cookie"
export default function DashboardUser() {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [morePop, setMorePop] = useState(false);
  const [users, setUsers] = useState([]);
  const airlines = useRef();
  const fname = useRef();
  const lname = useRef();
  const phone = useRef();
  const email = useRef();
  const passport = useRef();
  const editfname = useRef();
  const editlname = useRef();
  const editphone = useRef();
  const editemail = useRef();
  const editpassport = useRef();
  const closePop = () => {
    setAddPop(false);
    setEditPop(false);
    setMorePop(false);
  };
  const cookie= new Cookies()
    const headers = {
      Authorization: `Bearer ${cookie.get("token")}`,
      "id": cookie.get("id"),
      "role": cookie.get("role")
    };
  useEffect(() => {
    const fetchUsers = async () => {
     
      const URL= process.env.REACT_APP_BASE_URL
      const data = await axios.get(`${URL}user`, {headers});
      console.log(data.data.data);
      setUsers(data.data.data);
    };
    fetchUsers().catch(console.error);
  }, []);
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
        const URL= process.env.REACT_APP_BASE_URL
        axios
          .delete(`${URL}admin/${record.key}`, {headers})
          .then((response) => {
            console.log(response.data.response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setEditPop(true);
  };
  const handleAdd = () => {
    setSelectedRecord(null); // reset selected record
    setAddPop(true); // show add admin popup
  };
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const handleMore = (record) => {
    setSelectedRecord(record);
    setMorePop(true);
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: ["firstName", "lastName"],
      render: (text, record) => (
        <p onClick={(e) => handleMore(record)}>
          {record["firstName"]} {record["lastName"]}
        </p>
      ),
      key: "firstName",
      sorter: (a, b) => a.firstName.length - b.firstName.length,
      sortOrder: sortedInfo.columnKey === "firstName" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => a.phone - b.phone,
      sortOrder: sortedInfo.columnKey === "phone" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
      ellipsis: true,
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
            href="#"
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

  const handleSubmitUser = (record) => {
   
    console.log(record);
    const URL= process.env.REACT_APP_BASE_URL
    axios
      .post(`${URL}user/add`, record, {headers})
      .then((response) => {
        console.log("res", response);
        if (response.status === 201) {
          Swal.fire({
            title: "User Added Successfully",
            position: "top-end",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          setAddPop(false); // hide the add admin popup
        } else {
          Swal.fire({
            title: response.message,
            position: "top-end",
            icon: "warning",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: error.response.data.data.message,
          position: "top-end",
          icon: "warning",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };
  const handleEditUser = () => {
  
    const record = {};
    const URL= process.env.REACT_APP_BASE_URL
    axios
      .put(`${URL}user/`, record, {headers})
      .then((response) => {
        Swal.fire({
          title: "User Added Successfully",
          position: "top-end",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        setAddPop(false); // hide the add admin popup
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="container-users">
      <div className="add--button_container">
        <Button onClick={handleAdd}>Add User</Button>
      </div>
      <Table
        columns={columns}
        scroll={{ x: 400 }}
        style={{
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          width: "95%",
          background: "white",
          borderRadius: "4px",
        }}
        dataSource={users}
        onChange={handleChange}
        rowKey="_id"
      />
      {addPop && (
        <Popup title="Add User" close={closePop}>
          <div className="input-container">
            <label>
              First Name <span className="required">*</span>
            </label>
            <Input
              id="outlined-controlled"
              placeholder="First Name"
              name="first_name"
              allowClear
              required
              status="error"
              ref={fname}
            />
            <label>
              Last Name <span className="required">*</span>
            </label>
            <Input
              id="outlined-uncontrolled"
              placeholder="Last Name"
              name="last_name"
              allowClear
              ref={lname}
            />
            <label>
              Phone Number <span className="required">*</span>
            </label>
            <Input
              id="outlined-uncontrolled"
              placeholder="Phone Number"
              name="phone"
              allowClear
              ref={phone}
            />
            <label>Email</label>
            <Input
              id="outlined-uncontrolled"
              placeholder="Email"
              name="email"
              allowClear
              ref={email}
            />
            <label>Passport Number</label>
            <Input
              id="outlined-uncontrolled"
              placeholder="Passport Number"
              name="passportId"
              allowClear
              ref={passport}
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
                    console.log(fname.current);
                    handleSubmitUser({
                      firstName: fname.current.input.value,
                      lastName: lname.current.input.value,
                      phone: phone.current.input.value,
                      isMember: false,
                      email: email.current.input.value,
                      passportId: passport.current.input.value,
                    });
                    /*setEditPop(false);
                    Swal.fire(
                      "Added!",
                      "Your Admin has been added.",
                      "success"
                    );*/
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
          <Popup title="Edit User" close={closePop}>
            <div className="input-container">
              <label>First Name</label>
              <Input
                id="outlined-controlled"
                placeholder="First Name"
                name="first_name"
                allowClear
                required
                ref={editfname}
                defaultValue={selectedRecord.firstName} // populate input fields with selected record data
              />
              <label>Last Name</label>
              <Input
                required
                id="outlined-uncontrolled"
                placeholder="Last Name"
                name="last_name"
                ref={editlname}
                allowClear
                defaultValue={selectedRecord.lastName}
              />
              <label>Phone Number</label>
              <Input
                id="outlined-uncontrolled"
                placeholder="Phone Number"
                name="phone"
                allowClear
                ref={editphone}
                defaultValue={selectedRecord.phone}
              />
              <label>Passport Number</label>
              <Input
                id="outlined-uncontrolled"
                placeholder="Passport Number"
                name="passportId"
                ref={editpassport}
                allowClear
                defaultValue={selectedRecord.passportId}
              />
              <label>Email</label>
              <Input
                id="outlined-uncontrolled"
                placeholder="Email"
                name="email"
                allowClear
                defaultValue={selectedRecord.email}
              />
              <Input
                id="outlined-uncontrolled"
                placeholder="Preferred Airlines"
                name="prefairlines"
                allowClear
                ref={airlines}
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
                    title: "Are you sure you want to edit this user?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3a70a1",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, edit it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      //handleSubmitUser({firstName:editfname});
                      let form = {};
                      if (
                        editfname.current.input._wrapperState.initialValue !=
                        editfname.current.input.value
                      ) {
                        form.firstName = editfname.current.input.value;
                      }
                      if (
                        editlname.current.input._wrapperState.initialValue !=
                        editlname.current.input.value
                      ) {
                        form.lastName = editfname.current.input.value;
                      }
                      if (
                        editphone.current.input._wrapperState.initialValue !=
                        editphone.current.input.value
                      ) {
                        form.phone = editphone.current.input.value;
                      }
                      if (
                        editpassport.current.input._wrapperState.initialValue !=
                        editpassport.current.input.value
                      ) {
                        form.passportId = editpassport.current.input.value;
                      }
                      console.log(form);
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
      {morePop && selectedRecord && (
        <Popup title="User Information" close={closePop}>
          {console.log(selectedRecord)}
          <p>First Name: {selectedRecord.firstName}</p>
          <p>Last Name: {selectedRecord.lastName}</p>
          <p>Phone Number: {selectedRecord.phone}</p>
          <p>Email: {selectedRecord.email}</p>
          <p>Points: {selectedRecord.points}</p>
          <p>
            Passport:{" "}
            {selectedRecord.passportId ? selectedRecord.passportId : ""}
          </p>
          <p>
            Pref destinations:{" "}
            {selectedRecord.preferredDestinations.length > 0
              ? JSON.parse(selectedRecord.preferredDestinations).map((e) => {
                  return <span key={e}>{e} </span>;
                })
              : ""}
          </p>
          <p>
            Pref Airlines:{" "}
            {selectedRecord.preferredAirlines.length > 0
              ? JSON.parse(selectedRecord.preferredAirlines).map((e) => {
                  return <span key={e}>{e} </span>;
                })
              : " "}
          </p>
        </Popup>
      )}
    </div>
  );
}
