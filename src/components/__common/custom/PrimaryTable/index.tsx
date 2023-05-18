import { TableProps } from 'antd';
import Table from 'antd/es/table';
import { tw } from '../../../../common/utils/classUtil';

export interface PrimaryTableProps extends TableProps<any> {
  columns: any[];
  rows: any[];
  rowClassName?: string;
  rowKey?: string;
  loading?: boolean;
}

export default function PrimaryTable(props: PrimaryTableProps) {
  const { rows, columns, rowClassName, rowKey, loading, ...resProps } = props;
  return (
    <Table
      rowClassName={tw(rowClassName)}
      columns={columns}
      dataSource={rows}
      rowKey={rowKey}
      loading={loading}
      {...resProps}
    />
  );
};
