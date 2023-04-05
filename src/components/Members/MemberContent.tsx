import { PlusOutlined } from '@ant-design/icons';
import { Col, Divider, Row, Space, Typography } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import PrimaryButton from '../common/custom/button/PrimaryButton';
import PrimarySelect from '../common/custom/select/PrimarySelect';
import { PrimaryEditTableProps } from '../common/custom/Table/PrimaryEditableRowTable';
import PrimaryTable from '../common/custom/Table/PrimaryTable';
import PrimaryTooltip from '../common/custom/tooltip/PrimaryTooltip';
import data from './sampleData';
import { DataType } from './sampleData.type';

type ColumnTypes = Exclude<PrimaryEditTableProps['columns'], undefined>;

const MemberContent = () => {
  const [dataTable, setTableData] = useState<DataType[]>(data || []);
  const [dataTableSearch, setTableDataSearch] = useState<any[]>([]);

  const newDataTableOption = _.map(dataTable ?? [], (item, index) => {
    const { name } = item ?? {};
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
      render: (__: any, record: { key: React.Key }) =>
        data.length >= 1 ? (
          <Space key={record?.key}>
            <PrimaryButton variant="refuse">Remove</PrimaryButton>
            <PrimaryButton variant="primary">Edit</PrimaryButton>
          </Space>
        ) : null,
    },
  ];

  useEffect(() => {
    formatDataColumns(dataTable);
  }, []);

  return (
    <>
      <Typography className="text-base font-medium">DANH SÁCH TEDDY</Typography>
      <Divider className="my-6" />
      <div className="pb-6">
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
                const titleToolTip = _.map(e, (item, index) => <p>{item.label}</p>);
                return <PrimaryTooltip title={titleToolTip}>+ {e.length}...</PrimaryTooltip>;
              }}
            />
          </Col>
          <Col span={12}></Col>
          <Col span={4} className="flex items-center">
            <PrimaryButton className="h-10" variant="primary">
              <Space className="flex items-center justify-center">
                <PlusOutlined className="flex items-center" /> Add new Teddy
              </Space>
            </PrimaryButton>
          </Col>
        </Row>
      </div>
      <PrimaryTable
        rowClassName="overflow-y-hidden"
        columns={defaultColumns}
        rows={dataTableSearch?.length ? dataTableSearch : dataTable}
      />
    </>
  );
};

export default MemberContent;
