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
                headers: { authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQzZTdkNjc3NDFiZGFmNjE0YWY2NmFlIiwidXNlck5hbWUiOiJiYWJhYmEiLCJpYXQiOjE2ODE4OTE1NzIsImV4cCI6MTY4MTkwNTk3Mn0.-TZqDw92KAo5C7FDh51eANL3zoSFPVfTrsatMBSFoKg` },
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
      dataIndex:'firstName',
      key: 'firstName',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];
    return(<><Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={users} onChange={handleChange} /></>)
}