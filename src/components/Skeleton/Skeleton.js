import { Skeleton, Table } from 'antd';
import { useState } from 'react';

const MySkeleton = () => {
  const [active, setActive] = useState(true);
  const [size, setSize] = useState('default');
  const handleActiveChange = (checked) => {
    setActive(checked);
  };
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const columns = [
    {
      title: '',
      dataIndex: 'column1',
      key: 'column1',
    },
    {
      title: '',
      dataIndex: 'column2',
      key: 'column2',
    },
    {
      title: '',
      dataIndex: 'column3',
      key: 'column3',
    },
    {
        title: '',
        dataIndex: 'column4',
        key: 'column4',
      },
      {
        title: '',
        dataIndex: 'column5',
        key: 'column5',
      },
  ];

  const rows = [
    {
      key: '1',
      column1: <Skeleton active={active} size={size} />,
      column2: <Skeleton active={active} size={size} />,
      column3: <Skeleton active={active} size={size} />,
      column4: <Skeleton active={active} size={size} />,
      column5: <Skeleton active={active} size={size} />,
    },
    {
      key: '2',
      column1: <Skeleton active={active} size={size} />,
      column2: <Skeleton active={active} size={size} />,
      column3: <Skeleton active={active} size={size} />,
      column4: <Skeleton active={active} size={size} />,
      column5: <Skeleton active={active} size={size} />,
    },
    {
      key: '3',
      column1: <Skeleton active={active} size={size} />,
      column2: <Skeleton active={active} size={size} />,
      column3: <Skeleton active={active} size={size} />,
      column4: <Skeleton active={active} size={size} />,
      column5: <Skeleton active={active} size={size} />,
    },
    {
        key: '4',
        column1: <Skeleton active={active} size={size} />,
        column2: <Skeleton active={active} size={size} />,
        column3: <Skeleton active={active} size={size} />,
        column4: <Skeleton active={active} size={size} />,
        column5: <Skeleton active={active} size={size} />,
      },
      {
        key: '5',
        column1: <Skeleton active={active} size={size} />,
        column2: <Skeleton active={active} size={size} />,
        column3: <Skeleton active={active} size={size} />,
        column4: <Skeleton active={active} size={size} />,
        column5: <Skeleton active={active} size={size} />,
      },
  ];

  return (
    <>
      <div style={{ marginTop: '70px' }}></div>
      <Table columns={columns} dataSource={rows} pagination={false} />
      <Skeleton.Button active={active} size={size} block />
      <Skeleton.Input active={active} size={size} block />
      <Skeleton.Button active={active} size={size} block />
      <br />
      <br />
      <Skeleton.Input active={active} size={size} block />
      <br />
      <br />
      <Skeleton.Button active={active} size={size} block />
    </>
  );
};
export default MySkeleton;
