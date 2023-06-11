import { Divider, Form, Input, Typography } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState, useTransition } from 'react';
import fakeData from '../../common/fakeData/user.json';
import { tw } from '../../common/utils/classUtil';
import formatUsersData from '../../common/utils/formatUsersData';
import MemberForm from '../../components/MemberForm';
import PrimaryButton from '../../components/__common/custom/PrimaryButton';
import PrimaryForm from '../../components/__common/custom/PrimaryForm';
import PrimaryModal from '../../components/__common/custom/PrimaryModal';

import MemberTable from '../../components/MemberTable';

function Collaborators() {
  const parseFullName = (fullName: string) => {
    const names = fullName.split(' ');
    const firstName = names[0];
    const lastName = names[names.length - 1];
    return {
      firstName: firstName,
      lastName: lastName,
    };
  };

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

  const handleViewMemberForm = (value: any) => {
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
  };
  const handleEditMemberForm = (value: any) => {
    setIsOpenModal(true);
    setIsEdit(true);
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
  };
  const handleAddMemberForm = (value: any) => {
    form.resetFields();
    setIsEdit(true);
    setIsOpenModal(true);
  };
  return (
    <>
      <Typography.Title className="mt-5" level={3}>
        COLLABORATORS
      </Typography.Title>
      <div className="flex space-x-2">
        <div className="flex-1">
          <Input.Search
            className={tw('[&_.ant-btn]:leading-none')}
            placeholder="Search collaborator..."
            allowClear
            size="large"
            onChange={handleOnChangeSearch}
          />
        </div>
        <div className="flex-1">
          <PrimaryButton
            variant="default"
            className="h-full"
            typographyClassName="font-medium"
            onClick={handleAddMemberForm}
          >
            Add new collaborator
          </PrimaryButton>
        </div>
      </div>

      <Divider className="mb-4 mt-3" />
      <div className="w-full overflow-x-scroll scrollbar-hide">
        <MemberTable
          className={tw('[&_.ant-table-tbody]:bg-white')}
          rows={dataSource}
          dataSource={dataSource}
          handleEditMemberForm={handleEditMemberForm}
          handleViewMemberForm={handleViewMemberForm}
          rowKey={({ key }: any) => key}
        />
      </div>

      <PrimaryModal
        title={<Typography className="text-blue-2">Add new collaborator</Typography>}
        centered
        destroyOnClose
        noBodySpacing
        width={800}
        open={isOpenModal}
        onCancel={() => {
          setIsEdit(false);
          setIsOpenModal(false);
        }}
        footer={null}
      >
        <Divider />
        <PrimaryForm disabled={!isEdit} form={form}>
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

export default Collaborators;
