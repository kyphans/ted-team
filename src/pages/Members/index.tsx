import { PlusCircleOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Divider, Form, Typography } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import { tw } from '../../common/utils/classUtil';
import { useNotification } from '../../context/NotificationContext';
import UserServices from '../../services/user.service';

import MemberForm from '../../components/MemberForm';
import MemberTable from '../../components/MemberTable';
import PaginationCustom from '../../components/__common/PaginationCustom';
import SearchFiltersToolBar from '../../components/__common/SearchFiltersToolBar';
import PrimaryButton from '../../components/__common/custom/PrimaryButton';
import PrimaryForm from '../../components/__common/custom/PrimaryForm';
import PrimaryModal from '../../components/__common/custom/PrimaryModal';

function Members() {
  const [form] = Form.useForm();
  const { addNotification } = useNotification();
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => UserServices.getAllUsers<any>(),
    staleTime: 5 * 60 * 1000, // 5 minute,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const filters = {
    generation: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    isActive: ['true', 'false'],
    department: ['PD', 'PDR', 'DD'],
  };

  const handleLoginSuccess = (data: any) => {
    setIsOpenModal(false);
    form.resetFields();
    addNotification('Thêm thành viên thành công', 'success');
    refetch();
  };

  const handleLoginFailed = (err: any) => {
    const errMessage = err.response.data;
    for (var key in errMessage) {
      if (errMessage.hasOwnProperty(key)) {
        var messageArray = errMessage[key];
        addNotification(`${key} ${messageArray[0]}`, 'error');
      }
    }
  };

  const mutation = useMutation({
    mutationFn: (payload) => UserServices.createUser<any>(payload),
    onSuccess: handleLoginSuccess,
    onError: handleLoginFailed,
  });

  const handleEditMemberForm = (value: any) => {
    setIsOpenModal(true);
    setIsEdit(true);
    const { joinedDate, leaveDate,...rest } = value ?? {};
    form.setFieldsValue({
      ...rest,
      joinDate: dayjs(joinedDate),
      leaveDate: dayjs(leaveDate),
    });
  };

  const handleViewMemberForm = (value: any) => {
    setIsOpenModal(true);
    const { joinedDate, leaveDate,...rest } = value ?? {};
    form.setFieldsValue({
      ...rest,
      joinDate: dayjs(joinedDate),
      leaveDate: dayjs(leaveDate),
    });
  };

  const handleAddMemberForm = () => {
    form.resetFields();
    setIsEdit(true);
    setIsOpenModal(true);
  };

  const handelOnChangeFilters = (value: any) => {
    console.log('handelOnChangeFilters', value);
  };

  const handleSubmitForm = () => {
    const formValues = form.getFieldsValue(true);
    const payload = {
      ...formValues,
      department_ID: formValues.department,
      joinDate: formValues.joinDate ? dayjs(formValues.joinDate).format('DD/MM/YYYY') : undefined,
      leaveDate: formValues.joinDate ? dayjs(formValues.leaveDate).format('DD/MM/YYYY') : undefined,
    };
    console.log('payload', payload);
    
    mutation.mutate(payload);
  };

  const handelOnChangePagination = (currentPage: number, pageSize: number) => {
    console.log('handelOnChangePagination ', {currentPage, pageSize});
    
  };

  return (
    <>
      <div className="flex justify-between mb-3">
        <Typography.Title className="m-0" level={3}>
          TEDDIES
        </Typography.Title>
        <PrimaryButton
          variant="primary"
          className="h-full w-50"
          typographyClassName="font-medium"
          onClick={handleAddMemberForm}
        >
          <PlusCircleOutlined /> Add new Teddy
        </PrimaryButton>
      </div>
      <div className="">
        <SearchFiltersToolBar placeholderSearch="Search Teddy" handelOnChange={handelOnChangeFilters} filters={filters} />
      </div>
      <Divider className="mb-4 mt-2" />
      <div className="w-full overflow-x-scroll scrollbar-hide">
        <MemberTable
          className={tw('[&_.ant-table-tbody]:bg-white')}
          loading={isFetching}
          dataSource={data?.data?.results}
          handleEditMemberForm={handleEditMemberForm}
          handleViewMemberForm={handleViewMemberForm}
        />
        <PaginationCustom totalItems={data?.data?.count} handleOnChange={handelOnChangePagination}/>
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
            onSaveMemberForm={handleSubmitForm}
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
