import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Col, Divider, Form, Modal, Row, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import { Key, useEffect, useState } from 'react';
import PrimaryButton from '../common/custom/button/PrimaryButton';
import PrimaryForm from '../common/custom/form/PrimaryForm';
import PrimaryModal, { primaryModalFuncProps } from '../common/custom/modal/PrimaryModal';
import PrimarySelect from '../common/custom/select/PrimarySelect';
import { PrimaryEditTableProps } from '../common/custom/Table/PrimaryEditableRowTable';
import PrimaryTable from '../common/custom/Table/PrimaryTable';
import PrimaryTooltip from '../common/custom/tooltip/PrimaryTooltip';
import SharedMemberForm from '../common/shared/SharedMemberForm';
import { MemberFormEnum } from './memberFormEnum';
import data from './sampleData';
import { DataType } from './sampleData.type';

type ColumnTypes = Exclude<PrimaryEditTableProps['columns'], undefined>;

const MemberContent = () => {
  const [form] = Form.useForm();
  const [dataTable, setTableData] = useState<DataType[]>(data || []);
  const [dataTableSearch, setTableDataSearch] = useState<any[]>([]);
  const [changeModeForm, setModeForm] = useState<MemberFormEnum>(MemberFormEnum.Create);
  const [isOpenMemberFormModal, setOpenMemberFormModal] = useState<boolean>(false);

  const newDataTableOption = _.map(dataTable ?? [], (item, index) => {
    const { name } = item;
    return {
      ...{
        label: name,
        value: index,
        ...item,
      },
    };
  });

  const formatDataColumns = (data: DataType[]) => {
    const newDataTable: DataType[] = _.map(data, (item, index) => {
      const { name, dayOfBirth, nickname, phoneNumber, email } = item ?? {};
      return {
        ...{
          key: index + 1,
          name,
          dayOfBirth,
          nickname,
          phoneNumber,
          email,
        },
      };
    });
    setTableData(newDataTable);
    return newDataTable;
  };

  const handleChangeValue = (values: any) => {
    const dataFilter = _.filter(newDataTableOption ?? [], (item) => {
      return _.includes(values, item?.value);
    });
    setTableDataSearch(dataFilter);
    return dataFilter;
  };

  const defaultColumns: (ColumnTypes[any] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'STT',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a: { name: string }, b: { name: any }) => a.name.localeCompare(b.name),
      sortDirections: ['descend'],
    },
    {
      title: 'Age',
      dataIndex: 'dayOfBirth',
      sorter: (a: { dayOfBirth: string }, b: { dayOfBirth: string }) =>
        parseInt(a.dayOfBirth.slice(-4)) - parseInt(b.dayOfBirth.slice(-4)),
    },
    {
      title: 'Phone number',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Nickname',
      dataIndex: 'nickname',
      render: (text: string, _record: any) => {
        return <Typography>{text}</Typography>;
      },
    },
    {
      title: 'Action',
      render: (text: any, record: { key: Key | null | undefined }, index: number) =>
        data.length >= 1 ? (
          <Space key={index}>
            <PrimaryButton variant="refuse" onClick={() => handleClickRemoveMemberButton(record)}>
              Remove
            </PrimaryButton>
            <PrimaryButton variant="primary" onClick={() => handleEditMemberForm(record)}>
              Edit
            </PrimaryButton>
          </Space>
        ) : null,
    },
  ];

  const handleEditMemberForm = (value: any) => {
    setModeForm(MemberFormEnum.Edit);
    const { name, dayOfBirth, phoneNumber, email, nickname } = value ?? {};
    form.setFieldsValue({ fullName: name, dayOfBirth: dayjs(dayOfBirth), phoneNumber, email, nickname });
    setOpenMemberFormModal(true);
  };
  const handleSaveMemberForm = async () => {
    await form.validateFields();
    setOpenMemberFormModal(false);
  };

  const handleClickRemoveMemberButton = (value: any) => {
    const { name } = value;
    return Modal.confirm({
      ...primaryModalFuncProps().info,
      title: 'Thông báo',
      icon: <ExclamationCircleFilled />,
      content: (
        <Typography>
          Bạn có chắc chắn xóa <strong>Teddy {name} </strong> ra khỏi danh sách?
        </Typography>
      ),
      onOk: () => {},
      onCancel: () => {},
    });
  };

  useEffect(() => {
    formatDataColumns(dataTable);
  }, []);

  return (
    <>
      <Typography className="text-base font-medium">DANH SÁCH TEDDY</Typography>
      <Divider className="mb-4 mt-3" />
      <div className="pb-4">
        <Row gutter={[12, 12]}>
          <Col span={8}>
            <PrimarySelect
              maxTagCount={'responsive'}
              mode="multiple"
              showSearch={true}
              allowClear
              showArrow
              onChange={(values: any) => {
                handleChangeValue(values);
              }}
              placeholder="Nhập tên teddy cần tìm"
              fieldNames={{
                label: 'label',
                value: 'value',
              }}
              filterOption={(input: string, option: any) => {
                return _.includes(option?.label?.toLowerCase(), input?.toLowerCase());
              }}
              options={newDataTableOption}
              maxTagPlaceholder={(e: string | any[]) => {
                const titleToolTip = _.map(e, (item, index) => <p key={index}>{item.label}</p>);
                return <PrimaryTooltip title={titleToolTip}>+ {e.length}...</PrimaryTooltip>;
              }}
            />
          </Col>
          <Col span={12}></Col>
          <Col span={4} className="flex items-center">
            <PrimaryButton
              className="h-10"
              variant="primary"
              onClick={() => {
                setModeForm(MemberFormEnum.Create);
                setOpenMemberFormModal(true);
              }}
            >
              <Space className="flex items-center justify-center">
                <PlusOutlined className="flex items-center" /> Add new Teddy
              </Space>
            </PrimaryButton>
          </Col>
        </Row>
      </div>
      <PrimaryTable
        rowKey="key"
        columns={defaultColumns}
        rows={dataTableSearch?.length ? dataTableSearch : dataTable}
      />
      <PrimaryModal
        title={
          _.includes(MemberFormEnum.Create, changeModeForm) ? (
            <Typography className="text-blue-2">Thêm Teddy mới</Typography>
          ) : (
            <Typography className="text-blue-2">Chỉnh sửa Teddy</Typography>
          )
        }
        centered
        destroyOnClose
        noBodySpacing
        width={800}
        open={isOpenMemberFormModal}
        onCancel={() => {
          setOpenMemberFormModal(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Divider />
        <div className="p-6">
          <PrimaryForm form={form} layout="vertical" name="member-form">
            <SharedMemberForm
              onSaveMemberForm={handleSaveMemberForm}
              onCancelMemberForm={() => {
                setOpenMemberFormModal(false);
                form.resetFields();
              }}
            />
          </PrimaryForm>
        </div>
      </PrimaryModal>
    </>
  );
};

export default MemberContent;
