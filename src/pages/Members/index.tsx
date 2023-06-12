import { PlusCircleOutlined } from '@ant-design/icons';
import { Col, Divider, Form, Input, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import fakeData from '../../common/fakeData/user.json';
import { tw } from '../../common/utils/classUtil';
import formatUsersData from '../../common/utils/formatUsersData';
import MemberForm from '../../components/MemberForm';
import PrimaryButton from '../../components/__common/custom/PrimaryButton';
import PrimaryForm from '../../components/__common/custom/PrimaryForm';
import PrimaryModal from '../../components/__common/custom/PrimaryModal';

import MemberTable from '../../components/MemberTable';
import PaginationCustom from '../../components/__common/custom/PaginationCustom';
import { usePagination } from '../../hooks/usePagination';

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
  const [form] = Form.useForm();
  const initialData = useMemo(() => formatUsersData(fakeData), []); // Assuming fakeData is static
  const [dataSource, setDataSource] = useState(initialData);
  const [currentPage, pageSize, getDataPage, dataPage] = usePagination(dataSource);
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
      // getDataPage();
    },
    [initialData],
  );

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

  const handleAddMemberForm = (value: any) => {
    form.resetFields();
    setIsEdit(true);
    setIsOpenModal(true);
  };
  

  // useEffect(() =>{
  //   console.log('useEffect getDataPage');
  //   getDataPage();
  // }, [initialData]);
  // console.log('dataSource',dataSource);
  console.log('dataPage',dataPage);
  console.log('currentPage',currentPage);
  console.log('pageSize',pageSize);


  return (
    <>
      <Typography.Title className="mt-5" level={3}>
        TEDDIES
      </Typography.Title>

      <Row align="bottom">
        <Col className='mb-2' span={24} md={12}>
          <PaginationCustom
            totalItems={dataSource.length}
            handleOnChange={getDataPage}
          />
        </Col>
        <Col span={24} md={12}>
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                className={tw('[&_.ant-btn]:leading-none')}
                placeholder="Search by Teddy..."
                allowClear
                size="large"
                onChange={handleOnChangeSearch}
              />
            </div>
            <div className="flex-1">
              <PrimaryButton
                variant="primary"
                className="h-full"
                typographyClassName="font-medium"
                onClick={handleAddMemberForm}
              >
                <PlusCircleOutlined /> Add new Teddy
              </PrimaryButton>
            </div>
          </div>
        </Col>
      </Row>

      <Divider className="mb-4 mt-3" />
      <div className="w-full overflow-x-scroll scrollbar-hide">
        <MemberTable
          className={tw('[&_.ant-table-tbody]:bg-white')}
          dataSource={dataPage}
          handleEditMemberForm={handleEditMemberForm}
          handleViewMemberForm={handleViewMemberForm}
          rowKey={({ key }: any) => key}
        />
      </div>

      <PrimaryModal
        title={<Typography className="text-blue-2">Add new Teddy</Typography>}
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

export default Members;
