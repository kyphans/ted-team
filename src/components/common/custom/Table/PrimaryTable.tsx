import { TableProps } from 'antd';
import Table from 'antd/es/table';
import React from 'react';
import { tw } from '../../../../utils/classUtil';

export interface PrimaryTableProps extends TableProps<any> {
  columns: any[];
  rows: any[];
  rowClassName?: string;
  rowKey?: string;
  loading?: boolean;
}

export default React.forwardRef(function PrimaryTable(props: PrimaryTableProps, ref: React.Ref<HTMLElement> | null) {
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
});
