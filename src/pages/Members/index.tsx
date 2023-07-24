import { PlusCircleOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Divider, Form, Typography } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import { tw } from '../../common/utils/classUtil';
import { useNotification } from '../../context/NotificationContext';
import UserServices from '../../services/user.service';

import MemberForm from '../../components/MemberForm';
import MemberTable from '../../components/MemberTable';
import PaginationCustom from '../../components/__common/PaginationCustom';
import SearchFiltersToolBar, { FiltersSelectedType } from '../../components/__common/SearchFiltersToolBar';
import PrimaryButton from '../../components/__common/custom/PrimaryButton';
import PrimaryForm from '../../components/__common/custom/PrimaryForm';
import PrimaryModal from '../../components/__common/custom/PrimaryModal';

import { MembersResponseType } from '../../types/member.types';
import { UserData } from '../../types/user.types';
import useDepartmentStore from '../../store/department';
import { ModalType } from '../../types/modal.types';

function Members() {
  const [form] = Form.useForm();
  const { addNotification } = useNotification();
  const {
    data: dataResponse,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => UserServices.getAllUsers<MembersResponseType>(),
    staleTime: 5 * 60 * 1000, // 5 minute,
  });
  const [statusModal, setStatusModal] = useState<ModalType['status']>('VIEW');
  const [isOpenModal, setIsOpenModal] = useState(false);

  const filters = {
    generation: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    isActive: ['true', 'false'],
    department: ['PD', 'PDR', 'DD'],
  };

  const handleLoginSuccess = () => {
    setIsOpenModal(false);
    form.resetFields();
    addNotification('Thêm thành viên thành công', 'success');
    refetch();
  };

  const handleLoginFailed = (err: any) => {
    const errMessage = err?.response?.data;

    if (!errMessage) addNotification(`${err.message}`, 'error');

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

  const handleEditMemberForm = (value: UserData) => {
    setIsOpenModal(true);
    setStatusModal('EDIT');
    const { joinedDate, leaveDate, ...rest } = value ?? {};
    console.log('value', value);

    form.setFieldsValue({
      ...rest,
      department: value.info[0]?.departmentName,
      joinDate: joinedDate && dayjs(joinedDate),
      leaveDate: leaveDate && dayjs(leaveDate),
    });
  };

  const handleAddMemberForm = () => {
    form.resetFields();
    setStatusModal('ADD');
    setIsOpenModal(true);
  };

  const handelOnChangeFilters = (value: FiltersSelectedType) => {
    console.log('handelOnChangeFilters', value);
  };

  const handleSubmitForm = () => {
    const formValues = form.getFieldsValue(true);
    const payload = {
      ...formValues,
      avatar: formValues.avatar && formValues.avatar[0].originFileObj,
      department_ID: formValues.department,
      role_ID: 5, //default is Member
      joinDate: formValues.joinDate ? dayjs(formValues.joinDate).format('DD/MM/YYYY') : undefined,
      leaveDate: formValues.joinDate ? dayjs(formValues.leaveDate).format('DD/MM/YYYY') : undefined,
    };
    mutation.mutate(payload);
  };

  const handelOnChangePagination = (currentPage: number, pageSize: number) => {
    console.log('handelOnChangePagination ', { currentPage, pageSize });
  };

  const renderFooterButtons = () => {
    let listButtons = [
      <PrimaryButton
        key="cancel"
        className="bg-slate-200"
        variant="cancel"
        onClick={() => {
          setIsOpenModal(false);
          form.resetFields();
        }}
      >
        Cancel
      </PrimaryButton>,
    ];

    if (statusModal !== 'ADD') {
      listButtons.unshift(
        <PrimaryButton
          key="delete"
          className="bg-red-500"
          variant="delete"
          onClick={() => {
            setIsOpenModal(false);
          }}
        >
          Remove
        </PrimaryButton>,
      );
      listButtons.push(
        <PrimaryButton key="edit" className="bg-blue-600" variant="primary" onClick={handleSubmitForm}>
          Edit
        </PrimaryButton>,
      );
    } else {
      listButtons.push(
        <PrimaryButton key="add" className="bg-blue-600" variant="primary" onClick={handleSubmitForm}>
          Add
        </PrimaryButton>,
      );
    }
    return listButtons;
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
        <SearchFiltersToolBar
          placeholderSearch="Search Teddy"
          handelOnChange={handelOnChangeFilters}
          filters={filters}
        />
      </div>
      <Divider className="mb-4 mt-2" />
      <div className="w-full overflow-x-scroll overflow-y-hidden scrollbar-hide">
        <MemberTable
          onRow={(record, rowIndex) => {
            return {
              onDoubleClick: event => {handleEditMemberForm(record)}, // double click row
            };
          }}
          rowKey={'id'}
          pagination={false}
          className={tw('[&_.ant-table-tbody]:bg-white')}
          loading={isFetching}
          dataSource={dataResponse?.data?.results}
          handleEditMemberForm={handleEditMemberForm}
        />
        <PaginationCustom
          totalItems={dataResponse ? dataResponse.data.count : 0}
          handleOnChange={handelOnChangePagination}
        />
      </div>

      <PrimaryModal
        title={
          <Typography className="text-blue-2">{statusModal === 'ADD' ? 'Add new Teddy' : 'Edit info Teddy'}</Typography>
        }
        centered
        destroyOnClose
        noBodySpacing
        width={800}
        open={isOpenModal}
        onCancel={() => {
          setStatusModal('VIEW');
          setIsOpenModal(false);
        }}
        footer={renderFooterButtons()}
      >
        <Divider />
        <PrimaryForm disabled={statusModal === 'VIEW'} form={form}>
          <MemberForm isEdit={statusModal !== 'ADD' ? true : false} />
        </PrimaryForm>
      </PrimaryModal>
    </>
  );
}

export default Members;
