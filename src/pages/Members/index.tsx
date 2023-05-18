import { Button, Divider, Space, Table, Tag, Typography, Input, Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import fakeData from '../../common/fakeData/user.json';
import formatUsersData from '../../common/utils/formatUsersData';
import PrimaryButton from '../../components/__common/custom/PrimaryButton';
import moment from 'moment';
import { useCallback, useState, useTransition, memo, useMemo, useEffect } from 'react';
import PrimaryModal from '../../components/__common/custom/PrimaryModal';
import MemberForm from '../../components/MemberForm';
import PrimaryForm from '../../components/__common/custom/PrimaryForm';
import dayjs from 'dayjs';
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

function Members() {
  const parseFullName = (fullName: string) => {
    const names = fullName.split(' ');
    const firstName = names[0];
    const lastName = names[names.length - 1];
    return {
      firstName: firstName,
      lastName: lastName,
    };
  };

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
  const columns: ColumnsType<DataType> = [
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
            className="text-[#d46b08] border-[#d46b08]"
            onClick={() => handleEditMemberForm(record)}
          >
            Edit
          </Button>
          <Button type="default" danger>
            Delete
          </Button>
        </Space.Compact>
      ),
    },
  ];

  const [form] = Form.useForm();
  const initialData = useMemo(() => formatUsersData(fakeData), []); // Assuming fakeData is static
  const [dataSource, setDataSource] = useState(initialData);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [isPending, startTransition] = useTransition();
  const handleOnChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const valeSearch = e.target.value.trim().toLowerCase();
      const filteredData = initialData.filter(
        (entry) =>
          entry.mssv.toLowerCase().includes(valeSearch) ||
          entry.fullName.toLowerCase().includes(valeSearch) ||
          entry.email.toLowerCase().includes(valeSearch),
      );
      setDataSource(filteredData);
    },
    [initialData],
  );

  const handleEditMemberForm = (value: any) => {
    setIsOpenModal(true);
    const { mssv, fullName, generation, joinedDate, leaveDate, email, isActive } = value ?? {};
    const { firstName, lastName } = parseFullName(fullName);
    form.setFieldsValue({
      mssv,
      firstName,
      lastName,
      generation,
      email,
      isActive,
      joinDate: dayjs(joinedDate),
      leaveDate: dayjs(leaveDate),
    });

    // setOpenMemberFormModal(true);
  };
  const handleAddMemberForm = (value: any) => {
    form.resetFields();
    setIsOpenModal(true);
  };
  return (
    <>
      <Typography.Title className="mt-5" level={4}>
        TEDDIES
      </Typography.Title>
      <div className="flex space-x-2">
        <div className="flex-1">
          <Input.Search placeholder="Search by Teddy..." allowClear size="large" onChange={handleOnChangeSearch} />
        </div>
        <div className="flex-1">
          <PrimaryButton
            variant="default"
            className="h-full"
            typographyClassName="font-medium"
            onClick={handleAddMemberForm}
          >
            Add new Teddy
          </PrimaryButton>
        </div>
      </div>

      <Divider className="mb-4 mt-3" />
      <div className="w-full overflow-x-scroll scrollbar-hide">
        <Table columns={columns} dataSource={dataSource} rowKey={({ key }) => key} />
      </div>

      <PrimaryModal
        title={<Typography className="text-blue-2">Add new Teddy</Typography>}
        centered
        destroyOnClose
        noBodySpacing
        width={800}
        open={isOpenModal}
        onCancel={() => {
          setIsOpenModal(false);
        }}
        footer={null}
      >
        <Divider />
        <PrimaryForm form={form}>
          <MemberForm
            onSaveMemberForm={() => {
              setIsOpenModal(false);
              form.resetFields();
            }}
            onCancelMemberForm={() => {
              setIsOpenModal(false);
              form.resetFields();
            }}
          />
        </PrimaryForm>
      </PrimaryModal>
    </>
  );
}

export default Members;
