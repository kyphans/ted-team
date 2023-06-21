import { TableProps } from 'antd';
import Table from 'antd/es/table';
import { tw } from '../../../../common/utils/classUtil';

export interface PrimaryTableProps extends TableProps<any> {
  columns: any[];
  dataSource: any[];
  rowClassName?: string;
  className?: string;
  rowKey?: any;
  loading?: boolean;
}

export default function PrimaryTable(props: PrimaryTableProps) {
  const { dataSource, columns, rowClassName, rowKey, loading, className, ...resProps } = props;
  return (
    <Table
      className={tw(className)}
      rowClassName={tw(rowClassName)}
      columns={columns}
      dataSource={dataSource}
      rowKey={rowKey}
      loading={loading}
      {...resProps}
    />
  );
}
