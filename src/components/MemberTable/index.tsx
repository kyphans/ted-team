import { Button, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { tw } from '../../common/utils/classUtil';

import { BulbOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import PrimaryTable, { PrimaryTableProps } from '../__common/custom/PrimaryTable';
import PrimaryTag from '../PrimaryTag';

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

interface MemberTableProps extends Omit<PrimaryTableProps, 'columns'> {
  handleEditMemberForm: (record: DataType) => void;
  handleViewMemberForm: (record: DataType) => void;
}
const generationFilter = () => {
  let array = [];
  for (let index = 1; index < 10; index++) {
    array.push({
      text: `${index}`,
      value: `${index}`,
    });
  }
  return array;
};

export default function MemberTable(props: MemberTableProps) {
  const { dataSource, rowClassName, rowKey, loading, className } = props;
  const columns: ColumnsType<DataType> = [
    {
      title: 'N.O',
      dataIndex: 'key',
      render: (_, { key }) => {
        return key + 1;
      },
    },
    {
      title: 'ID',
      dataIndex: 'mssv',
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
      title: 'Department',
      dataIndex: '',
      render: () => <PrimaryTag variant="Collaborator" />,
    },
    {
      title: 'Generation',
      dataIndex: 'generation',
      filters: generationFilter(),
      onFilter: (value: any, record) => record.generation.toString().includes(value),
      sorter: (a, b) => a.generation - b.generation,
    },
    {
      title: 'Joined Date',
      sorter: (a, b) => moment(a.joinedDate).unix() - moment(b.joinedDate).unix(),
      render: (_, { joinedDate }) => {
        return joinedDate.toLocaleDateString('en-US');
      },
    },
    {
      title: 'Leave Date',
      sorter: (a, b) => moment(a.joinedDate).unix() - moment(b.joinedDate).unix(),
      render: (_, { leaveDate }) => {
        return leaveDate.toLocaleDateString('en-US');
      },
    },
    {
      title: 'Status',
      filters: [
        {
          text: 'Active',
          value: true,
        },
        {
          text: 'Deactivate',
          value: false,
        },
      ],
      dataIndex: 'isActive',
      onFilter: (value: any, record) => record.isActive === value,
      render: (_, { isActive }) => (isActive ? <Tag color="green">Active</Tag> : <Tag color="red">Deactivate</Tag>),
    },
    {
      title: 'Action',
      width: 1,
      render: (_, record) => (
        <Space.Compact block>
          <Button
            type="default"
            className="leading-[0] text-[#1677ff] border-[#1677ff]"
            onClick={() => props.handleViewMemberForm(record)}
          >
            <BulbOutlined />
          </Button>
          <Button
            type="default"
            className="leading-[0] text-[#d46b08] border-[#d46b08]"
            onClick={() => props.handleEditMemberForm(record)}
          >
            <EditOutlined />
          </Button>
          <Button type="default" className="leading-[0]" danger>
            <DeleteOutlined />
          </Button>
        </Space.Compact>
      ),
    },
  ];

  const handleOnChange = (pagination: any, filters: any, sorter: any) => {
    const newData = dataSource.filter((item) => {
      for (const key in filters) {
        if (Array.isArray(filters[key])) {
          if (!filters[key].includes(String(item[key]))) {
            return false;
          }
        } else {
          if (filters[key] !== null && item[key] !== filters[key]) {
            return false;
          }
        }
      }
      return true;
    });
    console.table({pagination, filters, sorter});
  };
  return (
    <PrimaryTable
      className={tw(className)}
      rowClassName={tw(rowClassName)}
      columns={columns}
      dataSource={dataSource}
      rowKey={rowKey}
      onChange={handleOnChange}
      loading={loading}
    />
  );
}
