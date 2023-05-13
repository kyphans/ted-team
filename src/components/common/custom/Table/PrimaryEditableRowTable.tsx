import { DatePicker, Form, FormInstance, InputRef, Select, Table, TableProps, Typography } from 'antd';
import { ExpandableConfig } from 'antd/es/table/interface';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { tw } from '../../../../utils/classUtil';
type EditableTableProps = Parameters<typeof Table>[0];
const EditableContext = React.createContext<FormInstance<any> | null>(null);
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;
const { Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

export interface PrimaryEditTableProps extends TableProps<any> {
  columns: any[];
  rows: any[];
  rowKey?: string;
  expandable?: ExpandableConfig<any>;
  total?: number;
  loading?: boolean;
  setDataSorter?: (value: any) => void;
  rowClassName?: string;
  page?: number;
  pageSize?: number;
  handleChangePageAndPageSize?: () => void;
  handleChangePageSize?: () => void;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...rest }) => {
  const form = Form.useFormInstance();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...rest} />
      </EditableContext.Provider>
    </Form>
  );
};

const HeaderCell = (props: any) => {
  const { setDataSorter, dataIndex, children, ...rest } = props;

  return <th {...rest}>{children}</th>;
};

const EditableBodyCell = ({
  editing,
  dataIndex,
  disableInput,
  inputSelectProps,
  inputSelectData,
  inputTreeSelectProps,
  disabledSelectOption,
  dateTimePickerProps,
  datePickerProps,
  disableDatePicker,
  disableCheckBox,
  disableDate,
  singleCell,
  title,
  inputType,
  record,
  index,
  formName,
  children,
  handleEditCell,
  cellValueShow,
  rangeDatePickerProps,
  editTableClassName,
  ...rest
}: any) => {
  const inputRef = useRef<InputRef>(null);
  const [edited, setEdited] = useState<boolean>(false);
  const [value, setValue] = useState<any>();

  useEffect(() => {
    if (edited) {
      inputRef.current?.focus();
    }
  }, [edited]);

  const toggleEdit = () => {
    setEdited(!edited);
  };

  const save = async (otherVal?: any) => {
    toggleEdit();
    const params = {
      record,
      dataIndex,
      value,
      otherValue: otherVal ? otherVal : null,
    };
    handleEditCell?.(params);
  };

  let inputNode;

  return (
    <td {...rest}>
      {editing ? (
        singleCell ? (
          edited ? (
            <Form.Item
              // name={dataIndex}
              rules={[
                {
                  required: true,
                  message: `${title} is required.`,
                },
              ]}
            >
              {inputNode}
            </Form.Item>
          ) : (
            <div className={tw(editTableClassName)} style={{ paddingRight: 24 }} onClick={toggleEdit}>
              {cellValueShow?.({ record: record }) || children}
            </div>
          )
        ) : (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            valuePropName={_.includes(['checkbox', 'switch'], inputType) ? 'checked' : undefined}
          >
            {inputNode}
          </Form.Item>
        )
      ) : (
        children
      )}
    </td>
  );
};

export default function EditableRowTable({
  rows,
  columns,
  rowKey,
  expandable,
  total,
  loading,
  page,
  pageSize,
  handleChangePageAndPageSize,
  handleChangePageSize,
  setDataSorter,
  rowClassName,
}: PrimaryEditTableProps) {
  // Lấy form từ thằng cha ra dùng chứ không tạo mới
  const form = Form.useFormInstance();

  return (
    <>
      <Form form={form} component={false}>
        <Table
          rowClassName={tw(rowClassName)}
          components={{
            header: {
              cell: HeaderCell,
            },
            body: {
              cell: EditableBodyCell,
              row: EditableRow,
            },
          }}
          expandable={expandable}
          columns={columns}
          dataSource={rows}
          rowKey={rowKey}
          className={tw('table')}
          loading={loading}
          scroll={{ x: 1000 }}
          sticky
          //   pagination={false}
          onChange={(pagination, filters, sorter) => {
            console.log(sorter);
            setDataSorter?.(sorter);
          }}
        />
      </Form>
    </>
  );
}
