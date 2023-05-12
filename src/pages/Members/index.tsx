import { Button, Divider, Space, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'NO',
    dataIndex: 'key',
    rowScope: 'row',
    width: 1,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: 'Action',
    key: 'action',
    width: 1,
    render: (_, record) => (
      <Space.Compact block>
        <Button type="dashed">Edit</Button>
        <Button type="dashed" danger>
          Delete
        </Button>
      </Space.Compact>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
function Members() {
  return (
    <>
      <Typography.Title className="text-base font-medium" level={5}>
        DANH SÁCH TEDDY
      </Typography.Title>
      <Divider className="mb-4 mt-3" />
      <div className="w-full overflow-x-scroll scrollbar-hide">
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
}

export default Members;
