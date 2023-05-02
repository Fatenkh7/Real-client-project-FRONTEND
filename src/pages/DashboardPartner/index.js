import { Table, Space, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Button from "../../components/Button";
import Popup from "../../components/Popup";
import Swal from "sweetalert2";

const Partner = () => {
    const [data, setData] = useState([]);
    const [editedItemId,setEditedItemId]=useState('')
    const [openPop, setOpenPop] = useState(false);
    const [formValues, setFormValues] = useState({
        company: '',
        description: '',
        rate: '',
        link: '',
    });
    const [editPop, setEditPop] = useState(false);
    const [editValues, seteditValues] = useState({
  
      company: '',
      description: '',
      rate: '',
      link: '',
    });
    const closePop = () => {
        setOpenPop(false);
        setEditPop(false);
      };
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ0MDg3MzQ0N2Q4OTM2M2IyYTQxMjU5IiwidXNlck5hbWUiOiJzdXBlckFkbWluIiwiaWF0IjoxNjgyNTc1OTIxLCJleHAiOjE2ODI1OTAzMjF9.jf7LDujBr-uFKL1HrdQ1_iC6XEPGJ0sr6RrTIE8KAM4';
  
    const headers = {
      Authorization: `Bearer ${token}`,
      "id": "6440873447d89363b2a41259",
      "role": "superAdmin"
    };
    useEffect(() => {
      axios.get('http://localhost:5000/partner', { headers })
        .then(response => {
            setData(response.data.response);
          console.log(response.data)
        })
        .catch(error => {
          console.log(error);
        });
    },[]);
    const handleSubmit = (event) => {
    //   event.preventDefault();
      axios.post('http://localhost:8000/partner/add', formValues, { headers })
        .then(response => {
          // setData(response.data.data);
          console.log(response)
          
        })
        .catch(error => {
          console.log(error);
        });
        console.log(formValues)
    }
  
  
    const handleDelete = (id) => {
      axios.delete(`http://localhost:8000/partner/${id}`, { headers })
        .then(response => {
        //   message.success('Booking deleted successfully.');
          setData(data.filter(item => item.id !== id));
          console.log('hello' , id)
        })
        .catch(error => {
          console.log(error);
        //   message.error('Something went wrong.');
        });
    };
  const getEditItem = (id) =>{
    const gettedItem=data.filter((item)=>(id === item._id));
    setEditedItemId(id)
    seteditValues({
      company: gettedItem[0].company,
      description: gettedItem[0].description,
      rate: gettedItem[0].rate.$numberDecimal,
      link: gettedItem[0].link,
    })
    setEditPop(true) ;
  }
  function updateBooking(event) {
    // event.preventDefault();
     axios.put(`http://localhost:8000/partner/${editedItemId}`, editValues, { headers })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
      });
  } 
  const columns = [
    {
      title: "Company",
      dataIndex: "company",
      filters: [],
      onFilter: (value, record) => record.title.indexOf(value) === 0,
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ["descend"],
    },
    {
      title: "Description",
      dataIndex: "description",
      filters: [],
      onFilter: (value, record) => record.description.indexOf(value) === 0,
    },
    {
        title: "Rate",
        dataIndex: "rate",
        render: (rateObj) => rateObj.$numberDecimal,
        defaultSortOrder: "descend",
        // sorter: (a, b) => a.rate.localeCompare(b.rate),
      },
    {
        title: "Link",
        dataIndex: "link",
        filters: [],
        onFilter: (value, record) => record.link.indexOf(value) === 0,
      },
  

    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => {getEditItem(record._id)}}>
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
  
  
  
    const onChange = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    };
  
    return (
        <div className="container-admins">
        <div className="add--button_container">
          <Button onClick={() => {
        setOpenPop(true)
      }}>Add Partner</Button>
        </div>
        <Table
        //  scroll={{ y: 400 }}
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
        rowKey={data => data._id}
      />
        {openPop && (
          <Popup title="Add Partner" close={closePop}>
            <div className="input-container">
              <Input
                id="outlined-controlled"
                placeholder="Company"
                name="company"
                allowClear
                onChange={(event) => setFormValues({...formValues, company: event.target.value})}
              />
              <Input
                id="outlined-uncontrolled"
                placeholder="Description"
                name="description"
                allowClear
                onChange={(event) => setFormValues({...formValues, description: event.target.value})}
              />
              <Input
                id="outlined-uncontrolled"
                placeholder="Rate"
                name="rate"
                allowClear
                onChange={(event) => setFormValues({...formValues, rate: event.target.value})}
              />
             <Input
                id="outlined-uncontrolled"
                placeholder="Link"
                name="link"
                allowClear
                onChange={(event) => setFormValues({...formValues, link: event.target.value})}
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
                        handleSubmit();
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
        {editPop  && ( // show popup if editPop is true and selectedRecord is not null
            <Popup title="Edit Partner" close={closePop}>
              <div className="input-container">
              <Input
                id="outlined-controlled"
                placeholder="Company"
                name="company"
                allowClear
                onChange={(event) => seteditValues({...editValues, company: event.target.value})}
                value={editValues.company}
              />
                <Input
                id="outlined-uncontrolled"
                placeholder="Description"
                name="description"
                allowClear
                onChange={(event) => seteditValues({...editValues, description: event.target.value})}
                value={editValues.description}
              />
              <Input
                id="outlined-uncontrolled"
                placeholder="Rate"
                name="rate"
                allowClear
                onChange={(event) => seteditValues({...editValues, rate: event.target.value})}
                value={editValues.rate}
              />
               <Input
                id="outlined-uncontrolled"
                placeholder="Link"
                name="link"
                allowClear
                onChange={(event) => seteditValues({...editValues, link: event.target.value})}
                value={editValues.link}
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
                        updateBooking();
                      setEditPop(false);
                      Swal.fire(
                        "Added!",
                        "Your Admin has been added.",
                        "success"
                      );
                    //   reload()
                    }
                  })
                }}
              >
                Submit
              </button>
            </div>
            </Popup>
          )}
      </div>
    )
  }
  export default Partner;