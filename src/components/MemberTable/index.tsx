import { Button, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { tw } from '../../common/utils/classUtil';

import { BulbOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import PrimaryTable, { PrimaryTableProps } from '../__common/custom/PrimaryTable';
import PrimaryTag from '../PrimaryTag';
import { MembersResponseType } from '../../types/member.types';
import { UserData } from '../../types/user.types';

interface MemberTableProps extends Omit<PrimaryTableProps, 'columns' | 'dataSource'> {
  handleEditMemberForm: (record: UserData) => void;
  handleViewMemberForm: (record: UserData) => void;
  dataSource: MembersResponseType['results'] | undefined
}

export default function MemberTable(props: MemberTableProps) {
  const { dataSource, rowClassName, loading, className, ...rest} = props;  
  const columns: ColumnsType<UserData> = [
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
      title: 'Phone',
      dataIndex: 'phone',
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
      sorter: (a, b) => a.generation - b.generation,
    },
    {
      title: 'Joined Date',
      sorter: (a, b) => moment(a.joinedDate).unix() - moment(b.joinedDate).unix(),
      render: (_, { joinedDate }) => {
        return joinedDate ? moment(joinedDate, "DD/MM/YYYY").format("DD/MM/YYYY") : null;
      },
    },
    {
      title: 'Leave Date',
      sorter: (a, b) => moment(a.joinedDate).unix() - moment(b.joinedDate).unix(),
      render: (_, { leaveDate }) => {
        return leaveDate ? moment(leaveDate, "DD/MM/YYYY").format("DD/MM/YYYY") : null;
      },
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
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

  // ----------------- handleOnChange for antd table -----------------------------
  // const handleOnChange = (pagination: any, filters: any, sorter: any) => {
  //   const newData = !!dataSource && dataSource.filter((item) => {
  //     for (const key in filters) {
  //       if (Array.isArray(filters[key])) {
  //         if (!filters[key].includes(item[key])) {
  //           return false;
  //         }
  //       } else {
  //         if (filters[key] !== null && item[key] !== filters[key]) {
  //           return false;
  //         }
  //       }
  //     }
  //     return true;
  //   });
  //   console.table({ pagination, filters, sorter });
  // };

  return (
    <PrimaryTable
      {...rest}
      className={tw(className)}
      rowClassName={tw(rowClassName)}
      columns={columns}
      dataSource={dataSource ?? []}
      rowKey="id"
      loading={loading}
    />
  );
}
