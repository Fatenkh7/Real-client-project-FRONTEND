import {useState, useEffect, useMemo} from "react"
import { Button, Space, Table } from 'antd';
import axios from "axios";
import Cookie from "universal-cookie";
export default function DashboardUser(){
    const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
    const[users,setUsers]=useState([]);
        useEffect( ()=>{
        let URL=process.env.REACT_APP_BASE_URL
        const fetchUsers= async()=>{
            const config = {
                headers: { authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ0MDg3MzQ0N2Q4OTM2M2IyYTQxMjU5IiwidXNlck5hbWUiOiJzdXBlckFkbWluIiwiaWF0IjoxNjgyMDE4MDQwLCJleHAiOjE2ODIwMzI0NDB9.lBdCxD5uKOeO-IuTRD96m57uUH9sbChZ4xJTqTdLWFU` ,
              id:"6440873447d89363b2a41259", role:"superAdmin"},
              }
         const data= await axios.get(`http://localhost:5000/user`, config )
         console.log(data.data.data)
         setUsers(data.data.data)
        }
        fetchUsers().catch(console.error)
    },[])
    const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
  };
     const columns = [
    {
      title: 'First Name',
      dataIndex:['firstName', "lastName"],
      render: (text,row) => <p>{row["firstName"]}{" "}{row["lastName"]}</p>,
      key: 'firstName',
      sorter: (a, b) => a.firstName.length - b.firstName.length,
      sortOrder: sortedInfo.columnKey === 'firstName' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
      sorter: (a, b) => a.phone - b.phone,
      sortOrder: sortedInfo.columnKey === 'phone' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      sortOrder: sortedInfo.columnKey === 'email' ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];
    return(<>
      <Table columns={columns} dataSource={users} onChange={handleChange} rowKey="_id"/></>)
}