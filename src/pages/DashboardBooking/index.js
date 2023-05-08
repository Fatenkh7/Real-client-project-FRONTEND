import { Table, Space, Input, Switch, Form } from "antd";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Popup from '../../components/Popup/index.js'
import Button from '../../components/Button';
import Swal from "sweetalert2";
import Cookies from "universal-cookie";

const Booking = () => {
    const [data, setData] = useState([]);
    const [editedItemId,setEditedItemId]=useState('')
    const [openPop, setOpenPop] = useState(false);
    const [formValues, setFormValues] = useState({
      idUser: '',
      idPackage: '',
      idPartner: '',
      idTypeTravel: '',
      price: '',
      currency: ''
    });
    const [editPop, setEditPop] = useState(false);
    const [editValues, seteditValues] = useState({
  
      idUser: '',
      idPackage: '',
      idPartner: '',
      idTypeTravel: '',
      price: '',
      currency: '',
    });
    const closePop = () => {
        setOpenPop(false);
        setEditPop(false);
      };
    const cookie= new Cookies()
    const headers = {
      Authorization: `Bearer ${cookie.get("token")}`,
      "id": cookie.get("id"),
      "role": cookie.get("role")
    };
   
    useEffect(() => {
      const URL= process.env.REACT_APP_BASE_URL
      axios.get(`${URL}booking`, { headers })
        .then(response => {
          setData(response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    },[]);
    const handleSubmit = (event) => {
      const URL= process.env.REACT_APP_BASE_URL
    //   event.preventDefault();
      axios.post(`${URL}booking/add`, formValues, { headers })
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
      const URL= process.env.REACT_APP_BASE_URL
      axios.delete(`${URL}booking/${id}`, { headers })
        .then(response => {
        //   message.success('Booking deleted successfully.');
          setData(data.filter(item => item.id !== id));
          console.log('hello' , data.data[0])
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
      idUser: gettedItem[0].idUser._id,
      idPackage: gettedItem[0].idPackage._id,
      idPartner: gettedItem[0].idPartner._id,
      idTypeTravel: gettedItem[0].idTypeTravel._id,
      price: gettedItem[0].price.$numberDecimal,
      currency: gettedItem[0].currency,
    })
    setEditPop(true) ;
  }
  function updateBooking(event) {
    // event.preventDefault();
    const URL= process.env.REACT_APP_BASE_URL
     axios.put(`${URL}booking/${editedItemId}`, editValues, { headers })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
      });
  } 
    const columns = [
      {
        title: 'User',
        dataIndex: 'idUser',
        render: (idUserObj) => idUserObj.firstName,
        filters: [
          {
            text: 'Joe',
            value: 'Joe',
          },
          {
            text: 'Jim',
            value: 'Jim',
          },
          {
            text: 'Submenu',
            value: 'Submenu',
            children: [
              {
                text: 'Green',
                value: 'Green',
              },
              {
                text: 'Black',
                value: 'Black',
              },
            ],
          },
        ],
        // specify the condition of filtering result
        // here is that finding the user started with `value`
        onFilter: (value, record) => record.user.indexOf(value) === 0,
        sorter: (a, b) => a.user.length - b.user.length,
        sortDirections: ['descend'],
      },
      {
        title: 'Package',
        dataIndex: 'idPackage',
        render: (idPackageObj) => idPackageObj.packageTitle,
        
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.package - b.package,
      },
      {
        title: 'Partner',
        dataIndex: 'idPartner',
        render: (idPartnerObj) => idPartnerObj.company,
        
        filters: [
          {
            text: 'London',
            value: 'London',
          },
          {
            text: 'New York',
            value: 'New York',
          },
        ],
        onFilter: (value, record) => record.partner.indexOf(value) === 0,
      },
      {
  
        title: 'Type Travel',
        dataIndex: 'idTypeTravel',
        render: (idTypeTravelObj) => idTypeTravelObj.title,
        filters: [
          {
            text: 'London',
            value: 'London',
          },
          {
            text: 'New York',
            value: 'New York',
          },
        ],
        onFilter: (value, record) => record.typeTravel.indexOf(value) === 0,
      },
      {
        title: 'Price',
        dataIndex: 'price',
        render: (priceObj) => priceObj.$numberDecimal,
        sorter: (a, b) => a.price.$numberDecimal - b.price.$numberDecimal,
        filters: [
          {
            text: 'London',
            value: 'London',
          },
          {
            text: 'New York',
            value: 'New York',
          },
        ],
        onFilter: (value, record) => record.price.indexOf(value) === 0,
      },
      {
        title: 'Currency',
        dataIndex: 'currency',
        filters: [
          {
            text: 'London',
            value: 'London',
          },
          {
            text: 'New York',
            value: 'New York',
          },
        ],
        onFilter: (value, record) => record.currency.indexOf(value) === 0,
  
      },
      {
        title: "Actions",
        key: "actions",
        render: (text, record) => (
          <Space size="middle">
            <a onClick={() => {getEditItem(record._id)}}>
              <EditOutlined />
            </a>
           <a onClick={() =>
                Swal.fire({
                  title: "Are you sure you want to delete this Admin?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3a70a1",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                    console.log('hello' ,record._id);
                  if (result.isConfirmed) {
                    handleDelete(record._id);
                    Swal.fire(
                      "Deleted!",
                      "Your admin has been deleted.",
                      "success"
                    );
                  }
                })
              }>
              <DeleteOutlined 
              />
            </a>
          </Space>
        ),
      },
    ];
  
  
  
    const onChange = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    };
  
    return (
        <div className="container-booking">
        <div className="add--button_container">
          <Button onClick={() => {
        setOpenPop(true)
      }}>Add Booking</Button>
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
          <Popup title="Add Booking" close={closePop}>
            <div className="input-container">
              <Input
                id="outlined-controlled"
                placeholder="Id User"
                name="idUser"
                allowClear
                onChange={(event) => setFormValues({...formValues, idUser: event.target.value})}
              />
              <Input
                id="outlined-uncontrolled"
                placeholder="Id Package"
                name="idPackage"
                allowClear
                onChange={(event) => setFormValues({...formValues, idPackage: event.target.value})}
              />
              <Input
                id="outlined-uncontrolled"
                placeholder="Id Partner"
                name="idPartner"
                allowClear
                onChange={(event) => setFormValues({...formValues, idPartner: event.target.value})}
              />
              <Input
                id="outlined-uncontrolled"
                placeholder="Id Type Travel"
                name="idTypeTravel"
                allowClear
                onChange={(event) => setFormValues({...formValues, idTypeTravel: event.target.value})}
              />
              
                <Input
                  id="outlined-uncontrolled"
                  placeholder="Price"
                  name="price"
                  allowClear
                  onChange={(event) => setFormValues({...formValues, price: event.target.value})}
                />
             
              <Input
                id="outlined-uncontrolled"
                placeholder="Currency"
                name="currency"
                allowClear
                onChange={(event) => setFormValues({...formValues, currency: event.target.value})}
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
            <Popup title="Edit Admin" close={closePop}>
              <div className="input-container">
              <Input
                id="outlined-controlled"
                placeholder="Id User"
                name="idUser"
                allowClear
                onChange={(event) => seteditValues({...editValues, idUser: event.target.value})}
                value={editValues.idUser}
              />
              <Input
                id="outlined-uncontrolled"
                placeholder="Id Package"
                name="idPackage"
                allowClear
                onChange={(event) => seteditValues({...editValues, idPackage: event.target.value})}
                value={editValues.idPackage}
              />
              <Input
                id="outlined-uncontrolled"
                placeholder="Id Partner"
                name="idPartner"
                allowClear
                onChange={(event) => seteditValues({...editValues, idPartner: event.target.value})}
                value={editValues.idPartner}
              />
              <Input
                id="outlined-uncontrolled"
                placeholder="Id Type Travel"
                name="idTypeTravel"
                allowClear
                onChange={(event) => seteditValues({...editValues, idTypeTravel: event.target.value})}
                value={editValues.idTypeTravel}
              />
              
                <Input
                  id="outlined-uncontrolled"
                  placeholder="Price"
                  name="price"
                  allowClear
                  value={editValues.price}
                  onChange={(event) => seteditValues({...editValues, price: event.target.value})}
                  
                />
             
              <Input
                id="outlined-uncontrolled"
                placeholder="Currency"
                name="currency"
                allowClear
                onChange={(event) => seteditValues({...editValues, currency: event.target.value})}
                value={editValues.currency}
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
  export default Booking;