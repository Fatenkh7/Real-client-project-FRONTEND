import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
    dataIndex: "location",
    key: "location",
    render: (locations) => locations.join(", "),
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Is Customized",
    dataIndex: "isCustomized",
    key: "isCustomized",
    render: (text) => (text ? "Yes" : "No"),
  },
  {
    title: "ID Customer",
    dataIndex: "idCustomer",
    key: "idCustomer",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (text, record) => (
      <img src={text} alt={record.packageTitle} width="100" />
    ),
  },
];

const Package = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQzZmIzMDUzNDhjNmViNjE2Mzg1MDYyIiwidXNlck5hbWUiOiJ0YWdocmlkIiwiaWF0IjoxNjgxODk2NTQyLCJleHAiOjE2ODE5MTA5NDJ9.gg65KX9ypMjbey6Zjmyxq_19dcxCOXsj41y9a_Sc8dg`,
    //   id=
    // },
    // };
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "http://localhost:3000/package"
          // config
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

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      {loading && <div>Loading</div>}
      {!loading && (
        <div>
          <h2>PACKAGES</h2>
          <Table
            columns={columns}
            dataSource={
              Array.isArray(data)
                ? data.map((item, index) => ({
                    ...item,
                    key: item.id || index,
                    location: JSON.parse(item.locations),
                  }))
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
