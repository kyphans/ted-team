import { Button, Divider, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import fakeData from '../../common/fakeData/user.json';
import formatUsersData from '../../common/utils/formatUsersData';
interface DataType {
  key: number;
  fullName: string;
  mssv: string;
  phone: string;
  email: string;
  generation: number;
  joinedDate: Date;
  leaveDate: Date;
  isActive: boolean;
  isDelete: boolean;
  description: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'MSSV',
    dataIndex: 'mssv',
    rowScope: 'row',
    width: 1,
  },
  {
    title: 'Full Name',
    dataIndex: 'fullName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Generation',
    dataIndex: 'generation',
  },
  {
    title: 'Joined Date',
    render: (_, { joinedDate }) => {
      return joinedDate.toLocaleDateString('en-US');
    },
  },
  {
    title: 'Leave Date',
    render: (_, { leaveDate }) => {
      return leaveDate.toLocaleDateString('en-US');
    },
  },
  {
    title: 'Status',
    render: (_, { isActive }) => (isActive ? <Tag color="green">Active</Tag> : <Tag color="red">Deactivate</Tag>),
  },
  {
    title: 'Action',
    width: 1,
    render: (_, record) => (
      <Space.Compact block>
        <Button type="default">Edit</Button>
        <Button type="default" danger>
          Delete
        </Button>
      </Space.Compact>
    ),
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
        <Table columns={columns} dataSource={formatUsersData(fakeData)} rowKey={({ key }) => key} />
      </div>
    </>
  );
}

export default Members;
