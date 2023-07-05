import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

export interface PaginationCustomProps {
  totalItems: number;
  handleOnChange:(current: number, pageSize: number) => void;
}

export default function PaginationCustom(props: PaginationCustomProps) {
  const {totalItems, handleOnChange} = props;
  const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} Teddies`;
  return (
    <Pagination
      size="small"
      defaultCurrent={1}
      total={totalItems}
      showTotal={showTotal}
      onChange={handleOnChange}
      // onShowSizeChange={(current, size) => getData(current, size)}
      showSizeChanger
    />
  );
}
