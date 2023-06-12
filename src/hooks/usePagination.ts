import { useCallback, useEffect, useState } from "react";

export const usePagination = (dataSource: any[]): any => {
  const [data, setData] = useState(dataSource.slice(0, 10));
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const getData = useCallback((current = 1, pageSize = 10) => {
    // Normally you should get the data from the server
    const newData = dataSource.slice((current - 1) * pageSize, current * pageSize);
    setData(newData);
    setCurrentPage(current);
    setPageSize(pageSize);
  }, [dataSource]);

  // Handle for dataSource changed (searching, filtering,..)
  useEffect(() =>{
    getData();
  }, [dataSource]);

  return [currentPage, pageSize, getData, data];
};
